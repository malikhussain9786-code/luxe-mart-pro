import { useState, Fragment } from "react";
import { useOrders } from "../../context/OrderContext.jsx";
import AdminLayout from "../../components/admin/AdminLayout.jsx";
import { Badge } from "../../components/ui/index.js";
import { ChevronDown, ChevronUp } from "lucide-react";

const statusTone = { Pending: "outline", Processing: "gold", Shipped: "sapphire", "Out for Delivery": "sapphire", Delivered: "emerald" };

export default function AdminOrders() {
  const { orders, advanceOrderStatus } = useOrders();
  const [expanded, setExpanded] = useState(null);

  return (
    <AdminLayout title="Orders" subtitle={`${orders.length} orders placed this session`}>
      {orders.length === 0 ? (
        <div className="bg-white border border-sapphire/10 p-16 text-center">
          <p className="text-sm text-ink/50">No orders yet. Orders placed through checkout will appear here in real time.</p>
        </div>
      ) : (
        <div className="bg-white border border-sapphire/10">
          <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-ink/45 border-b border-sapphire/10">
                <th className="py-3 px-5 font-semibold">Order ID</th>
                <th className="py-3 px-5 font-semibold">Customer</th>
                <th className="py-3 px-5 font-semibold">Brand</th>
                <th className="py-3 px-5 font-semibold">Total</th>
                <th className="py-3 px-5 font-semibold">Status</th>
                <th className="py-3 px-5 font-semibold w-10"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <Fragment key={o.orderId}>
                  <tr
                    onClick={() => setExpanded(expanded === o.orderId ? null : o.orderId)}
                    className="border-b border-sapphire/5 cursor-pointer hover:bg-ivory-2/50"
                  >
                    <td className="py-3 px-5 font-mono text-xs text-sapphire font-semibold">{o.orderId}</td>
                    <td className="py-3 px-5 text-ink/65">{o.contact.fullName}</td>
                    <td className="py-3 px-5 text-ink/65">{o.brandName}</td>
                    <td className="py-3 px-5 font-mono text-sapphire">${o.total.toFixed(2)}</td>
                    <td className="py-3 px-5"><Badge tone={statusTone[o.status] || "outline"}>{o.status}</Badge></td>
                    <td className="py-3 px-5 text-ink/40">{expanded === o.orderId ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</td>
                  </tr>
                  {expanded === o.orderId && (
                    <tr className="bg-ivory-2/40">
                      <td colSpan={6} className="px-5 py-5">
                        <div className="flex flex-wrap justify-between gap-6">
                          <div>
                            <div className="text-[11px] font-bold uppercase tracking-wide text-sapphire/50 mb-1.5">Ship To</div>
                            <p className="text-xs text-ink/60 leading-relaxed">
                              {o.address.houseNo}, {o.address.street}<br />{o.location.city}, {o.location.country}
                            </p>
                          </div>
                          <div>
                            <div className="text-[11px] font-bold uppercase tracking-wide text-sapphire/50 mb-1.5">Items</div>
                            <p className="text-xs text-ink/60">{o.items.reduce((n, i) => n + i.qty, 0)} items · {o.items.length} products</p>
                          </div>
                          {o.statusIndex < o.statusStages.length - 1 && (
                            <button
                              onClick={(e) => { e.stopPropagation(); advanceOrderStatus(o.orderId); }}
                              className="text-xs font-bold text-amethyst self-start"
                            >
                              Advance Status →
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      )}
    </AdminLayout>
  );
}
