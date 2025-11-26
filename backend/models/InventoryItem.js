// backend/models/InventoryItem.js
import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: "" },
  unit: { type: String, default: "Piece" }, // piece / litre / kg etc
  stock: { type: Number, default: 0 },
  status: { type: String, default: "Active" }, // Active / Inactive / Draft
  price: { type: Number, default: 0 },
  perishable: { type: Boolean, default: false },
  image: { type: String, default: null }, // stored filename in /uploads
  createdAt: { type: Date, default: Date.now },
});

const InventoryItem = mongoose.model("InventoryItem", inventorySchema);
export default InventoryItem;
