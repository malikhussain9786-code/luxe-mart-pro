import jsPDF from "jspdf";

export function generateReceiptPdf(order) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 48;
  let y = 60;

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(20, 33, 61); // sapphire
  doc.text("Luxe Mart Pro", marginX, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 130);
  doc.text("Portfolio demo marketplace · No real transaction processed", marginX, y + 16);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(110, 58, 168); // amethyst
  doc.text("RECEIPT", pageWidth - marginX, y, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(90, 90, 100);
  doc.text(order.orderId, pageWidth - marginX, y + 16, { align: "right" });
  doc.text(new Date(order.placedAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }), pageWidth - marginX, y + 30, { align: "right" });

  y += 55;
  doc.setDrawColor(230, 225, 210);
  doc.line(marginX, y, pageWidth - marginX, y);
  y += 30;

  // Billing / shipping block
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(20, 33, 61);
  doc.text("BILL TO", marginX, y);
  doc.text("SOLD BY", pageWidth / 2 + 10, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(60, 60, 70);
  const billLines = [
    order.contact.fullName,
    order.contact.email,
    order.contact.phone,
    `${order.address.houseNo}, ${order.address.street}`,
    order.address.landmark ? `Near ${order.address.landmark}` : null,
    `${order.location.city}, ${order.location.country}`,
  ].filter(Boolean);
  billLines.forEach((line, i) => doc.text(line, marginX, y + 16 + i * 13));

  doc.text(order.brandName, pageWidth / 2 + 10, y + 16);
  doc.text("Demo Brand Partner — Luxe Mart Pro", pageWidth / 2 + 10, y + 29);

  y += 16 + billLines.length * 13 + 30;

  // Items table header
  doc.setFillColor(20, 33, 61);
  doc.rect(marginX, y, pageWidth - marginX * 2, 24, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(250, 247, 241);
  doc.text("ITEM", marginX + 10, y + 16);
  doc.text("QTY", pageWidth - marginX - 150, y + 16);
  doc.text("PRICE", pageWidth - marginX - 100, y + 16);
  doc.text("TOTAL", pageWidth - marginX - 40, y + 16, { align: "right" });
  y += 24;

  doc.setFont("helvetica", "normal");
  doc.setTextColor(40, 40, 50);
  order.items.forEach((item, i) => {
    const rowY = y + 20 + i * 22;
    if (i % 2 === 0) {
      doc.setFillColor(250, 247, 241);
      doc.rect(marginX, rowY - 14, pageWidth - marginX * 2, 22, "F");
    }
    doc.setFontSize(9);
    doc.text(item.name.length > 45 ? item.name.slice(0, 45) + "..." : item.name, marginX + 10, rowY);
    doc.text(String(item.qty), pageWidth - marginX - 150, rowY);
    doc.text(`$${item.price.toFixed(2)}`, pageWidth - marginX - 100, rowY);
    doc.text(`$${(item.price * item.qty).toFixed(2)}`, pageWidth - marginX - 10, rowY, { align: "right" });
  });

  y += 20 + order.items.length * 22 + 20;

  // Totals
  const totalsX = pageWidth - marginX - 180;
  doc.setFontSize(9.5);
  doc.setTextColor(90, 90, 100);
  doc.text("Subtotal", totalsX, y);
  doc.text(`$${order.subtotal.toFixed(2)}`, pageWidth - marginX - 10, y, { align: "right" });
  y += 16;
  doc.text("Shipping", totalsX, y);
  doc.text(order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`, pageWidth - marginX - 10, y, { align: "right" });
  y += 16;
  doc.text("Tax", totalsX, y);
  doc.text(`$${order.tax.toFixed(2)}`, pageWidth - marginX - 10, y, { align: "right" });
  y += 12;
  doc.setDrawColor(230, 225, 210);
  doc.line(totalsX, y, pageWidth - marginX - 10, y);
  y += 20;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(20, 33, 61);
  doc.text("Total Paid", totalsX, y);
  doc.text(`$${order.total.toFixed(2)}`, pageWidth - marginX - 10, y, { align: "right" });

  y += 40;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(90, 90, 100);
  doc.text(
    `Payment method: ${order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod === "wallet" ? "Luxe Pay Wallet" : `Card ending in ${order.cardLast4 || "----"}`}`,
    marginX,
    y
  );

  y += 40;
  doc.setDrawColor(230, 225, 210);
  doc.line(marginX, y, pageWidth - marginX, y);
  y += 20;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 160);
  doc.text("This is a simulated receipt generated for demonstration purposes. No real payment was processed.", marginX, y);
  doc.text("Luxe Mart Pro — Portfolio Demo Project by Malik, BSSE, Foundation University Islamabad.", marginX, y + 12);

  doc.save(`${order.orderId}-receipt.pdf`);
}
