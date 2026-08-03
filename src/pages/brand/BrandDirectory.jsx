import { Link } from "react-router-dom";
import { ChevronRight, BadgeCheck, MapPin, ShoppingBasket, BarChart3, ArrowRight } from "lucide-react";
import { brands } from "../../data/brands.js";
import { getProductsByBrand } from "../../data/products.js";
import { categories } from "../../data/categories.js";
import { Button } from "../../components/ui/index.js";

export default function BrandDirectory() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
      <div className="flex items-center gap-2 text-xs text-ink/45 mb-6">
        <Link to="/" className="hover:text-amethyst">Home</Link>
        <ChevronRight size={12} />
        <span className="text-sapphire font-medium">Brands</span>
      </div>

      <div className="mb-12">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-amethyst">Demo brand partners</span>
        <h1 className="font-display text-4xl text-sapphire font-semibold mt-2 mb-3">Our Brands</h1>
        <p className="text-ink/55 text-sm max-w-lg">
          Every brand below is a view-only demo storefront — browse their full range, but demo accounts
          can't be edited. Real orders route to Luxe Mart Pro's own checkout.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {brands.map((b) => {
          const productCount = getProductsByBrand(b.id).length;
          const brandCategories = categories.filter((c) => b.categoryIds.includes(c.id));
          return (
            <div key={b.id} className="group block bg-white border border-sapphire/10 overflow-hidden">
              <Link to={`/brand/${b.slug}`} className="h-44 overflow-hidden relative block">
                {b.bannerImage ? (
                  <img src={b.bannerImage} alt={b.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"  decoding="async" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #14213D 0%, #1E3054 60%, #3D3018 100%)" }}>
                    <ShoppingBasket size={40} strokeWidth={1.2} className="text-gold-light/80" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-sapphire/80 to-transparent" />
                <div className="absolute bottom-4 left-5 flex items-center gap-2">
                  <span className="font-display text-xl font-semibold text-white">{b.name}</span>
                  {b.verified && <BadgeCheck size={17} className="text-gold-light" />}
                </div>
              </Link>
              <div className="p-5">
                <p className="text-sm text-ink/60 mb-3">{b.tagline}</p>
                <div className="flex items-center gap-3 text-[11px] text-ink/45 mb-3">
                  <span className="flex items-center gap-1"><MapPin size={11} /> {b.country}</span>
                  <span>·</span>
                  <span>Since {b.founded}</span>
                  <span>·</span>
                  <span>{productCount} products</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {brandCategories.map((c) => (
                    <span key={c.id} className="text-[10px] font-semibold uppercase tracking-wide bg-ivory-2 text-sapphire/70 px-2 py-1">
                      {c.name}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2.5">
                  <Link to={`/brand/${b.slug}`} className="flex-1">
                    <Button variant="primary" size="sm" className="w-full justify-center">
                      Shop Now <ArrowRight size={13} />
                    </Button>
                  </Link>
                  <Link to={`/brand/${b.slug}/insights`} className="flex-1">
                    <Button variant="ghost" size="sm" className="w-full justify-center">
                      <BarChart3 size={13} /> Brand Data
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
