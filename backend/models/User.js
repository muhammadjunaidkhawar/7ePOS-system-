import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // shown as Name in UI
  password: { type: String, required: true },
  email: { type: String },
  role: { type: String, default: "User" },
  address: { type: String, default: "" },
  avatar: { type: String, default: "" },
  permissions: { type: [String], default: [] }, // e.g. ["Dashboard","Reports"]
});

// ensure index is created
userSchema.index({ username: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);

export default User;
