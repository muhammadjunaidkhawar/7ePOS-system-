// backend/routes/dashboardRoutes.js
import express from "express";
import {
  getStats,
  getPopularDishes,
  getOverview,
  exportExcel,
  createMockOrder,
  toggleReservation,
} from "../controllers/dashboardController.js";

const router = express.Router();

// GET /api/dashboard/stats
router.get("/stats", getStats);

// GET /api/dashboard/popular-dishes
router.get("/popular-dishes", getPopularDishes);

// GET /api/dashboard/overview
router.get("/overview", getOverview);

// GET /api/dashboard/export-excel
router.get("/export-excel", exportExcel);

// Utilities for testing/demo (optional)
router.post("/mock/order", createMockOrder); // body: { total, items }
router.post("/mock/reservation/:id/toggle", toggleReservation);

export default router;
