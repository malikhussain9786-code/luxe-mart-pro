import { Link } from "react-router-dom";
import { Package, ShoppingCart, DollarSign, Users, ChevronRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { products } from "../../data/products.js";
import { categories } from "../../data/categories.js";
import { getProductsByCategory } from "../../data/products.js";
import { useOrders } from "../../context/OrderContext.jsx";
import AdminLayout from "../../components/admin/AdminLayout.jsx";
import StatCard from "../../components/admin/StatCard.jsx";
import { Badge } from "../../components/ui/index.js";

const barColors = ["#6E3AA8", "#C6A15B", "#1F7A5C", "#A8203D", "#9A6BD1", "#3D5A8A"];
const statusTone = { Pending: "outline", Processing: "gold", Shipped: "sapphire", "Out for Delivery": "sapphire", Delivered: "emerald" };

export default function AdminDashboard() {
  const { orders } = useOrders();
  const revenue = orders.reduce((sum, o) => sum + o.total, 0);
  const uniqueCustomers = new Set(orders.map((o) => o.contact.email)).size;

  const chartData = categories.map((c) => ({
    name: c.name.replace("'s", "").split(" ")[0],
    products: getProductsByCategory(c.id).length,
  }));

  return (
    <AdminLayout title="Dashboard" subtitle="Overview of your Luxe Mart Pro storefront">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <StatCard icon={Package} label="Total Products" value={products.length} tone="amethyst" />
        <StatCard icon={ShoppingCart} label="Total Orders" value={orders.length} tone="gold" />
        <StatCard icon={DollarSign} label="Total Revenue" value={`$${revenue.toFixed(2)}`} tone="emerald" />
        <StatCard icon={Users} label="Customers" value={uniqueCustomers} tone="ruby" />
      </div>

      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6 mb-10">
        <div className="bg-white border border-sapphire/10 p-7">
          <h3 className="font-semibold text-sapphire mb-1">Products by Category</h3>
          <p className="text-xs text-ink/45 mb-6">Live catalog distribution</p>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#8b8b95" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ fontSize: 12, border: "1px solid #eee" }} cursor={{ fill: "rgba(20,33,61,0.03)" }} />
              <Bar dataKey="products" radius={[6, 6, 0, 0]}>
                {chartData.map((_, i) => <Cell key={i} fill={barColors[i % barColors.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-sapphire/10 p-7">
          <h3 className="font-semibold text-sapphire mb-1">Brand Roster</h3>
          <p className="text-xs text-ink/45 mb-6">8 verified demo brands active</p>
          <div className="space-y-3">
            {[...new Set(products.map((p) => p.brandName))].slice(0, 6).map((name) => (
              <div key={name} className="flex items-center justify-between text-sm">
                <span className="text-ink/70">{name}</span>
                <span className="font-mono text-xs text-ink/40">{products.filter((p) => p.brandName === name).length} items</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-sapphire/10 p-7">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-sapphire">Recent Orders</h3>
          <Link to="/admin/orders" className="text-xs font-bold text-amethyst flex items-center gap-1">
            View all <ChevronRight size={13} />
          </Link>
        </div>
        {orders.length === 0 ? (
          <p className="text-sm text-ink/50">No orders placed yet in this session.</p>
        ) : (
          <div className="space-y-3">
            {orders.slice(0, 5).map((o) => (
              <div key={o.orderId} className="flex items-center justify-between py-2 border-b border-sapphire/5 last:border-none">
                <div>
                  <div className="font-mono text-xs font-semibold text-sapphire">{o.orderId}</div>
                  <div className="text-[11px] text-ink/45 mt-0.5">{o.contact.fullName} · {o.brandName}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm text-sapphire">${o.total.toFixed(2)}</span>
                  <Badge tone={statusTone[o.status] || "outline"}>{o.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
