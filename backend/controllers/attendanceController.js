// backend/controllers/attendanceController.js
import Attendance from "../models/Attendance.js";
import Staff from "../models/Staff.js";

export const getAllAttendance = async (req, res) => {
  try {
    const list = await Attendance.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    console.error("getAllAttendance error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createAttendance = async (req, res) => {
  try {
    const { staffId, name, photoUrl, date, timings, status } = req.body;
    const doc = new Attendance({ staffId, name, photoUrl, date, timings, status });
    const saved = await doc.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("createAttendance error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateAttendance = async (req, res) => {
  try {
    const a = await Attendance.findById(req.params.id);
    if (!a) return res.status(404).json({ message: "Not found" });

    const { staffId, name, photoUrl, date, timings, status } = req.body;
    if (staffId !== undefined) a.staffId = staffId;
    if (name !== undefined) a.name = name;
    if (photoUrl !== undefined) a.photoUrl = photoUrl;
    if (date !== undefined) a.date = date;
    if (timings !== undefined) a.timings = timings;
    if (status !== undefined) a.status = status;

    const saved = await a.save();
    res.json(saved);
  } catch (err) {
    console.error("updateAttendance error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteAttendance = async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("deleteAttendance error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
