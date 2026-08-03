import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { products } from "../../data/products.js";
import { categories } from "../../data/categories.js";
import { getProductsByCategory } from "../../data/products.js";
import { useOrders } from "../../context/OrderContext.jsx";
import AdminLayout from "../../components/admin/AdminLayout.jsx";

const colors = ["#6E3AA8", "#C6A15B", "#1F7A5C", "#A8203D", "#9A6BD1", "#14213D"];

export default function AdminAnalytics() {
  const { orders } = useOrders();

  // Build a 7-day revenue trend: real order totals bucketed by day,
  // padded with the preceding days at zero for a readable trend line.
  const today = new Date();
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    return d;
  });
  const revenueByDay = days.map((d) => {
    const dayTotal = orders
      .filter((o) => new Date(o.placedAt).toDateString() === d.toDateString())
      .reduce((sum, o) => sum + o.total, 0);
    return { day: d.toLocaleDateString(undefined, { weekday: "short" }), revenue: Math.round(dayTotal * 100) / 100 };
  });

  const categoryData = categories.map((c, i) => ({
    name: c.name.replace("'s", "").split(" ")[0],
    value: getProductsByCategory(c.id).length,
    fill: colors[i % colors.length],
  }));

  const topProducts = [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 6);

  return (
    <AdminLayout title="Analytics" subtitle="Store performance and catalog insights">
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white border border-sapphire/10 p-7">
          <h3 className="font-semibold text-sapphire mb-1">Revenue — Last 7 Days</h3>
          <p className="text-xs text-ink/45 mb-6">Real revenue from orders placed this session</p>
          <ResponsiveContainer width="100%" height={230}>
            <LineChart data={revenueByDay}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#8b8b95" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ fontSize: 12, border: "1px solid #eee" }} formatter={(v) => [`$${v}`, "Revenue"]} />
              <Line type="monotone" dataKey="revenue" stroke="#6E3AA8" strokeWidth={2.5} dot={{ fill: "#6E3AA8", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-sapphire/10 p-7">
          <h3 className="font-semibold text-sapphire mb-1">Catalog Split by Category</h3>
          <p className="text-xs text-ink/45 mb-6">Product count distribution</p>
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                {categoryData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, border: "1px solid #eee" }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-sapphire/10 p-7">
        <h3 className="font-semibold text-sapphire mb-1">Most Reviewed Products</h3>
        <p className="text-xs text-ink/45 mb-6">Top 6 by customer engagement</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={topProducts} layout="vertical" margin={{ left: 40 }}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={180}
              tick={{ fontSize: 11, fill: "#3a3a45" }}
              tickFormatter={(v) => (v.length > 24 ? v.slice(0, 24) + "…" : v)}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip contentStyle={{ fontSize: 12, border: "1px solid #eee" }} />
            <Bar dataKey="reviewCount" fill="#C6A15B" radius={[0, 6, 6, 0]} barSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AdminLayout>
  );
}
