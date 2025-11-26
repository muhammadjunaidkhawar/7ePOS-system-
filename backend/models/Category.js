import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  iconClass: { type: String, default: "fa-solid fa-list" },
  items: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
