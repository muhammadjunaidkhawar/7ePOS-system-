import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., "staff"
  seq: { type: Number, default: 100 }, // start from 101
});

export default mongoose.model("Counter", counterSchema);
