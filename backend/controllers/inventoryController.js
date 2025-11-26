// backend/controllers/inventoryController.js
import InventoryItem from "../models/InventoryItem.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, "..", "uploads");

// GET /api/inventory
export const getInventory = async (req, res) => {
  try {
    const items = await InventoryItem.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (err) {
    console.error("getInventory error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/inventory (multipart/form-data, field "image")
export const createInventory = async (req, res) => {
  try {
    const {
      name,
      category = "",
      unit = "Piece",
      stock = 0,
      status = "Active",
      price = 0,
      perishable = false,
    } = req.body;

    if (!name) return res.status(400).json({ message: "Name is required" });

    const image = req.file ? req.file.filename : null;

    const item = new InventoryItem({
      name,
      category,
      unit,
      stock: Number(stock),
      status,
      price: Number(price),
      perishable: perishable === "true" || perishable === true,
      image,
    });

    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("createInventory error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/inventory/:id (update)
export const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      category,
      unit,
      stock,
      status,
      price,
      perishable,
    } = req.body;

    const item = await InventoryItem.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    // if a new file uploaded, remove old file (optional)
    if (req.file) {
      if (item.image) {
        const oldPath = path.join(uploadsDir, item.image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      item.image = req.file.filename;
    }

    if (name !== undefined) item.name = name;
    if (category !== undefined) item.category = category;
    if (unit !== undefined) item.unit = unit;
    if (stock !== undefined) item.stock = Number(stock);
    if (status !== undefined) item.status = status;
    if (price !== undefined) item.price = Number(price);
    if (perishable !== undefined)
      item.perishable = perishable === "true" || perishable === true;

    const saved = await item.save();
    res.status(200).json(saved);
  } catch (err) {
    console.error("updateInventory error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/inventory/:id
export const deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await InventoryItem.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (item.image) {
      const imgPath = path.join(uploadsDir, item.image);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }

    await InventoryItem.deleteOne({ _id: id });
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    console.error("deleteInventory error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
