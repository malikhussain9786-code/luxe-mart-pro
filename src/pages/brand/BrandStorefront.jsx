import { useParams, Link } from "react-router-dom";
import { ChevronRight, BadgeCheck, MapPin, Calendar, Eye, SlidersHorizontal, ShoppingBasket, BarChart3 } from "lucide-react";
import { getBrandBySlug } from "../../data/brands.js";
import { getProductsByBrand } from "../../data/products.js";
import { categories } from "../../data/categories.js";
import { useProductFilters } from "../../hooks/useProductFilters.js";
import FilterSidebar from "../../components/product/FilterSidebar.jsx";
import Pagination from "../../components/product/Pagination.jsx";
import ProductCard from "../../components/product/ProductCard.jsx";

export default function BrandStorefront() {
  const { brandSlug } = useParams();
  const brand = getBrandBySlug(brandSlug);
  const baseProducts = brand ? getProductsByBrand(brand.id) : [];
  const f = useProductFilters(baseProducts);

  if (!brand) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-28 text-center">
        <h1 className="font-display text-3xl text-sapphire font-semibold mb-3">Brand not found</h1>
        <Link to="/brands" className="text-amethyst font-semibold">← Back to brands</Link>
      </div>
    );
  }

  const brandCategories = categories.filter((c) => brand.categoryIds.includes(c.id));
  const avgRating = baseProducts.length
    ? (baseProducts.reduce((sum, p) => sum + p.rating, 0) / baseProducts.length).toFixed(1)
    : "—";

  return (
    <div>
      <div className="relative h-72 md:h-96 overflow-hidden">
        {brand.bannerImage ? (
          <img src={brand.bannerImage} alt={brand.name} className="w-full h-full object-cover"  decoding="async" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #14213D 0%, #1E3054 60%, #3D3018 100%)" }}>
            <ShoppingBasket size={64} strokeWidth={1.2} className="text-gold-light/80" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-sapphire/90 via-sapphire/40 to-sapphire/10" />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-7xl mx-auto px-6 md:px-10 pb-10 w-full">
            <div className="flex items-center gap-2 text-xs text-white/60 mb-4">
              <Link to="/" className="hover:text-white">Home</Link>
              <ChevronRight size={12} />
              <Link to="/brands" className="hover:text-white">Brands</Link>
              <ChevronRight size={12} />
              <span className="text-white">{brand.name}</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-white">{brand.name}</h1>
              {brand.verified && (
                <span className="flex items-center gap-1.5 bg-gold-light/15 text-gold-light text-[11px] font-bold uppercase tracking-wide px-3 py-1.5 border border-gold-light/30">
                  <BadgeCheck size={13} /> Verified Demo Brand
                </span>
              )}
            </div>
            <p className="text-white/75 max-w-lg mb-5">{brand.tagline}</p>
            <div className="flex flex-wrap items-center gap-5 text-[13px] text-white/70">
              <span className="flex items-center gap-1.5"><MapPin size={14} /> {brand.country}</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> Est. {brand.founded}</span>
              <span>{baseProducts.length} products</span>
              <span>{avgRating} ★ average rating</span>
            </div>
            <Link
              to={`/brand/${brand.slug}/insights`}
              className="inline-flex items-center gap-2 mt-5 bg-gold-light text-sapphire font-bold text-sm px-5 py-2.5 hover:-translate-y-0.5 transition-transform"
            >
              <BarChart3 size={15} /> View Brand Data & Sales Insights
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4">
        <div className="flex items-center gap-2.5 bg-ivory-2 border border-sapphire/10 px-5 py-3 text-xs text-ink/55">
          <Eye size={14} className="text-amethyst flex-shrink-0" />
          This is a <strong className="text-sapphire">view-only demo brand account</strong> — you can browse and purchase, but brand account details cannot be edited.
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          <FilterSidebar
            categoriesList={brandCategories}
            selectedCategory={f.selectedCategory}
            onCategoryChange={f.setSelectedCategory}
            availableBrandIds={[]}
            selectedBrands={f.selectedBrands}
            onBrandToggle={f.toggleBrand}
            priceRange={f.priceRange}
            onPriceChange={f.setPriceRange}
            minRating={f.minRating}
            onRatingChange={f.setMinRating}
            inStockOnly={f.inStockOnly}
            onStockChange={f.setInStockOnly}
            onReset={f.reset}
          />

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-sapphire/10">
              <span className="text-sm text-ink/55 flex items-center gap-2">
                <SlidersHorizontal size={14} /> Showing {f.pageItems.length} of {f.resultCount}
              </span>
              <select
                value={f.sortBy}
                onChange={(e) => f.setSortBy(e.target.value)}
                className="text-sm font-semibold border border-sapphire/15 px-3 py-2 bg-white focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {f.pageItems.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-ink/50 mb-4">No products match these filters.</p>
                <button onClick={f.reset} className="text-amethyst font-bold text-sm">Reset filters</button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {f.pageItems.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

            <Pagination page={f.page} totalPages={f.totalPages} onChange={f.setPage} />
          </div>
        </div>
      </div>
    </div>
  );
}
