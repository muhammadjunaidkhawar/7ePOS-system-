// backend/routes/attendanceRoutes.js
import express from "express";
import Attendance from "../models/Attendance.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const list = await Attendance.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    console.error("getAllAttendance error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const record = await Attendance.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    console.error("createAttendance error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error("updateAttendance error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error("deleteAttendance error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
