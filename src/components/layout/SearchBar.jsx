import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search } from "lucide-react";
import { products } from "../../data/products.js";
import { brands } from "../../data/brands.js";

export default function SearchBar({ mobile = false }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const q = query.trim().toLowerCase();
  const matchedProducts = q
    ? products.filter((p) => p.name.toLowerCase().includes(q) || p.brandName.toLowerCase().includes(q)).slice(0, 5)
    : [];
  const matchedBrands = q ? brands.filter((b) => b.name.toLowerCase().includes(q)).slice(0, 3) : [];

  function submit(e) {
    e.preventDefault();
    if (!q) return;
    setOpen(false);
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <div ref={ref} className={`relative ${mobile ? "w-full" : "w-[190px] xl:w-[280px] flex-shrink-0"}`}>
      <form
        onSubmit={submit}
        className="flex items-center gap-2.5 border border-sapphire/15 rounded-full px-4 py-2.5 bg-white"
      >
        <Search size={16} className="text-ink/40 flex-shrink-0" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => query && setOpen(true)}
          placeholder="Search products, brands..."
          className="w-full text-[13.5px] outline-none bg-transparent"
        />
      </form>

      {open && q && (matchedProducts.length > 0 || matchedBrands.length > 0) && (
        <div className="absolute top-full left-0 w-[340px] max-w-[90vw] mt-2 bg-white border border-sapphire/10 shadow-lux z-[200] max-h-96 overflow-y-auto rounded-sm">
          {matchedBrands.length > 0 && (
            <div className="p-3 border-b border-sapphire/5">
              <div className="text-[10px] uppercase tracking-wide text-ink/40 font-bold px-2 mb-1.5">Brands</div>
              {matchedBrands.map((b) => (
                <Link
                  key={b.id}
                  to={`/brand/${b.slug}`}
                  onClick={() => setOpen(false)}
                  className="block px-2 py-2 text-[13.5px] font-semibold text-sapphire hover:bg-ivory-2"
                >
                  {b.name}
                </Link>
              ))}
            </div>
          )}
          {matchedProducts.length > 0 && (
            <div className="p-3">
              <div className="text-[10px] uppercase tracking-wide text-ink/40 font-bold px-2 mb-1.5">Products</div>
              {matchedProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-2 py-2 hover:bg-ivory-2"
                >
                  <img src={p.image} alt={p.name} className="w-10 h-10 object-cover flex-shrink-0"  decoding="async" />
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium text-sapphire truncate">{p.name}</div>
                    <div className="text-[11px] text-ink/45">{p.brandName} · ${p.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <button
            onClick={submit}
            className="w-full text-center text-[12.5px] font-bold text-amethyst py-3 border-t border-sapphire/10"
          >
            See all results for "{query}" →
          </button>
        </div>
      )}
    </div>
  );
}
