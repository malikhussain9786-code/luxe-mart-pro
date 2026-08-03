import { useMemo } from "react";
import { Users } from "lucide-react";
import { useOrders } from "../../context/OrderContext.jsx";
import AdminLayout from "../../components/admin/AdminLayout.jsx";

export default function AdminCustomers() {
  const { orders } = useOrders();

  const customers = useMemo(() => {
    const map = new Map();
    orders.forEach((o) => {
      const key = o.contact.email || o.contact.fullName;
      if (!map.has(key)) {
        map.set(key, {
          name: o.contact.fullName,
          email: o.contact.email,
          phone: o.contact.phone,
          country: o.location.country,
          orderCount: 0,
          totalSpent: 0,
        });
      }
      const c = map.get(key);
      c.orderCount += 1;
      c.totalSpent += o.total;
    });
    return [...map.values()].sort((a, b) => b.totalSpent - a.totalSpent);
  }, [orders]);

  return (
    <AdminLayout title="Customers" subtitle="Derived from real checkout activity this session">
      {customers.length === 0 ? (
        <div className="bg-white border border-sapphire/10 p-16 text-center">
          <Users size={28} className="text-sapphire/25 mx-auto mb-4" />
          <p className="text-sm text-ink/50">No customers yet — customer records are created automatically when an order is placed.</p>
        </div>
      ) : (
        <div className="bg-white border border-sapphire/10">
          <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-ink/45 border-b border-sapphire/10">
                <th className="py-3 px-5 font-semibold">Customer</th>
                <th className="py-3 px-5 font-semibold">Contact</th>
                <th className="py-3 px-5 font-semibold">Country</th>
                <th className="py-3 px-5 font-semibold">Orders</th>
                <th className="py-3 px-5 font-semibold">Total Spent</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.email} className="border-b border-sapphire/5 last:border-none">
                  <td className="py-3 px-5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amethyst to-sapphire text-white text-xs font-bold flex items-center justify-center inline-flex mr-3">
                      {c.name?.[0]?.toUpperCase() || "?"}
                    </div>
                    <span className="font-medium text-sapphire">{c.name}</span>
                  </td>
                  <td className="py-3 px-5 text-ink/60 text-[13px]">{c.email}<br /><span className="text-[11px] text-ink/40">{c.phone}</span></td>
                  <td className="py-3 px-5 text-ink/60">{c.country}</td>
                  <td className="py-3 px-5 font-mono">{c.orderCount}</td>
                  <td className="py-3 px-5 font-mono text-sapphire font-semibold">${c.totalSpent.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      )}
    </AdminLayout>
  );
}
