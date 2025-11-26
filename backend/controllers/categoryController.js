import Category from "../models/category.js";

// GET /api/categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(Array.isArray(categories) ? categories : []);
  } catch (err) {
    console.error("getCategories error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/categories
export const createCategory = async (req, res) => {
  try {
    const { name, iconClass, items } = req.body;
    console.log("createCategory req.body:", req.body); // <-- debug log

    if (!name) return res.status(400).json({ message: "Name is required" });

    const itemsNumber = items === undefined ? 0 : Number(items);
    if (isNaN(itemsNumber) || itemsNumber < 0) {
      return res.status(400).json({ message: "Items must be a non-negative number" });
    }

    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ message: "Category already exists" });

    const category = new Category({
      name,
      iconClass: iconClass || "fa-solid fa-list",
      items: itemsNumber,
    });

    const savedCategory = await category.save();
    console.log("savedCategory:", savedCategory); // <-- debug log
    res.status(201).json(savedCategory);
  } catch (err) {
    console.error("createCategory error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
