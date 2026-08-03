import { useState, useMemo } from "react";

const PAGE_SIZE = 12;

export function useProductFilters(baseProducts) {
  const [selectedCategory, setSelectedCategoryRaw] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnlyRaw] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [page, setPage] = useState(1);

  function toggleBrand(brandId) {
    setSelectedBrands((prev) =>
      prev.includes(brandId) ? prev.filter((b) => b !== brandId) : [...prev, brandId]
    );
    setPage(1);
  }

  function reset() {
    setSelectedCategoryRaw(null);
    setSelectedSub(null);
    setSelectedBrands([]);
    setPriceRange([0, 500]);
    setMinRating(0);
    setInStockOnlyRaw(false);
    setSortBy("featured");
    setPage(1);
  }

  const filtered = useMemo(() => {
    let list = baseProducts.filter(
      (p) =>
        (!selectedCategory || p.categoryId === selectedCategory) &&
        (!selectedSub || p.subcategoryId === selectedSub) &&
        (selectedBrands.length === 0 || selectedBrands.includes(p.brandId)) &&
        p.price >= priceRange[0] &&
        p.price <= priceRange[1] &&
        p.rating >= minRating &&
        (!inStockOnly || p.stock > 0)
    );

    switch (sortBy) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      default:
        break;
    }
    return list;
  }, [baseProducts, selectedCategory, selectedSub, selectedBrands, priceRange, minRating, inStockOnly, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return {
    selectedCategory,
    setSelectedCategory: (v) => { setSelectedCategoryRaw(v); setSelectedSub(null); setPage(1); },
    selectedSub,
    setSelectedSub: (v) => { setSelectedSub(v); setPage(1); },
    selectedBrands,
    toggleBrand,
    priceRange,
    setPriceRange: (v) => { setPriceRange(v); setPage(1); },
    minRating,
    setMinRating: (v) => { setMinRating(v); setPage(1); },
    inStockOnly,
    setInStockOnly: (v) => { setInStockOnlyRaw(v); setPage(1); },
    sortBy,
    setSortBy,
    page,
    setPage,
    totalPages,
    pageItems,
    resultCount: filtered.length,
    reset,
  };
}
