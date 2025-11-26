// backend/controllers/staffController.js
import Staff from "../models/Staff.js";
import Attendance from "../models/Attendance.js";
import fs from "fs";
import path from "path";
import Counter from "../models/Counter.js"; // For auto-increment short staffId

export const getAllStaff = async (req, res) => {
  try {
    const list = await Staff.find().sort({ createdAt: -1 });
    const processed = list.map((s) => {
      const obj = s.toObject();
      if (s.photo) obj.photoUrl = `/uploads/${s.photo}`;
      return obj;
    });
    res.json(processed);
  } catch (err) {
    console.error("getAllStaff error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getStaffById = async (req, res) => {
  try {
    const s = await Staff.findById(req.params.id);
    if (!s) return res.status(404).json({ message: "Not found" });
    const obj = s.toObject();
    if (s.photo) obj.photoUrl = `/uploads/${s.photo}`;
    res.json(obj);
  } catch (err) {
    console.error("getStaffById error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createStaff = async (req, res) => {
  try {
    const {
      fullName, email, role, phone, salary, dob,
      shiftStart, shiftEnd, shiftTimings,
      address, additionalDetails,
    } = req.body;

    const photoFile = req.file ? req.file.filename : null;

    // ✅ Calculate age from DOB
    let age = null;
    if (dob) {
      const birth = new Date(dob);
      const diff = Date.now() - birth.getTime();
      age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    }

    // ✅ Generate auto-increment short staffId
    let staffIdNum;
    const counter = await Counter.findOneAndUpdate(
      { name: "staff" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true } // create if not exists
    );
    staffIdNum = counter.seq;

    const doc = new Staff({
      staffId: staffIdNum,
      fullName,
      email,
      role,
      phone,
      salary: salary ? Number(salary) : undefined,
      dob: dob || undefined,
      age,
      shiftStart,
      shiftEnd,
      shiftTimings,
      address,
      additionalDetails,
      photo: photoFile,
    });

    const saved = await doc.save();

    // ✅ Also create attendance record automatically
    const today = new Date().toISOString().split("T")[0];
    await Attendance.create({
      staffId: saved._id,
      name: saved.fullName,
      photoUrl: saved.photo ? `/uploads/${saved.photo}` : null,
      date: today,
      timings: saved.shiftTimings || `${saved.shiftStart} - ${saved.shiftEnd}`,
      status: "",
    });

    const obj = saved.toObject();
    if (saved.photo) obj.photoUrl = `/uploads/${saved.photo}`;
    res.status(201).json(obj);
  } catch (err) {
    console.error("createStaff error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const s = await Staff.findById(req.params.id);
    if (!s) return res.status(404).json({ message: "Not found" });

    const {
      fullName, email, role, phone, salary, dob,
      shiftStart, shiftEnd, shiftTimings,
      address, additionalDetails,
    } = req.body;

    if (fullName !== undefined) s.fullName = fullName;
    if (email !== undefined) s.email = email;
    if (role !== undefined) s.role = role;
    if (phone !== undefined) s.phone = phone;
    if (salary !== undefined) s.salary = Number(salary);
    if (dob !== undefined) {
      s.dob = dob;
      const birth = new Date(dob);
      const diff = Date.now() - birth.getTime();
      s.age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    }
    if (shiftStart !== undefined) s.shiftStart = shiftStart;
    if (shiftEnd !== undefined) s.shiftEnd = shiftEnd;
    if (shiftTimings !== undefined) s.shiftTimings = shiftTimings;
    if (address !== undefined) s.address = address;
    if (additionalDetails !== undefined) s.additionalDetails = additionalDetails;

    if (req.file) {
      if (s.photo) {
        const fpath = path.join(process.cwd(), "backend", "uploads", s.photo);
        fs.unlink(fpath, () => {});
      }
      s.photo = req.file.filename;
    }

    const saved = await s.save();

    // ✅ Update corresponding attendance name/photo if changed
    await Attendance.updateMany(
      { staffId: s._id },
      {
        name: s.fullName,
        photoUrl: s.photo ? `/uploads/${s.photo}` : null,
        timings: s.shiftTimings || `${s.shiftStart} - ${s.shiftEnd}`,
      }
    );

    const obj = saved.toObject();
    if (saved.photo) obj.photoUrl = `/uploads/${saved.photo}`;
    res.json(obj);
  } catch (err) {
    console.error("updateStaff error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const s = await Staff.findById(req.params.id);
    if (!s) return res.status(404).json({ message: "Not found" });

    if (s.photo) {
      const fpath = path.join(process.cwd(), "backend", "uploads", s.photo);
      fs.unlink(fpath, () => {});
    }

    await Attendance.deleteMany({ staffId: s._id });
    await s.deleteOne();

    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("deleteStaff error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
