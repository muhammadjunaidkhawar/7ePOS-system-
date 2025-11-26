import express from "express";
import {
  getReservations,
  addReservation,
  deleteReservation,
  updateReservation,
} from "../controllers/reservationController.js";

const router = express.Router();

// GET all or filtered reservations
router.get("/", getReservations);

// POST add new reservation
router.post("/", addReservation);

// PUT update reservation
router.put("/:id", updateReservation);

// DELETE reservation
router.delete("/:id", deleteReservation);

export default router;
