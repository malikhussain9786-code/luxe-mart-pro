import { Link, useParams } from "react-router-dom";
import { Download, ChevronRight, Printer } from "lucide-react";
import { useOrders } from "../../context/OrderContext.jsx";
import { Button } from "../../components/ui/index.js";
import { generateReceiptPdf } from "../../utils/generateReceiptPdf.js";

export default function Receipt() {
  const { orderId } = useParams();
  const { getOrderById } = useOrders();
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-28 text-center">
        <h1 className="font-display text-3xl text-sapphire font-semibold mb-3">Receipt not found</h1>
        <Button as={Link} to="/orders" variant="primary">View Order History →</Button>
      </div>
    );
  }

  const paymentLabel =
    order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod === "wallet" ? "Luxe Pay Wallet" : `Card ending in ${order.cardLast4 || "----"}`;

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-12">
      <div className="flex items-center gap-2 text-xs text-ink/45 mb-6 print:hidden">
        <Link to="/orders" className="hover:text-amethyst">Order History</Link>
        <ChevronRight size={12} />
        <span className="text-sapphire font-medium">Receipt</span>
      </div>

      <div className="flex items-center justify-between mb-8 print:hidden">
        <h1 className="font-display text-3xl text-sapphire font-semibold">Receipt</h1>
        <div className="flex gap-3">
          <Button variant="ghost" size="sm" onClick={() => window.print()}>
            <Printer size={14} /> Print
          </Button>
          <Button variant="primary" size="sm" onClick={() => generateReceiptPdf(order)}>
            <Download size={14} /> Download PDF
          </Button>
        </div>
      </div>

      <div className="bg-white border border-sapphire/10 p-10 print:border-none print:p-0">
        <div className="flex justify-between items-start mb-10 pb-8 border-b border-sapphire/10">
          <div>
            <div className="font-display text-2xl font-semibold text-sapphire">Luxe Mart Pro</div>
            <div className="text-[11px] text-ink/45 mt-1">Portfolio demo marketplace · No real transaction processed</div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold uppercase tracking-wide text-amethyst mb-1">Receipt</div>
            <div className="font-mono text-sm font-semibold text-sapphire">{order.orderId}</div>
            <div className="text-xs text-ink/45 mt-1">
              {new Date(order.placedAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-sapphire/50 mb-2">Bill To</div>
            <p className="text-sm text-ink/70 leading-relaxed">
              {order.contact.fullName}<br />
              {order.contact.email}<br />
              {order.contact.phone}<br />
              {order.address.houseNo}, {order.address.street}
              {order.address.landmark && `, near ${order.address.landmark}`}<br />
              {order.location.city}, {order.location.country}
            </p>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-sapphire/50 mb-2">Sold By</div>
            <p className="text-sm text-ink/70 leading-relaxed">
              {order.brandName}<br />
              Demo Brand Partner — Luxe Mart Pro
            </p>
          </div>
        </div>

        <table className="w-full mb-10">
          <thead>
            <tr className="bg-sapphire text-ivory text-left text-[11px] uppercase tracking-wide">
              <th className="py-3 px-3 font-semibold">Item</th>
              <th className="py-3 px-3 font-semibold text-center">Qty</th>
              <th className="py-3 px-3 font-semibold text-right">Price</th>
              <th className="py-3 px-3 font-semibold text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, i) => (
              <tr key={`${item.productId}-${item.variant}`} className={i % 2 === 0 ? "bg-ivory-2" : ""}>
                <td className="py-3 px-3 text-[13.5px] text-ink/75">{item.name}{item.variant && <span className="text-ink/40"> · {item.variant}</span>}</td>
                <td className="py-3 px-3 text-[13.5px] text-center font-mono">{item.qty}</td>
                <td className="py-3 px-3 text-[13.5px] text-right font-mono">${item.price.toFixed(2)}</td>
                <td className="py-3 px-3 text-[13.5px] text-right font-mono font-semibold text-sapphire">${(item.price * item.qty).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mb-10">
          <div className="w-64 space-y-2.5">
            <div className="flex justify-between text-sm text-ink/60">
              <span>Subtotal</span><span className="font-mono">${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-ink/60">
              <span>Shipping</span><span className="font-mono">{order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-sm text-ink/60">
              <span>Tax</span><span className="font-mono">${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-baseline border-t border-sapphire/10 pt-3">
              <span className="font-semibold text-sapphire">Total Paid</span>
              <span className="font-mono text-xl font-bold text-sapphire">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="text-sm text-ink/60 mb-10">
          <span className="text-xs font-bold uppercase tracking-wide text-sapphire/50 block mb-1.5">Payment Method</span>
          {paymentLabel}
        </div>

        <div className="text-[11px] text-ink/40 border-t border-sapphire/10 pt-6 leading-relaxed">
          This is a simulated receipt generated for demonstration purposes. No real payment was processed.<br />
          Luxe Mart Pro — Portfolio Demo Project by Malik, BSSE, Foundation University Islamabad.
        </div>
      </div>
    </div>
  );
}
