// backend/controllers/menuController.js
import MenuItem from "../models/MenuItem.js";

// GET /api/menu
export const getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (err) {
    console.error("getMenuItems error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/menu
// Works for both JSON and multipart/form-data
export const createMenuItem = async (req, res) => {
  try {
    const {
      productName,
      itemId,
      stock = 0,
      category,
      price = 0,
      availability = "Available",
      menuType = "",
    } = req.body;

    console.log("Incoming createMenuItem data:", req.body);

    if (!productName || !itemId || !category) {
      return res
        .status(400)
        .json({ message: "productName, itemId and category are required" });
    }

    const exists = await MenuItem.findOne({ itemId });
    if (exists) {
      return res.status(400).json({ message: "Item ID already exists" });
    }

    const imageFileName = req.file ? req.file.filename : null;

    const newItem = new MenuItem({
      productName,
      itemId,
      stock: Number(stock),
      category,
      price: Number(price),
      availability,
      menuType,
      image: imageFileName,
    });

    const saved = await newItem.save();
    console.log("Menu item saved successfully:", saved);
    res.status(201).json(saved);
  } catch (err) {
    console.error("createMenuItem error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

// ✅ PUT /api/menu/:id
export const updateMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    const {
      productName,
      itemId,
      stock,
      category,
      price,
      availability,
      menuType,
    } = req.body;

    if (productName) item.productName = productName;
    if (itemId) item.itemId = itemId;
    if (stock !== undefined) item.stock = Number(stock);
    if (category) item.category = category;
    if (price !== undefined) item.price = Number(price);
    if (availability) item.availability = availability;
    if (menuType) item.menuType = menuType;

    if (req.file) {
      item.image = req.file.filename;
    }

    const updated = await item.save();
    console.log("Menu item updated successfully:", updated);
    res.status(200).json(updated);
  } catch (err) {
    console.error("updateMenuItem error:", err);
    res.status(500).json({ message: "Failed to update item", error: err.message });
  }
};

// ✅ DELETE /api/menu/:id
export const deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    await item.deleteOne();
    console.log("Menu item deleted successfully:", req.params.id);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error("deleteMenuItem error:", err);
    res.status(500).json({ message: "Failed to delete item", error: err.message });
  }
};
