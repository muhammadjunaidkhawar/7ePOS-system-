// backend/utils/excelGenerator.js
import ExcelJS from "exceljs";

/**
 * excelGenerator({ stats, popular, overview })
 * Returns: Buffer of workbook
 */
export default async function excelGenerator({ stats = {}, popular = [], overview = { labels: [], sales: [], revenue: [] } }) {
  const wb = new ExcelJS.Workbook();
  wb.creator = "POS System";
  wb.created = new Date();

  // STATS sheet
  const s1 = wb.addWorksheet("Top Stats");
  s1.columns = [
    { header: "Metric", key: "metric", width: 30 },
    { header: "Value", key: "value", width: 30 },
  ];
  s1.addRow({ metric: "Daily Sales", value: stats.dailySales || 0 });
  s1.addRow({ metric: "Monthly Revenue", value: stats.monthlyRevenue || 0 });
  s1.addRow({ metric: "Table Occupancy", value: stats.tableOccupancy || 0 });
  s1.addRow({ metric: "Last Updated", value: stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleString() : "" });

  // POPULAR DISHES sheet
  const s2 = wb.addWorksheet("Popular Dishes");
  s2.columns = [
    { header: "Name", key: "name", width: 32 },
    { header: "Orders", key: "orders", width: 12 },
    { header: "Price", key: "price", width: 12 },
  ];
  popular.forEach((p) => {
    s2.addRow({ name: p.name, orders: p.count, price: p.price });
  });

  // OVERVIEW sheet (chart data)
  const s3 = wb.addWorksheet("Overview");
  s3.columns = [
    { header: "Period", key: "period", width: 20 },
    { header: "Orders (count)", key: "orders", width: 18 },
    { header: "Revenue", key: "revenue", width: 18 },
  ];
  const labels = overview.labels || [];
  for (let i = 0; i < labels.length; i++) {
    s3.addRow({ period: labels[i], orders: (overview.sales && overview.sales[i]) || 0, revenue: (overview.revenue && overview.revenue[i]) || 0 });
  }

  // Format header rows simple bold
  [s1, s2, s3].forEach((sheet) => {
    sheet.getRow(1).font = { bold: true };
  });

  const buffer = await wb.xlsx.writeBuffer();
  return buffer;
}
