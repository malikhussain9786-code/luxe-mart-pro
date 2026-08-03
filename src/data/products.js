import { brands } from "./brands.js";
import { categories } from "./categories.js";
import { hasCuratedPool, getPoolImage } from "./imagePools.js";

// Category/brand banner images: only assigned a real photo when the
// category/brand's primary subject has a verified curated pool.
// Otherwise left null and rendered as a clean icon card (see
// CategoryImage.jsx / BrandImage.jsx) — never a mismatched photo.
const categoryBannerSub = {
  "mens-fashion": "mens-jackets",
  "womens-fashion": "womens-jackets",
  shoes: "mens-sneakers",
  accessories: "watches",
  sports: null,
  "grocery-food": null,
};

categories.forEach((cat) => {
  const subId = categoryBannerSub[cat.id];
  cat.bannerImage = subId ? getPoolImage(subId, 0) : null;
});

const brandBannerSub = {
  "noir-co": "mens-jackets",
  "etoile-paris": "womens-jackets",
  meridian: "watches",
  "urban-form": "mens-sneakers",
  "maison-devereux": "womens-jackets",
  "forge-athletic": "mens-sneakers",
  heritage: "watches",
  "terroir-fine-foods": null,
};

brands.forEach((brand, i) => {
  const subId = brandBannerSub[brand.id];
  brand.bannerImage = subId ? getPoolImage(subId, i + 2) : null;
  brand.logoImage = brand.bannerImage;
});

// ---- Naming & copy templates, keyed by subcategory id ----
const templates = {
  "mens-tshirts": { noun: "Crew Neck T-Shirt", materials: ["Pima Cotton", "Merino Blend", "Organic Cotton"] },
  "mens-shirts": { noun: "Tailored Shirt", materials: ["Egyptian Cotton", "Linen Blend", "Poplin"] },
  "mens-jeans": { noun: "Straight Fit Jeans", materials: ["Selvedge Denim", "Stretch Denim", "Raw Denim"] },
  "mens-jackets": { noun: "Wool Overcoat", materials: ["Merino Wool", "Cashmere Blend", "Waxed Cotton"] },
  "mens-hoodies": { noun: "Fleece Hoodie", materials: ["Brushed Fleece", "Organic Cotton", "Heavyweight Jersey"] },
  "mens-formal": { noun: "Two-Piece Suit", materials: ["Italian Wool", "Mohair Blend", "Super 120s Wool"] },

  "womens-dresses": { noun: "Silk Midi Dress", materials: ["Mulberry Silk", "Satin", "Crepe"] },
  "womens-tops": { noun: "Silk Blouse", materials: ["Silk Charmeuse", "Cotton Voile", "Chiffon"] },
  "womens-jeans": { noun: "High-Rise Jeans", materials: ["Stretch Denim", "Organic Denim", "Selvedge Denim"] },
  "womens-jackets": { noun: "Tailored Blazer", materials: ["Wool Crepe", "Linen Blend", "Cashmere Blend"] },
  "womens-skirts": { noun: "Pleated Skirt", materials: ["Satin", "Wool Crepe", "Silk"] },
  "womens-formal": { noun: "Evening Gown", materials: ["Silk Chiffon", "Velvet", "Satin"] },

  "mens-sneakers": { noun: "Minimalist Court Sneaker", materials: ["Full-Grain Leather", "Suede", "Nubuck"] },
  "mens-formal-shoes": { noun: "Oxford Shoe", materials: ["Calfskin Leather", "Patent Leather", "Suede"] },
  "mens-boots": { noun: "Chelsea Boot", materials: ["Full-Grain Leather", "Waxed Suede", "Nubuck"] },
  "womens-heels": { noun: "Pointed-Toe Heel", materials: ["Satin", "Patent Leather", "Suede"] },
  "womens-flats": { noun: "Ballet Flat", materials: ["Nappa Leather", "Suede", "Canvas"] },
  "womens-sneakers": { noun: "Low-Top Sneaker", materials: ["Leather", "Canvas", "Suede"] },

  watches: { noun: "Automatic Chronograph Watch", materials: ["Stainless Steel", "Rose Gold Plate", "Titanium"] },
  wallets: { noun: "Bifold Wallet", materials: ["Full-Grain Leather", "Saffiano Leather", "Nappa Leather"] },
  belts: { noun: "Reversible Belt", materials: ["Calfskin Leather", "Full-Grain Leather", "Suede"] },
  sunglasses: { noun: "Acetate Sunglasses", materials: ["Italian Acetate", "Titanium Frame", "Polarized Lens"] },
  handbags: { noun: "Structured Tote", materials: ["Full-Grain Leather", "Saffiano Leather", "Suede"] },
  jewelry: { noun: "Layered Chain Necklace", materials: ["18k Gold Plate", "Sterling Silver", "Freshwater Pearl"] },

  "sports-shoes": { noun: "Performance Running Shoe", materials: ["Engineered Mesh", "Knit Upper", "Breathable Mesh"] },
  jerseys: { noun: "Training Jersey", materials: ["Moisture-Wick Polyester", "Mesh Panel Fabric", "Recycled Polyester"] },
  "fitness-equipment": { noun: "Adjustable Dumbbell Set", materials: ["Cast Iron", "Rubber Coated", "Chrome"] },
  "gym-accessories": { noun: "Gym Duffel Bag", materials: ["Ripstop Nylon", "Canvas", "Water-Resistant Nylon"] },
  "training-gear": { noun: "Resistance Band Set", materials: ["Natural Latex", "Fabric-Wrapped", "TPE"] },

  snacks: { noun: "Artisan Snack Box", materials: ["Small-Batch", "Slow-Roasted", "Hand-Selected"] },
  beverages: { noun: "Cold-Pressed Juice Pack", materials: ["Organic", "Single-Origin", "Small-Batch"] },
  "packaged-foods": { noun: "Gourmet Pasta Set", materials: ["Artisan-Made", "Stone-Ground", "Small-Batch"] },
  "fruits-vegetables": { noun: "Fresh Produce Box", materials: ["Farm-Fresh", "Organic", "Locally Sourced"] },
  dairy: { noun: "Artisan Cheese Selection", materials: ["Aged", "Farmhouse", "Small-Batch"] },
};

