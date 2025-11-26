import Reservation from "../models/Reservation.js";
import Order from "../models/Order.js";
import Staff from "../models/Staff.js";
import PDFDocument from "pdfkit";

export const getReports = async (req, res) => {
  try {
    const { type } = req.query;

    if (!type)
      return res.status(400).json({ message: "Report type is required" });

    let data;
    if (type === "reservation") {
      data = await Reservation.find();
    } else if (type === "revenue") {
      data = await Order.find();
    } else if (type === "staff") {
      data = await Staff.find();
    } else {
      return res.status(400).json({ message: "Invalid report type" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ message: "Error fetching report data" });
  }
};

export const generateReportPDF = async (req, res) => {
  try {
    const { type } = req.query;

    let data, title;

    if (type === "reservation") {
      data = await Reservation.find();
      title = "Reservation Report";
    } else if (type === "revenue") {
      data = await Order.find();
      title = "Revenue Report";
    } else if (type === "staff") {
      data = await Staff.find();
      title = "Staff Report";
    } else {
      return res.status(400).json({ message: "Invalid report type" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${type}_report.pdf`
    );

    const doc = new PDFDocument({ margin: 40 });
    doc.pipe(res);

    // HEADER
    doc.rect(0, 0, doc.page.width, 70).fill("#1E3A8A");
    doc
      .fill("#FFFFFF")
      .fontSize(28)
      .font("Helvetica-Bold")
      .text(title, 40, 20);

    doc.moveDown(2);

    // BODY
    data.forEach((item, index) => {
      const yStart = doc.y;

      // Box background
      doc
        .rect(30, yStart, doc.page.width - 60, 200)
        .fillOpacity(0.08)
        .fill("#1E3A8A")
        .fillOpacity(1);

      doc
        .fill("#000")
        .font("Helvetica-Bold")
        .fontSize(14)
        .text(`${index + 1}.`, 40, yStart + 10);

      let cursor = yStart + 10;

      // Helper for clean fields
      const printField = (label, value) => {
        doc
          .font("Helvetica-Bold")
          .fontSize(12)
          .fill("#1E3A8A")
          .text(`${label}:`, 70, cursor);

        doc
          .font("Helvetica")
          .fill("#000")
          .text(value ?? "-", 150, cursor, { width: doc.page.width - 200 });

        cursor += 20;
      };

      // STAFF FIELDS
      if (type === "staff") {
        printField("Full Name", item.fullName);
        printField("Email", item.email);
        printField("Phone", item.phone);
        printField("Role", item.role);
        printField("Shift Timings", item.shiftTimings);
        printField("Address", item.address);
        printField("Extra Details", item.additionalDetails);
      }

      // RESERVATION FIELDS
      if (type === "reservation") {
        printField("Name", item.name);
        printField("Phone", item.phone);
        printField("Date", item.date);
        printField("Time", item.time);
        printField("Guests", item.guests);
        printField("Table", item.table);
      }

      // REVENUE FIELDS
      if (type === "revenue") {
        printField("Order ID", item.orderId);
        printField("Amount", item.amount);
        printField("Method", item.paymentMethod);
        printField("Date", item.createdAt?.toString());
      }

      doc.moveDown(4);

      // PAGE BREAK
      if (doc.y > doc.page.height - 200) doc.addPage();
    });

    // FOOTER
    doc
      .fontSize(10)
      .fill("#555")
      .text("Auto-generated report • POS System", 40, doc.page.height - 40);

    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ message: "Failed to generate report PDF" });
  }
};
