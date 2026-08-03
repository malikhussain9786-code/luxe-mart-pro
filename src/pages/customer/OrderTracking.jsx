import { Link, useParams } from "react-router-dom";
import { Clock, PackageCheck, Truck, MapPin, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { useOrders } from "../../context/OrderContext.jsx";
import { Button } from "../../components/ui/index.js";
import ItemThumb from "../../components/product/ItemThumb.jsx";

const stageIcons = {
  Pending: Clock,
  Processing: PackageCheck,
  Shipped: Truck,
  "Out for Delivery": MapPin,
  Delivered: CheckCircle2,
};

const stageCopy = {
  Pending: "Order received and awaiting confirmation.",
  Processing: `${"Your items are being prepared by the brand."}`,
  Shipped: "Your package has left the warehouse.",
  "Out for Delivery": "Your package is on its way to you today.",
  Delivered: "Delivered — enjoy your order!",
};

export default function OrderTracking() {
  const { orderId } = useParams();
  const { getOrderById, advanceOrderStatus, STATUS_STAGES } = useOrders();
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-28 text-center">
        <h1 className="font-display text-3xl text-sapphire font-semibold mb-3">Order not found</h1>
        <Button as={Link} to="/orders" variant="primary">View Order History →</Button>
      </div>
    );
  }

  const stages = order.statusStages || STATUS_STAGES;
  const currentIndex = order.statusIndex ?? 0;
  const eta = new Date(new Date(order.placedAt).getTime() + 5 * 86400000);

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-12">
      <div className="flex items-center gap-2 text-xs text-ink/45 mb-6">
        <Link to="/orders" className="hover:text-amethyst">Order History</Link>
        <ChevronRight size={12} />
        <span className="text-sapphire font-medium">{order.orderId}</span>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
        <div>
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-amethyst">Tracking</span>
          <h1 className="font-display text-4xl text-sapphire font-semibold mt-2">{order.orderId}</h1>
          <p className="text-ink/55 text-sm mt-2">
            {order.brandName} · Estimated delivery {eta.toLocaleDateString(undefined, { month: "long", day: "numeric" })}
          </p>
        </div>
        <Button as={Link} to={`/orders/${order.orderId}/receipt`} variant="ghost">View Receipt</Button>
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10">
        <div className="bg-white border border-sapphire/10 p-8">
          {stages.map((stage, i) => {
            const Icon = stageIcons[stage];
            const done = i <= currentIndex;
            const isCurrent = i === currentIndex;
            const historyEntry = order.statusHistory.find((h) => h.stage === stage);
            return (
              <div key={stage} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      done ? (isCurrent ? "bg-amethyst text-white" : "bg-emerald text-white") : "bg-ivory-2 text-ink/30"
                    }`}
                  >
                    <Icon size={17} />
                  </div>
                  {i < stages.length - 1 && (
                    <div className={`w-0.5 flex-1 min-h-[52px] ${i < currentIndex ? "bg-emerald" : "bg-sapphire/10"}`} />
                  )}
                </div>
                <div className="pb-10">
                  <div className={`font-semibold text-[15px] ${done ? "text-sapphire" : "text-ink/35"}`}>{stage}</div>
                  <p className={`text-xs mt-1 max-w-sm ${done ? "text-ink/55" : "text-ink/30"}`}>{stageCopy[stage]}</p>
                  {historyEntry && (
                    <p className="text-[11px] text-ink/40 mt-1.5 font-mono">
                      {new Date(historyEntry.at).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  )}
                </div>
              </div>
            );
          })}

          {currentIndex < stages.length - 1 && (
            <div className="border-t border-sapphire/10 pt-6 flex items-start gap-3">
              <Sparkles size={16} className="text-gold flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-ink/50 mb-3">
                  Demo feature — simulate the next tracking update to preview the full delivery timeline.
                </p>
                <Button variant="ghost" size="sm" onClick={() => advanceOrderStatus(order.orderId)}>
                  Simulate Next Update →
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-ivory-2 border border-sapphire/10 p-6">
            <h3 className="font-display text-lg font-semibold text-sapphire mb-4">Shipping To</h3>
            <p className="text-sm text-ink/65 leading-relaxed">
              {order.contact.fullName}<br />
              {order.address.houseNo}, {order.address.street}
              {order.address.landmark && `, near ${order.address.landmark}`}<br />
              {order.location.city}, {order.location.country}
            </p>
          </div>

          <div className="bg-white border border-sapphire/10 p-6">
            <h3 className="font-display text-lg font-semibold text-sapphire mb-4">Items</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={`${item.productId}-${item.variant}`} className="flex items-center gap-3">
                  <div className="w-11 h-11 flex-shrink-0">
                    <ItemThumb item={item} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-medium text-sapphire truncate">{item.name}</div>
                    <div className="text-[11px] text-ink/45">Qty {item.qty}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
