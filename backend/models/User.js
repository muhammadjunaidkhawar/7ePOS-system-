import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// ensure index is created
userSchema.index({ username: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);

export default User;
