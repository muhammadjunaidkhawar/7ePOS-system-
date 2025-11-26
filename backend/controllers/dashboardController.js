// backend/controllers/dashboardController.js
import Order from "../models/Order.js";
import MenuItem from "../models/MenuItem.js";
import Reservation from "../models/Reservation.js";
import excelGenerator from "../utils/excelGenerator.js";

/**
 * Helper: start of today ISO
 */
const startOfDay = (d = new Date()) => {
  const dt = new Date(d);
  dt.setHours(0, 0, 0, 0);
  return dt;
};

const endOfDay = (d = new Date()) => {
  const dt = new Date(d);
  dt.setHours(23, 59, 59, 999);
  return dt;
};

/**
 * GET /api/dashboard/stats
 * Responds with:
 * {
 *   dailySales,
 *   monthlyRevenue,
 *   tableOccupancy,
 *   dailyTrend: [7 days totals],
 *   monthlyTrend: [6 months totals],
 *   occupancyTrend: [6 snapshots],
 *   lastUpdated
 * }
 */
export const getStats = async (req, res) => {
  try {
    const now = new Date();

    // daily sales: sum of orders.completed for today (status Completed)
    const dailyMatch = {
      createdAt: { $gte: startOfDay(now), $lte: endOfDay(now) },
      status: "Completed",
    };
    const dailyAgg = await Order.aggregate([
      { $match: dailyMatch },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);
    const dailySales = (dailyAgg[0] && dailyAgg[0].total) || 0;

    // monthly revenue: sum of orders.createdAt in current month (Completed)
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlyAgg = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfMonth, $lte: endOfDay(now) }, status: "Completed" } },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);
    const monthlyRevenue = (monthlyAgg[0] && monthlyAgg[0].total) || 0;

    // table occupancy: count unique tableNo from active orders today OR confirmed reservations for today
    const activeOrdersTables = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfDay(now), $lte: endOfDay(now) },
          status: { $ne: "Cancelled" },
          tableNo: { $ne: null },
        },
      },
      { $group: { _id: "$tableNo" } },
      { $count: "count" },
    ]);
    const activeOrdersCount = (activeOrdersTables[0] && activeOrdersTables[0].count) || 0;

    const todayDateString = now.toISOString().slice(0, 10); // format like "2025-11-17"
    const confirmedReservationsCountAgg = await Reservation.aggregate([
      { $match: { date: todayDateString, status: "Confirmed" } },
      { $group: { _id: "$table" } },
      { $count: "count" },
    ]);
    const confirmedReservationsCount = (confirmedReservationsCountAgg[0] && confirmedReservationsCountAgg[0].count) || 0;

    // We consider occupancy as union of both (unique tables)
    // Simpler: sum both (if same table numbers used consistently, you'll want union; for simplicity sum here)
    const tableOccupancy = Math.max(activeOrdersCount, confirmedReservationsCount);

    // dailyTrend: last 7 days totals
    const dailyTrend = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const start = startOfDay(d);
      const end = endOfDay(d);

      const agg = await Order.aggregate([
        { $match: { createdAt: { $gte: start, $lte: end }, status: "Completed" } },
        { $group: { _id: null, total: { $sum: "$total" } } },
      ]);
      dailyTrend.push((agg[0] && agg[0].total) || 0);
    }

    // monthlyTrend: last 6 months totals (including current)
    const monthlyTrend = [];
    for (let i = 5; i >= 0; i--) {
      const m = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const start = new Date(m.getFullYear(), m.getMonth(), 1);
      const end = new Date(m.getFullYear(), m.getMonth() + 1, 1);
      const agg = await Order.aggregate([
        { $match: { createdAt: { $gte: start, $lt: end }, status: "Completed" } },
        { $group: { _id: null, total: { $sum: "$total" } } },
      ]);
      monthlyTrend.push((agg[0] && agg[0].total) || 0);
    }

    // occupancyTrend: last 6 reservations snapshots (approx.)
    const recentReservations = await Reservation.find().sort({ updatedAt: -1 }).limit(6).lean();
    const occupancyTrend = recentReservations.map((r) => (r.status === "Confirmed" ? 1 : 0));
    while (occupancyTrend.length < 6) occupancyTrend.push(0);

    return res.json({
      dailySales,
      monthlyRevenue,
      tableOccupancy,
      dailyTrend,
      monthlyTrend,
      occupancyTrend,
      lastUpdated: new Date(),
    });
  } catch (err) {
    console.error("getStats error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/dashboard/popular-dishes
 * Returns most ordered menu items aggregated by order items
 * Response: [{ name, count, price, image }]
 */
export const getPopularDishes = async (req, res) => {
  try {
    // aggregate through Order.items (items: [{ item: String, qty, price }])
    const pipeline = [
      { $unwind: "$items" },
      { $group: { _id: "$items.item", totalQty: { $sum: "$items.qty" }, avgPrice: { $avg: "$items.price" } } },
      { $sort: { totalQty: -1 } },
      { $limit: 10 },
    ];

    const results = await Order.aggregate(pipeline);

    // enrich with MenuItem details (image, productName) if exists
    const enriched = await Promise.all(
      results.map(async (r) => {
        const menu = await MenuItem.findOne({ productName: r._id }).lean();
        return {
          name: r._id,
          count: r.totalQty,
          price: Math.round((r.avgPrice || (menu && menu.price) || 0) * 100) / 100,
          image: (menu && (menu.image || null)) || null,
          availability: (menu && menu.availability) || "Available",
        };
      })
    );

    return res.json(enriched);
  } catch (err) {
    console.error("getPopularDishes error", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/dashboard/overview
 * Returns arrays for plotting: labels (months) and dataset sales/revenue
 * Query params:
 *  - range=12 (months) default 12
 */
export const getOverview = async (req, res) => {
  try {
    const range = parseInt(req.query.range || "12", 10);
    const now = new Date();

    const labels = [];
    const sales = []; // number of orders
    const revenue = []; // sum of totals

    for (let i = range - 1; i >= 0; i--) {
      const t = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const start = new Date(t.getFullYear(), t.getMonth(), 1);
      const end = new Date(t.getFullYear(), t.getMonth() + 1, 1);
      const label = start.toLocaleString("default", { month: "short" }).toUpperCase();
      labels.push(label);

      const aggOrders = await Order.aggregate([
        { $match: { createdAt: { $gte: start, $lt: end }, status: "Completed" } },
        { $group: { _id: null, totalRevenue: { $sum: "$total" }, count: { $sum: 1 } } },
      ]);
      sales.push((aggOrders[0] && aggOrders[0].count) || 0);
      revenue.push((aggOrders[0] && aggOrders[0].totalRevenue) || 0);
    }

    return res.json({ labels, sales, revenue });
  } catch (err) {
    console.error("getOverview error", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/dashboard/export-excel
 * Generates an Excel file with:
 * - Top stats
 * - Popular dishes
 * - Overview data
 *
 * Query params:
 *  - range (months) optional
 */
export const exportExcel = async (req, res) => {
  try {
    // gather same data as endpoints
    const statsResp = await (await fetchStatsForExport()).catch((err) => {
      console.error("exportExcel fetchStatsForExport error", err);
      return null;
    });

    // popular dishes
    const popular = await (async () => {
      const pipeline = [
        { $unwind: "$items" },
        { $group: { _id: "$items.item", totalQty: { $sum: "$items.qty" }, avgPrice: { $avg: "$items.price" } } },
        { $sort: { totalQty: -1 } },
        { $limit: 50 },
      ];
      const results = await Order.aggregate(pipeline);
      return await Promise.all(
        results.map(async (r) => {
          const menu = await MenuItem.findOne({ productName: r._id }).lean();
          return {
            name: r._id,
            count: r.totalQty,
            price: Math.round((r.avgPrice || (menu && menu.price) || 0) * 100) / 100,
          };
        })
      );
    })();

    // overview (12 months)
    const overviewResp = await getOverviewDataForExport(req.query.range || 12);

    // generate workbook buffer
    const buffer = await excelGenerator({
      stats: statsResp,
      popular,
      overview: overviewResp,
    });

    // send buffer
    res.setHeader("Content-Disposition", `attachment; filename=dashboard-report-${new Date().toISOString().slice(0,10)}.xlsx`);
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    return res.send(buffer);
  } catch (err) {
    console.error("exportExcel error", err);
    return res.status(500).json({ message: "Server error in export" });
  }
};

/**
 * Helper: fetchStatsForExport internal (mirrors getStats but returns simplified object)
 */
async function fetchStatsForExport() {
  const now = new Date();

  // daily sales
  const dailyAgg = await Order.aggregate([
    { $match: { createdAt: { $gte: startOfDay(now), $lte: endOfDay(now) }, status: "Completed" } },
    { $group: { _id: null, total: { $sum: "$total" } } },
  ]);
  const dailySales = (dailyAgg[0] && dailyAgg[0].total) || 0;

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthlyAgg = await Order.aggregate([
    { $match: { createdAt: { $gte: startOfMonth, $lte: endOfDay(now) }, status: "Completed" } },
    { $group: { _id: null, total: { $sum: "$total" } } },
  ]);
  const monthlyRevenue = (monthlyAgg[0] && monthlyAgg[0].total) || 0;

  const activeOrdersTables = await Order.aggregate([
    { $match: { createdAt: { $gte: startOfDay(now), $lte: endOfDay(now) }, status: { $ne: "Cancelled" }, tableNo: { $ne: null } } },
    { $group: { _id: "$tableNo" } },
    { $count: "count" },
  ]);
  const activeOrdersCount = (activeOrdersTables[0] && activeOrdersTables[0].count) || 0;

  const todayDateString = now.toISOString().slice(0, 10);
  const confirmedReservationsCountAgg = await Reservation.aggregate([
    { $match: { date: todayDateString, status: "Confirmed" } },
    { $group: { _id: "$table" } },
    { $count: "count" },
  ]);
  const confirmedReservationsCount = (confirmedReservationsCountAgg[0] && confirmedReservationsCountAgg[0].count) || 0;

  const tableOccupancy = Math.max(activeOrdersCount, confirmedReservationsCount);

  return {
    dailySales,
    monthlyRevenue,
    tableOccupancy,
    lastUpdated: new Date(),
  };
}

/**
 * Helper: getOverviewDataForExport(range)
 */
async function getOverviewDataForExport(range = 12) {
  const now = new Date();
  const labels = [];
  const sales = [];
  const revenue = [];
  for (let i = range - 1; i >= 0; i--) {
    const t = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const start = new Date(t.getFullYear(), t.getMonth(), 1);
    const end = new Date(t.getFullYear(), t.getMonth() + 1, 1);
    const label = start.toLocaleString("default", { month: "short" }).toUpperCase();
    labels.push(label);

    const aggOrders = await Order.aggregate([
      { $match: { createdAt: { $gte: start, $lt: end }, status: "Completed" } },
      { $group: { _id: null, totalRevenue: { $sum: "$total" }, count: { $sum: 1 } } },
    ]);
    sales.push((aggOrders[0] && aggOrders[0].count) || 0);
    revenue.push((aggOrders[0] && aggOrders[0].totalRevenue) || 0);
  }
  return { labels, sales, revenue };
}

/**
 * Optional test endpoints: createMockOrder, toggleReservation
 */
export const createMockOrder = async (req, res) => {
  try {
    const { total = 200, items = [{ item: "Mock Dish", qty: 1, price: total }], tableNo = null, customerName = "Test" } = req.body;
    const order = await Order.create({
      customerName,
      tableNo,
      items,
      status: "Completed",
      subtotal: total,
      total,
      createdAt: new Date(),
    });
    return res.json({ created: true, order });
  } catch (err) {
    console.error("createMockOrder error", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const toggleReservation = async (req, res) => {
  try {
    const id = req.params.id;
    const r = await Reservation.findById(id);
    if (!r) return res.status(404).json({ message: "Not found" });
    r.status = r.status === "Confirmed" ? "Cancelled" : "Confirmed";
    await r.save();
    return res.json({ updated: true, reservation: r });
  } catch (err) {
    console.error("toggleReservation error", err);
    return res.status(500).json({ message: "Server error" });
  }
};
