import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import { seedUsers } from "./controllers/userController.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import reportsRoutes from "./routes/reportsRoutes.js";
//import dashboardRoutes from "./routes/dashboardRoutes.js";   // ✅ added

// New imports for staff and attendance
import staffRoutes from "./routes/staffRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/inventory", inventoryRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/reports", reportsRoutes);

// ✅ Dashboard real-time routes (NEW)
//app.use("/api/dashboard", dashboardRoutes);

// API routes for staff and attendance
app.use("/api/staff", staffRoutes);
app.use("/api/attendance", attendanceRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("POS Backend is running...");
});

// Start server
const start = async () => {
  try {
    await connectDB();
    await seedUsers();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("Startup error:", err);
    process.exit(1);
  }
};

start();
