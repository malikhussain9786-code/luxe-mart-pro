import { brands as allBrands } from "../../data/brands.js";

export default function FilterSidebar({
  categoriesList = [],
  selectedCategory,
  onCategoryChange,
  subcategories = [],
  selectedSub,
  onSubChange,
  availableBrandIds = [],
  selectedBrands,
  onBrandToggle,
  priceRange,
  onPriceChange,
  minRating,
  onRatingChange,
  inStockOnly,
  onStockChange,
  onReset,
}) {
  const brandOptions = allBrands.filter((b) => availableBrandIds.includes(b.id));

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg text-sapphire font-semibold">Filters</h3>
        <button onClick={onReset} className="text-xs font-bold text-amethyst">
          Reset
        </button>
      </div>

      {categoriesList.length > 0 && (
        <div>
          <div className="text-xs font-bold uppercase tracking-wide text-sapphire/60 mb-3">Category</div>
          <div className="space-y-2">
            <button
              onClick={() => onCategoryChange(null)}
              className={`block text-sm ${!selectedCategory ? "text-amethyst font-bold" : "text-ink/65 hover:text-amethyst"}`}
            >
              All Categories
            </button>
            {categoriesList.map((c) => (
              <button
                key={c.id}
                onClick={() => onCategoryChange(c.id)}
                className={`block text-sm ${selectedCategory === c.id ? "text-amethyst font-bold" : "text-ink/65 hover:text-amethyst"}`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {subcategories.length > 0 && (
        <div>
          <div className="text-xs font-bold uppercase tracking-wide text-sapphire/60 mb-3">Subcategory</div>
          <div className="space-y-2">
            <button
              onClick={() => onSubChange(null)}
              className={`block text-sm ${!selectedSub ? "text-amethyst font-bold" : "text-ink/65 hover:text-amethyst"}`}
            >
              All
            </button>
            {subcategories.map((s) => (
              <button
                key={s.id}
                onClick={() => onSubChange(s.id)}
                className={`block text-sm ${selectedSub === s.id ? "text-amethyst font-bold" : "text-ink/65 hover:text-amethyst"}`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {brandOptions.length > 0 && (
        <div>
          <div className="text-xs font-bold uppercase tracking-wide text-sapphire/60 mb-3">Brand</div>
          <div className="space-y-2.5">
            {brandOptions.map((b) => (
              <label key={b.id} className="flex items-center gap-2.5 text-sm text-ink/70 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(b.id)}
                  onChange={() => onBrandToggle(b.id)}
                  className="accent-amethyst w-3.5 h-3.5"
                />
                {b.name}
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="text-xs font-bold uppercase tracking-wide text-sapphire/60 mb-3">
          Price · ${priceRange[0]} – ${priceRange[1]}
        </div>
        <input
          type="range"
          min={0}
          max={500}
          step={10}
          value={priceRange[1]}
          onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
          className="w-full accent-amethyst"
        />
      </div>

      <div>
        <div className="text-xs font-bold uppercase tracking-wide text-sapphire/60 mb-3">Minimum Rating</div>
        <div className="flex gap-2">
          {[0, 3, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => onRatingChange(r)}
              className={`text-xs font-semibold px-3 py-1.5 border ${
                minRating === r ? "bg-sapphire text-ivory border-sapphire" : "border-sapphire/15 text-ink/60"
              }`}
            >
              {r === 0 ? "Any" : `${r}+`}
            </button>
          ))}
        </div>
      </div>

      {onStockChange && (
        <label className="flex items-center gap-2.5 text-sm text-ink/70 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onStockChange(e.target.checked)}
            className="accent-amethyst w-3.5 h-3.5"
          />
          In stock only
        </label>
      )}
    </aside>
  );
}
