// backend/models/Attendance.js
import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema(
  {
    staffId: { type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: true },
    name: { type: String },
    photoUrl: { type: String },
    date: { type: String },
    timings: { type: String },
    status: { type: String, default: "" }, // Present / Absent / Half Shift / Leave
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", AttendanceSchema);
