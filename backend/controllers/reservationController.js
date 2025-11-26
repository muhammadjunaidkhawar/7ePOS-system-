import Reservation from "../models/Reservation.js";

// ✅ Get all reservations (optionally filter by floor or date)
export const getReservations = async (req, res) => {
  try {
    const { floor, date } = req.query;
    const filter = {};
    if (floor) filter.floor = floor;
    if (date) filter.date = date;

    const reservations = await Reservation.find(filter);
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Add new reservation
export const addReservation = async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    const saved = await reservation.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error: error.message });
  }
};

// ✅ Delete reservation
export const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Reservation.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Reservation deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update reservation
export const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Reservation.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
