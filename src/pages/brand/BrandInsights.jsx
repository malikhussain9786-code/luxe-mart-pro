import { useParams, Link } from "react-router-dom";
import { ChevronRight, TrendingUp, Package, Star, DollarSign, BarChart3 } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { getBrandBySlug } from "../../data/brands.js";
import { getProductsByBrand } from "../../data/products.js";
import { categories } from "../../data/categories.js";
import StatCard from "../../components/admin/StatCard.jsx";

const palette = ["#6E3AA8", "#C6A15B", "#1F7A5C", "#A8203D", "#9A6BD1", "#14213D"];

function seeded(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function BrandInsights() {
  const { brandSlug } = useParams();
  const brand = getBrandBySlug(brandSlug);
  const products = brand ? getProductsByBrand(brand.id) : [];

  if (!brand) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-28 text-center">
        <h1 className="font-display text-3xl text-sapphire font-semibold mb-3">Brand not found</h1>
        <Link to="/brands" className="text-amethyst font-semibold">← Back to brands</Link>
      </div>
    );
  }

  const brandSeed = brand.id.split("").reduce((s, c) => s + c.charCodeAt(0), 0);

  // 12 months of deterministic demo revenue, seeded per brand so it's
  // consistent across visits but different for every brand.
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const baseRevenue = 18000 + seeded(brandSeed) * 22000;
  let monthlyRevenue = monthNames.map((m, i) => {
    const trend = 1 + i * 0.045; // gentle year-long growth
    const noise = 0.75 + seeded(brandSeed + i * 3) * 0.5;
    return { month: m, revenue: Math.round(baseRevenue * trend * noise) };
  });

  const totalRevenue = monthlyRevenue.reduce((s, m) => s + m.revenue, 0);
  const totalOrders = Math.round(totalRevenue / (55 + seeded(brandSeed + 99) * 90));
  const avgRating = products.length
    ? (products.reduce((s, p) => s + p.rating, 0) / products.length).toFixed(1)
    : "—";
  const growthPct = Math.round(((monthlyRevenue[11].revenue - monthlyRevenue[0].revenue) / monthlyRevenue[0].revenue) * 100);

  const categoryBreakdown = categories
    .filter((c) => brand.categoryIds.includes(c.id))
    .map((c, i) => ({
      name: c.name.replace("'s", "").split(" ")[0],
      value: products.filter((p) => p.categoryId === c.id).length,
      fill: palette[i % palette.length],
    }));

  const topProducts = [...products]
    .sort((a, b) => b.reviewCount * b.rating - a.reviewCount * a.rating)
    .slice(0, 5)
    .map((p, i) => ({
      name: p.name.length > 22 ? p.name.slice(0, 22) + "…" : p.name,
      units: Math.round(40 + seeded(brandSeed + i * 7) * 260),
    }));

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
      <div className="flex items-center gap-2 text-xs text-ink/45 mb-6 flex-wrap">
        <Link to="/" className="hover:text-amethyst">Home</Link>
        <ChevronRight size={12} />
        <Link to="/brands" className="hover:text-amethyst">Brands</Link>
        <ChevronRight size={12} />
        <Link to={`/brand/${brand.slug}`} className="hover:text-amethyst">{brand.name}</Link>
        <ChevronRight size={12} />
        <span className="text-sapphire font-medium">Insights</span>
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap mb-2">
        <div>
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-amethyst font-medium">Demo Brand Dashboard</span>
          <h1 className="font-display text-3xl md:text-4xl text-sapphire font-semibold mt-1">{brand.name} — Performance</h1>
        </div>
        <Link to={`/brand/${brand.slug}`} className="text-sm font-bold text-amethyst hover:underline">← Back to Storefront</Link>
      </div>
      <p className="text-ink/55 text-sm mb-8 flex items-center gap-2">
        <BarChart3 size={14} /> Simulated 12-month performance data for this demo brand account — not real sales.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard icon={DollarSign} label="12-Month Revenue" value={`$${Math.round(totalRevenue / 1000)}K`} tone="gold" />
        <StatCard icon={Package} label="Orders Fulfilled" value={totalOrders.toLocaleString()} tone="amethyst" />
        <StatCard icon={Star} label="Avg. Product Rating" value={avgRating} tone="emerald" />
        <StatCard icon={TrendingUp} label="YoY Growth" value={`+${growthPct}%`} tone="ruby" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white border border-sapphire/10 p-7">
          <h3 className="font-semibold text-sapphire mb-1">Monthly Revenue — Last 12 Months</h3>
          <p className="text-xs text-ink/45 mb-5">Demo data, seeded uniquely per brand</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={monthlyRevenue}>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#14213D" />
              <YAxis tick={{ fontSize: 11 }} stroke="#14213D" tickFormatter={(v) => `$${Math.round(v / 1000)}K`} />
              <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]} />
              <Line type="monotone" dataKey="revenue" stroke="#6E3AA8" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-sapphire/10 p-7">
          <h3 className="font-semibold text-sapphire mb-1">Catalog by Category</h3>
          <p className="text-xs text-ink/45 mb-5">Product count per category this brand sells in</p>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={categoryBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={{ fontSize: 11 }}>
                {categoryBreakdown.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-sapphire/10 p-7">
        <h3 className="font-semibold text-sapphire mb-1">Top Products by Simulated Units Sold</h3>
        <p className="text-xs text-ink/45 mb-5">Ranked by demo rating × review volume</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={topProducts} layout="vertical" margin={{ left: 40 }}>
            <XAxis type="number" tick={{ fontSize: 11 }} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={160} />
            <Tooltip />
            <Bar dataKey="units" fill="#C6A15B" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
