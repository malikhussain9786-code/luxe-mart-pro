import { Link } from "react-router-dom";
import { Package, ChevronRight, Receipt } from "lucide-react";
import { useOrders } from "../../context/OrderContext.jsx";
import { Button, Badge } from "../../components/ui/index.js";
import ItemThumb from "../../components/product/ItemThumb.jsx";

const statusTone = {
  Pending: "outline",
  Processing: "gold",
  Shipped: "sapphire",
  "Out for Delivery": "sapphire",
  Delivered: "emerald",
};

export default function OrderHistory() {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-28 text-center">
        <div className="w-16 h-16 rounded-full bg-ivory-2 flex items-center justify-center mx-auto mb-6">
          <Package size={26} className="text-sapphire/40" />
        </div>
        <h1 className="font-display text-3xl text-sapphire font-semibold mb-3">No orders yet</h1>
        <p className="text-ink/55 text-sm mb-8">Your placed orders will appear here.</p>
        <Button as={Link} to="/" variant="primary">Start Shopping →</Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-12">
      <h1 className="font-display text-4xl text-sapphire font-semibold mb-3">Order History</h1>
      <p className="text-ink/55 text-sm mb-10">{orders.length} order{orders.length !== 1 ? "s" : ""} placed</p>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.orderId} className="bg-white border border-sapphire/10 p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-5 border-b border-sapphire/10">
              <div>
                <div className="font-mono text-sm font-semibold text-sapphire">{order.orderId}</div>
                <div className="text-xs text-ink/45 mt-1">
                  {new Date(order.placedAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })} · {order.brandName}
                </div>
              </div>
              <Badge tone={statusTone[order.status] || "outline"}>{order.status}</Badge>
            </div>

            <div className="flex items-center gap-3 mb-5 overflow-x-auto">
              {order.items.map((item) => (
                <div key={`${item.productId}-${item.variant}`} className="w-14 h-14 flex-shrink-0">
                  <ItemThumb item={item} />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm text-ink/55">
                {order.items.reduce((n, i) => n + i.qty, 0)} items · <span className="font-mono font-semibold text-sapphire">${order.total.toFixed(2)}</span>
              </div>
              <div className="flex gap-2.5">
                <Button as={Link} to={`/orders/${order.orderId}/track`} variant="ghost" size="sm">
                  Track <ChevronRight size={13} />
                </Button>
                <Button as={Link} to={`/orders/${order.orderId}/receipt`} variant="ghost" size="sm">
                  <Receipt size={13} /> Receipt
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
