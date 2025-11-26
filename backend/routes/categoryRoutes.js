import express from "express";
import { getCategories, createCategory } from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getCategories);        // GET /api/categories
router.post("/", createCategory);     // POST /api/categories

export default router;
