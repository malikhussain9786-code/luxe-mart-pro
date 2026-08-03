import { Link, useParams } from "react-router-dom";
import { CheckCircle2, Package, MapPin, ChevronRight } from "lucide-react";
import { useOrders } from "../../context/OrderContext.jsx";
import { Button } from "../../components/ui/index.js";
import ItemThumb from "../../components/product/ItemThumb.jsx";

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const { getOrderById } = useOrders();
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-28 text-center">
        <h1 className="font-display text-3xl text-sapphire font-semibold mb-3">Order not found</h1>
        <p className="text-ink/55 text-sm mb-8">This order may have already been viewed in a previous session.</p>
        <Button as={Link} to="/orders" variant="primary">View Order History →</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-16">
      <div className="text-center mb-12">
        <div className="w-16 h-16 rounded-full bg-emerald/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={32} className="text-emerald" />
        </div>
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-amethyst">Order Confirmed</span>
        <h1 className="font-display text-3xl md:text-4xl text-sapphire font-semibold mt-3 mb-2">Thank you, {order.contact.fullName.split(" ")[0]}.</h1>
        <p className="text-ink/55 text-sm">
          Your order <span className="font-mono font-semibold text-sapphire">{order.orderId}</span> from {order.brandName} has been placed.
        </p>
      </div>

      <div className="bg-white border border-sapphire/10 p-8 mb-8">
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-sapphire/10">
          <div className="flex items-center gap-2.5 text-sm font-semibold text-sapphire">
            <Package size={17} className="text-amethyst" /> Order Summary
          </div>
          <span className="text-xs font-bold uppercase tracking-wide bg-gold/15 text-sapphire px-2.5 py-1">{order.status}</span>
        </div>
        <div className="space-y-4 mb-6">
          {order.items.map((item) => (
            <div key={`${item.productId}-${item.variant}`} className="flex items-center gap-3">
              <div className="w-12 h-12 flex-shrink-0">
                <ItemThumb item={item} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13.5px] font-medium text-sapphire truncate">{item.name}</div>
                <div className="text-[11px] text-ink/45">Qty {item.qty}{item.variant && ` · ${item.variant}`}</div>
              </div>
              <div className="font-mono text-[13px] text-sapphire">${(item.price * item.qty).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-baseline border-t border-sapphire/10 pt-5">
          <span className="font-semibold text-sapphire">Total Paid</span>
          <span className="font-mono text-xl font-bold text-sapphire">${order.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="bg-ivory-2 border border-sapphire/10 p-6 mb-10 flex items-start gap-3">
        <MapPin size={18} className="text-amethyst flex-shrink-0 mt-0.5" />
        <p className="text-sm text-ink/65 leading-relaxed">
          {order.address.houseNo}, {order.address.street}
          {order.address.landmark && `, near ${order.address.landmark}`}<br />
          {order.location.city}, {order.location.country}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button as={Link} to={`/orders/${order.orderId}/track`} variant="primary">Track Order <ChevronRight size={15} /></Button>
        <Button as={Link} to={`/orders/${order.orderId}/receipt`} variant="ghost">View Receipt</Button>
        <Button as={Link} to="/" variant="ghost">Continue Shopping</Button>
      </div>
    </div>
  );
}
