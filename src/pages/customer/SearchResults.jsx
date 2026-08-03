import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, ChevronRight, SlidersHorizontal } from "lucide-react";
import { products } from "../../data/products.js";
import { categories } from "../../data/categories.js";
import { useProductFilters } from "../../hooks/useProductFilters.js";
import FilterSidebar from "../../components/product/FilterSidebar.jsx";
import Pagination from "../../components/product/Pagination.jsx";
import ProductCard from "../../components/product/ProductCard.jsx";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(urlQuery);

  useEffect(() => setQuery(urlQuery), [urlQuery]);

  const q = urlQuery.trim().toLowerCase();
  const matched = q
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brandName.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.subcategoryName.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    : products;

  const f = useProductFilters(matched);
  const brandIdsInResults = [...new Set(matched.map((p) => p.brandId))];

  function submitSearch(e) {
    e.preventDefault();
    setSearchParams(query.trim() ? { q: query.trim() } : {});
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
      <div className="flex items-center gap-2 text-xs text-ink/45 mb-6">
        <Link to="/" className="hover:text-amethyst">Home</Link>
        <ChevronRight size={12} />
        <span className="text-sapphire font-medium">Search</span>
      </div>

      <form onSubmit={submitSearch} className="max-w-xl mb-10">
        <div className="flex items-center gap-3 border border-sapphire/15 rounded-full px-5 py-3.5 bg-white">
          <Search size={18} className="text-ink/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, brands, categories..."
            className="w-full text-sm outline-none bg-transparent"
          />
        </div>
      </form>

      <div className="mb-10">
        <h1 className="font-display text-3xl text-sapphire font-semibold">
          {q ? `Results for "${urlQuery}"` : "All Products"}
        </h1>
        <p className="text-ink/55 text-sm mt-2">{f.resultCount} products found</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <FilterSidebar
          categoriesList={categories}
          selectedCategory={f.selectedCategory}
          onCategoryChange={f.setSelectedCategory}
          availableBrandIds={brandIdsInResults}
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
              <p className="text-ink/50 mb-4">
                {q ? `No products match "${urlQuery}".` : "No products match these filters."}
              </p>
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
