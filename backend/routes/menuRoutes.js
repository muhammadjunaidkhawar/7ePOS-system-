// backend/routes/menuRoutes.js
import express from "express";
import {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const router = express.Router();

// Setup multer storage in backend/uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "..", "uploads");

// Create uploads folder if not exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const name = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;
    cb(null, name);
  },
});

const upload = multer({ storage });

// ✅ Helper middleware for multipart or JSON
const handleMultipart = (req, res, next) => {
  const isMultipart = req.headers["content-type"]?.includes("multipart/form-data");
  if (isMultipart) {
    upload.single("image")(req, res, (err) => {
      if (err)
        return res
          .status(400)
          .json({ message: "File upload error", error: err.message });
      next();
    });
  } else {
    next();
  }
};

// ✅ Routes
router.get("/", getMenuItems);
router.post("/", handleMultipart, createMenuItem);
router.put("/:id", handleMultipart, updateMenuItem); // ✅ Added PUT route
router.delete("/:id", deleteMenuItem); // ✅ Added DELETE route

export default router;
