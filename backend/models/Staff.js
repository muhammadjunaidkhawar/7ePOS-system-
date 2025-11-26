import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    staffId: { type: Number, unique: true }, // auto-increment
    email: { type: String },
    role: { type: String },
    phone: { type: String },
    salary: { type: Number },
    dob: { type: Date },
    shiftStart: { type: String },
    shiftEnd: { type: String },
    shiftTimings: { type: String },
    address: { type: String },
    additionalDetails: { type: String },
    photo: { type: String }, // filename saved in uploads
    photoUrl: { type: String }, // optional full URL if you want
    age: { type: Number }, // store calculated age
  },
  { timestamps: true }
);

// ✅ Calculate age before saving
StaffSchema.pre("save", function (next) {
  if (this.dob) {
    const diff = Date.now() - new Date(this.dob).getTime();
    this.age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  }
  next();
});

export default mongoose.model("Staff", StaffSchema);
