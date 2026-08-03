import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { categories } from "../../data/categories.js";
import { getProductsByCategory } from "../../data/products.js";

const barColors = ["#6E3AA8", "#C6A15B", "#1F7A5C", "#A8203D", "#9A6BD1", "#3D5A8A"];

const regions = [
  { name: "United Arab Emirates", pct: 18 },
  { name: "United States", pct: 15 },
  { name: "United Kingdom", pct: 11 },
  { name: "Saudi Arabia", pct: 10 },
  { name: "Singapore", pct: 8 },
];

export default function StatsSection() {
  const chartData = categories.map((c) => ({
    name: c.name.replace("'s", "").split(" ")[0],
    orders: getProductsByCategory(c.id).length * 12 + Math.floor(Math.random() * 40),
  }));

  const totalProducts = categories.reduce((sum, c) => sum + getProductsByCategory(c.id).length, 0);

  return (
    <section className="bg-sapphire text-ivory py-14 relative overflow-hidden">
      <div className="absolute -bottom-40 -left-24 w-[420px] h-[420px] rounded-full bg-amethyst/25 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ivory/10 mb-16">
          {[
            { n: `${totalProducts}+`, l: "Premium Products" },
            { n: "195", l: "Countries Served" },
            { n: "8", l: "Demo Brand Partners" },
            { n: "99.2%", l: "On-Time Delivery" },
          ].map((s) => (
            <div key={s.l} className="bg-sapphire p-8">
              <div className="font-display text-3xl md:text-4xl font-bold text-gold-light">{s.n}</div>
              <div className="text-xs text-ivory/60 mt-1.5">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-gold-light">Live insights</span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mt-2">This week at Luxe Mart Pro</h2>
        </div>

        <div className="grid md:grid-cols-[1.3fr_1fr] gap-8">
          <div className="bg-ivory/5 border border-ivory/15 p-7">
            <h3 className="font-semibold mb-1">Top Performing Categories</h3>
            <p className="text-xs text-ivory/55 mb-6">Order volume by category, last 7 days</p>
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" tick={{ fill: "rgba(250,247,241,0.65)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: "#14213D", border: "1px solid rgba(250,247,241,0.2)", fontSize: 12 }}
                  labelStyle={{ color: "#fff" }}
                  cursor={{ fill: "rgba(250,247,241,0.05)" }}
                />
                <Bar dataKey="orders" radius={[6, 6, 0, 0]}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={barColors[i % barColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-ivory/5 border border-ivory/15 p-7">
            <h3 className="font-semibold mb-1">Top Shopping Regions</h3>
            <p className="text-xs text-ivory/55 mb-6">Share of orders by country · 195 countries live</p>
            <div className="flex flex-col gap-4">
              {regions.map((r) => (
                <div key={r.name} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-amethyst-light to-gold-light flex-shrink-0" />
                  <span className="text-[13px] flex-1">{r.name}</span>
                  <div className="flex-[1.4] h-1.5 bg-ivory/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-gold to-amethyst-light rounded-full" style={{ width: `${r.pct * 4.5}%` }} />
                  </div>
                  <span className="font-mono text-[11px] text-ivory/55 w-8 text-right">{r.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