const colors = ["Midnight Navy", "Ivory", "Charcoal", "Sapphire Blue", "Champagne Gold", "Emerald", "Burgundy", "Sand", "Black", "Stone Grey"];
const sizesClothing = ["XS", "S", "M", "L", "XL", "XXL"];
const sizesShoes = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];

function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function priceRangeFor(categoryId) {
  switch (categoryId) {
    case "accessories": return [80, 480];
    case "grocery-food": return [12, 95];
    case "sports": return [35, 260];
    case "shoes": return [70, 340];
    default: return [45, 420];
  }
}

function buildDescription(brand, noun, material) {
  return `The ${noun} from ${brand.name} is crafted in ${material.toLowerCase()}, designed for a considered wardrobe that favors quality over quantity. Every detail — from construction to finish — reflects ${brand.name}'s commitment to lasting, everyday luxury. Part of the ${brand.country} atelier's current collection.`;
}

// Tracks how many times each subcategory's curated pool has been drawn
// from, across the whole catalog, so we cycle through real photos
// evenly instead of clustering repeats.
const poolCursor = {};
function nextPoolIndex(subId) {
  poolCursor[subId] = (poolCursor[subId] || 0) + 1;
  return poolCursor[subId] - 1;
}

function buildProduct({ brand, category, sub, index, globalIndex }) {
  const tpl = templates[sub.id];
  const seed = globalIndex * 7.31;
  const material = tpl.materials[index % tpl.materials.length];
  const color = colors[Math.floor(seededRandom(seed + 1) * colors.length)];
  const [min, max] = priceRangeFor(category.id);
  const priceFinal = Math.round((min + seededRandom(seed + 1) * (max - min)) / 5) * 5;
  const hasDiscount = seededRandom(seed + 2) > 0.55;
  const comparePrice = hasDiscount ? Math.round(priceFinal * (1 + 0.12 + seededRandom(seed + 3) * 0.2)) : null;
  const rating = Math.round((3.9 + seededRandom(seed + 4) * 1.1) * 10) / 10;
  const reviewCount = Math.floor(30 + seededRandom(seed + 5) * 320);
  const stock = Math.floor(seededRandom(seed + 6) * 140);
  const isClothing = category.id === "mens-fashion" || category.id === "womens-fashion";
  const isShoe = category.id === "shoes";
  const id = `${brand.id}-${sub.id}-${index}`;

  const usePhoto = hasCuratedPool(sub.id);
  const poolIdx = usePhoto ? nextPoolIndex(sub.id) : 0;
  const image = usePhoto ? getPoolImage(sub.id, poolIdx) : null;
  const gallery = usePhoto
    ? [1, 2, 3].map((n) => getPoolImage(sub.id, poolIdx + n))
    : [];

  return {
    id,
    sku: `LMP-${brand.id.slice(0, 3).toUpperCase()}-${sub.id.slice(0, 4).toUpperCase()}-${String(index).padStart(3, "0")}`,
    name: `${material} ${tpl.noun}`,
    brandId: brand.id,
    brandName: brand.name,
    categoryId: category.id,
    categoryName: category.name,
    subcategoryId: sub.id,
    subcategoryName: sub.name,
    description: `${material} ${tpl.noun.toLowerCase()} in ${color.toLowerCase()}.`,
    longDescription: buildDescription(brand, tpl.noun, material),
    material,
    color,
    price: priceFinal,
    comparePrice,
    rating,
    reviewCount,
    stock,
    stockStatus: stock === 0 ? "Out of Stock" : stock < 15 ? "Low Stock" : "In Stock",
    sizes: isClothing ? sizesClothing : isShoe ? sizesShoes : null,
    colors: category.id === "grocery-food" ? null : [color, colors[(Math.floor(seededRandom(seed + 7) * colors.length))]].filter((v, i, a) => a.indexOf(v) === i),
    image,
    gallery,
    isNew: seededRandom(seed + 8) > 0.8,
  };
}

function generateCatalog() {
  const products = [];
  let globalIndex = 0;
  const ITEMS_PER_CATEGORY = 9;

  brands.forEach((brand) => {
    brand.categoryIds.forEach((categoryId) => {
      const category = categories.find((c) => c.id === categoryId);
      if (!category) return;
      const subs = category.subcategories;
      for (let i = 0; i < ITEMS_PER_CATEGORY; i++) {
        const sub = subs[i % subs.length];
        globalIndex++;
        products.push(buildProduct({ brand, category, sub, index: i, globalIndex }));
      }
    });
  });

  return products;
}

export const products = generateCatalog();

export function getProductById(id) {
  return products.find((p) => p.id === id);
}

export function getProductsByBrand(brandId) {
  return products.filter((p) => p.brandId === brandId);
}

export function getProductsByCategory(categoryId) {
  return products.filter((p) => p.categoryId === categoryId);
}

export function getRelatedProducts(product, count = 4) {
  return products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, count);
}
