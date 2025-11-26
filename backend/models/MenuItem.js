// backend/models/MenuItem.js
import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  itemId: { type: String, required: true, unique: true },
  stock: { type: Number, default: 0 },
  category: { type: String, required: true },
  price: { type: Number, default: 0 },
  availability: { type: String, enum: ["Available","Out of Stock","Unavailable"], default: "Available" },
  menuType: { type: String, default: "" }, // Normal Menu / Special Deals etc
  image: { type: String, default: null }, // will store filename / URL
  createdAt: { type: Date, default: Date.now },
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
export default MenuItem;
