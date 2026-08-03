import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { brands } from "../../data/brands.js";

export default function BrandSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 hover:text-amethyst transition"
      >
        Brands <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-4 w-72 bg-white border border-sapphire/10 shadow-lux py-2 z-40">
          {brands.map((b) => (
            <Link
              key={b.id}
              to={`/brand/${b.slug}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-5 py-3 hover:bg-ivory-2 transition"
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: b.accent }} />
              <div>
                <div className="text-[13.5px] font-semibold text-sapphire">{b.name}</div>
                <div className="text-[11px] text-ink/45">{b.country} · Since {b.founded}</div>
              </div>
            </Link>
          ))}
          <Link
            to="/brands"
            onClick={() => setOpen(false)}
            className="block text-center text-[12.5px] font-bold text-amethyst py-3 border-t border-sapphire/10 mt-1"
          >
            View all brands →
          </Link>
        </div>
      )}
    </div>
  );
}
