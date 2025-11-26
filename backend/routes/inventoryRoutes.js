// backend/routes/inventoryRoutes.js
import express from "express";
import {
  getInventory,
  createInventory,
  updateInventory,
  deleteInventory,
} from "../controllers/inventoryController.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "..", "uploads");

// make sure uploads folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "-");
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const upload = multer({ storage });

router.get("/", getInventory);
router.post("/", upload.single("image"), createInventory);
router.put("/:id", upload.single("image"), updateInventory);
router.delete("/:id", deleteInventory);

export default router;
