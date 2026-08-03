import { Link } from "react-router-dom";
import { Dumbbell, ShoppingBasket } from "lucide-react";
import { categories } from "../../data/categories.js";

const categoryIcons = { sports: Dumbbell, "grocery-food": ShoppingBasket };

export default function MegaMenu({ activeCategoryId, onClose }) {
  const cat = categories.find((c) => c.id === activeCategoryId);
  if (!cat) return null;
  const Icon = categoryIcons[cat.id];

  return (
    <div
      className="absolute left-0 right-0 top-full bg-white border-t border-sapphire/10 shadow-lux z-40"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 grid grid-cols-[1.1fr_1.5fr] gap-10">
        <Link
          to={`/category/${cat.slug}`}
          className="relative h-52 overflow-hidden block group"
          onClick={onClose}
        >
          {cat.bannerImage ? (
            <img src={cat.bannerImage} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"  decoding="async" />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #14213D 0%, #1E3054 60%, #3D3018 100%)" }}>
              <Icon size={44} strokeWidth={1.2} className="text-gold-light/80" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-sapphire/85 to-transparent flex items-end p-5">
            <div>
              <div className="text-white font-display text-lg font-semibold">{cat.name}</div>
              <div className="text-white/70 text-xs mt-1">Shop the full range →</div>
            </div>
          </div>
        </Link>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          {cat.subcategories.map((sub) => (
            <Link
              key={sub.id}
              to={`/category/${cat.slug}?sub=${sub.id}`}
              onClick={onClose}
              className="text-sm font-medium text-ink/70 hover:text-amethyst transition py-1.5 border-b border-sapphire/5"
            >
              {sub.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
