import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    floor: {
      type: String,
      required: true,
      enum: [1, 2, 3],
    },
    table: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
    },
    date: {
      type: String, // e.g., "2025-11-10"
      required: true,
    },
    time: {
      type: String, // e.g., "18:00"
      required: true,
    },
    duration: {
      type: Number, // in hours
      default: 1,
    },
    deposit: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Confirmed", "Pending", "Cancelled"],
      default: "Pending",
    },
    email: String,
    phone: String,
    paymentMethod: {
      type: String,
      enum: ["Cash", "Card"],
      default: "Cash",
    },
    color: {
      type: String,
      default: "bg-[#FF9500]",
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);
export default Reservation;
