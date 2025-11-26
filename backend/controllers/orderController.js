// backend/controllers/orderController.js
import Order from "../models/Order.js";

// GET /api/orders
export const getOrders = async (req, res) => {
  try {
    // optional query filters (status, search)
    const { status, q } = req.query;
    const filter = {};
    if (status && status !== "All") filter.status = status;
    if (q) {
      const regex = new RegExp(q, "i");
      filter.$or = [{ customerName: regex }, { "items.item": regex }];
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error("getOrders error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      tableNo,
      items = [],
      status = "In Process",
      paymentMethod = "Cash",
      notes = "",
      tip = 0,
    } = req.body;

    if (!customerName) return res.status(400).json({ message: "customerName required" });

    // compute subtotal and total
    const subtotal = items.reduce((s, it) => s + (Number(it.price) || 0) * (Number(it.qty) || 0), 0);
    const total = subtotal + (Number(tip) || 0);

    const order = new Order({
      customerName,
      tableNo: tableNo || null,
      items,
      status,
      paymentMethod,
      notes,
      tip: Number(tip) || 0,
      subtotal,
      total,
    });

    const saved = await order.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("createOrder error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/orders/:id
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    if (update.items) {
      // recalc totals if items or tip changed
      const subtotal = update.items.reduce((s, it) => s + (Number(it.price) || 0) * (Number(it.qty) || 0), 0);
      update.subtotal = subtotal;
      update.total = subtotal + (Number(update.tip) || 0);
    } else if (typeof update.tip !== "undefined") {
      // fetch existing subtotal to recompute total
      const existing = await Order.findById(id);
      if (existing) {
        update.total = existing.subtotal + (Number(update.tip) || 0);
      }
    }

    const updated = await Order.findByIdAndUpdate(id, update, { new: true });
    if (!updated) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(updated);
  } catch (err) {
    console.error("updateOrder error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/orders/:id
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Order.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ message: "Order deleted" });
  } catch (err) {
    console.error("deleteOrder error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
