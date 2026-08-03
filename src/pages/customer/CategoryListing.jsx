import { useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { ChevronRight, SlidersHorizontal } from "lucide-react";
import { getCategoryBySlug } from "../../data/categories.js";
import { getProductsByCategory } from "../../data/products.js";
import { useProductFilters } from "../../hooks/useProductFilters.js";
import FilterSidebar from "../../components/product/FilterSidebar.jsx";
import Pagination from "../../components/product/Pagination.jsx";
import ProductCard from "../../components/product/ProductCard.jsx";

export default function CategoryListing() {
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();
  const category = getCategoryBySlug(categorySlug);
  const baseProducts = category ? getProductsByCategory(category.id) : [];

  const f = useProductFilters(baseProducts);

  // Mega-menu deep links (?sub=xyz) preselect the subcategory filter.
  useEffect(() => {
    const sub = searchParams.get("sub");
    if (sub) f.setSelectedSub(sub);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  if (!category) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-sapphire mb-3">Category not found</h1>
        <Link to="/" className="text-amethyst font-semibold">← Back to home</Link>
      </div>
    );
  }

  const brandIdsInCategory = [...new Set(baseProducts.map((p) => p.brandId))];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
      <div className="flex items-center gap-2 text-xs text-ink/45 mb-6">
        <Link to="/" className="hover:text-amethyst">Home</Link>
        <ChevronRight size={12} />
        <span className="text-sapphire font-medium">{category.name}</span>
      </div>

      <div className="mb-10">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-amethyst">Shop</span>
        <h1 className="font-display text-4xl text-sapphire font-semibold mt-2">{category.name}</h1>
        <p className="text-ink/55 text-sm mt-2">{f.resultCount} products available</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <FilterSidebar
          subcategories={category.subcategories}
          selectedSub={f.selectedSub}
          onSubChange={f.setSelectedSub}
          availableBrandIds={brandIdsInCategory}
          selectedBrands={f.selectedBrands}
          onBrandToggle={f.toggleBrand}
          priceRange={f.priceRange}
          onPriceChange={f.setPriceRange}
          minRating={f.minRating}
          onRatingChange={f.setMinRating}
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
              <button onClick={f.reset} className="text-amethyst font-bold text-sm">
                Reset filters
              </button>
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
  );
}
