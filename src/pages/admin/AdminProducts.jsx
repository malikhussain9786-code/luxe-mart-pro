import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { products } from "../../data/products.js";
import AdminLayout from "../../components/admin/AdminLayout.jsx";
import { Badge } from "../../components/ui/index.js";
import Pagination from "../../components/product/Pagination.jsx";
import ProductImage from "../../components/product/ProductImage.jsx";

const PAGE_SIZE = 10;

export default function AdminProducts() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.name.toLowerCase().includes(q) || p.brandName.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <AdminLayout title="Products" subtitle={`${products.length} products across the catalog`}>
      <div className="bg-white border border-sapphire/10">
        <div className="p-5 border-b border-sapphire/10 flex items-center gap-3">
          <Search size={16} className="text-ink/40" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="Search by name, brand, or SKU..."
            className="text-sm outline-none flex-1"
          />
        </div>
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wide text-ink/45 border-b border-sapphire/10">
              <th className="py-3 px-5 font-semibold">Product</th>
              <th className="py-3 px-5 font-semibold">Brand</th>
              <th className="py-3 px-5 font-semibold">Category</th>
              <th className="py-3 px-5 font-semibold">Price</th>
              <th className="py-3 px-5 font-semibold">Stock</th>
              <th className="py-3 px-5 font-semibold">Rating</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((p) => (
              <tr key={p.id} className="border-b border-sapphire/5 last:border-none hover:bg-ivory-2/50">
                <td className="py-3 px-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex-shrink-0">
                      <ProductImage product={p} />
                    </div>
                    <div>
                      <div className="font-medium text-sapphire text-[13.5px]">{p.name}</div>
                      <div className="text-[10.5px] text-ink/40 font-mono">{p.sku}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-5 text-ink/65">{p.brandName}</td>
                <td className="py-3 px-5 text-ink/65">{p.subcategoryName}</td>
                <td className="py-3 px-5 font-mono text-sapphire">${p.price}</td>
                <td className="py-3 px-5">
                  <Badge tone={p.stockStatus === "In Stock" ? "emerald" : p.stockStatus === "Low Stock" ? "ruby" : "outline"}>
                    {p.stock}
                  </Badge>
                </td>
                <td className="py-3 px-5 text-ink/65">{p.rating.toFixed(1)} ★</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        {pageItems.length === 0 && <p className="text-center text-sm text-ink/50 py-10">No products match "{query}".</p>}
      </div>
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </AdminLayout>
  );
}
