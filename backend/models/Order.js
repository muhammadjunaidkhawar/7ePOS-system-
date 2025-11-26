// backend/models/Order.js
import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  qty: { type: Number, required: true, default: 1 },
  item: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
});

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  tableNo: { type: Number, default: null },
  items: { type: [OrderItemSchema], default: [] },
  status: { type: String, enum: ["In Process","Ready","Completed","Cancelled"], default: "In Process" },
  paymentMethod: { type: String, enum: ["Cash","Card","Online"], default: "Cash" },
  notes: { type: String, default: "" },
  tip: { type: Number, default: 0 },
  subtotal: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
