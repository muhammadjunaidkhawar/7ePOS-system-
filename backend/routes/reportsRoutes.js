import express from "express";
import { getReports, generateReportPDF } from "../controllers/reportsController.js";

const router = express.Router();

router.get("/", getReports);
router.get("/generate-pdf", generateReportPDF);

export default router;
