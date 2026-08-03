import { useState, useMemo } from "react";
import { AlertTriangle, PackageX, PackageCheck } from "lucide-react";
import { products } from "../../data/products.js";
import AdminLayout from "../../components/admin/AdminLayout.jsx";
import StatCard from "../../components/admin/StatCard.jsx";
import { Badge } from "../../components/ui/index.js";
import ProductImage from "../../components/product/ProductImage.jsx";

const filters = ["All", "In Stock", "Low Stock", "Out of Stock"];

export default function AdminInventory() {
  const [filter, setFilter] = useState("All");

  const inStock = products.filter((p) => p.stockStatus === "In Stock").length;
  const lowStock = products.filter((p) => p.stockStatus === "Low Stock").length;
  const outOfStock = products.filter((p) => p.stockStatus === "Out of Stock").length;

  const filtered = useMemo(() => {
    if (filter === "All") return products;
    return products.filter((p) => p.stockStatus === filter);
  }, [filter]);

  const sorted = [...filtered].sort((a, b) => a.stock - b.stock).slice(0, 40);

  return (
    <AdminLayout title="Inventory" subtitle="Stock levels across the full catalog">
      <div className="grid sm:grid-cols-3 gap-5 mb-8">
        <StatCard icon={PackageCheck} label="In Stock" value={inStock} tone="emerald" />
        <StatCard icon={AlertTriangle} label="Low Stock" value={lowStock} tone="gold" />
        <StatCard icon={PackageX} label="Out of Stock" value={outOfStock} tone="ruby" />
      </div>

      <div className="flex gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs font-semibold px-4 py-2 border ${
              filter === f ? "bg-sapphire text-ivory border-sapphire" : "border-sapphire/15 text-ink/60"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white border border-sapphire/10">
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wide text-ink/45 border-b border-sapphire/10">
              <th className="py-3 px-5 font-semibold">Product</th>
              <th className="py-3 px-5 font-semibold">SKU</th>
              <th className="py-3 px-5 font-semibold">Stock Level</th>
              <th className="py-3 px-5 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p) => (
              <tr key={p.id} className="border-b border-sapphire/5 last:border-none">
                <td className="py-3 px-5 flex items-center gap-3">
                  <div className="w-9 h-9 flex-shrink-0">
                    <ProductImage product={p} />
                  </div>
                  <span className="font-medium text-sapphire text-[13.5px]">{p.name}</span>
                </td>
                <td className="py-3 px-5 font-mono text-[11px] text-ink/50">{p.sku}</td>
                <td className="py-3 px-5">
                  <div className="flex items-center gap-2 w-32">
                    <div className="flex-1 h-1.5 bg-ivory-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${p.stock === 0 ? "bg-ruby" : p.stock < 15 ? "bg-gold" : "bg-emerald"}`}
                        style={{ width: `${Math.min(100, (p.stock / 140) * 100)}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs text-ink/50">{p.stock}</span>
                  </div>
                </td>
                <td className="py-3 px-5">
                  <Badge tone={p.stockStatus === "In Stock" ? "emerald" : p.stockStatus === "Low Stock" ? "ruby" : "outline"}>
                    {p.stockStatus}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      <p className="text-xs text-ink/40 mt-4">Showing {sorted.length} of {filtered.length} matching products, sorted by lowest stock.</p>
    </AdminLayout>
  );
}
