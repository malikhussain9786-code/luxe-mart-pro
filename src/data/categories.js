// Category taxonomy for Luxe Mart Pro.
// Each top-level category has subcategories used for filtering,
// nav menus, and product generation.

export const categories = [
  {
    id: "mens-fashion",
    name: "Men's Fashion",
    slug: "mens-fashion",
    heroTag: "mensfashion",
    subcategories: [
      { id: "mens-tshirts", name: "T-Shirts", tag: "tshirt,mens" },
      { id: "mens-shirts", name: "Shirts", tag: "mensshirt,formal" },
      { id: "mens-jeans", name: "Jeans", tag: "jeans,denim" },
      { id: "mens-jackets", name: "Jackets", tag: "jacket,mens" },
      { id: "mens-hoodies", name: "Hoodies", tag: "hoodie,streetwear" },
      { id: "mens-formal", name: "Formal Wear", tag: "suit,mensformal" },
    ],
  },
  {
    id: "womens-fashion",
    name: "Women's Fashion",
    slug: "womens-fashion",
    heroTag: "womensfashion",
    subcategories: [
      { id: "womens-dresses", name: "Dresses", tag: "dress,elegant" },
      { id: "womens-tops", name: "Tops", tag: "womenstop,blouse" },
      { id: "womens-jeans", name: "Jeans", tag: "jeans,womens" },
      { id: "womens-jackets", name: "Jackets", tag: "jacket,womens" },
      { id: "womens-skirts", name: "Skirts", tag: "skirt,fashion" },
      { id: "womens-formal", name: "Formal Wear", tag: "gown,formal" },
    ],
  },
  {
    id: "shoes",
    name: "Shoes",
    slug: "shoes",
    heroTag: "shoes",
    subcategories: [
      { id: "mens-sneakers", name: "Men's Sneakers", tag: "sneakers,mens" },
      { id: "mens-formal-shoes", name: "Men's Formal Shoes", tag: "oxfordshoes,leather" },
      { id: "mens-boots", name: "Men's Boots", tag: "boots,mens" },
      { id: "womens-heels", name: "Women's Heels", tag: "heels,womens" },
      { id: "womens-flats", name: "Women's Flats", tag: "flatshoes,womens" },
      { id: "womens-sneakers", name: "Women's Sneakers", tag: "sneakers,womens" },
    ],
  },
  {
    id: "accessories",
    name: "Accessories",
    slug: "accessories",
    heroTag: "accessories",
    subcategories: [
      { id: "watches", name: "Watches", tag: "wristwatch,luxury" },
      { id: "wallets", name: "Wallets", tag: "leatherwallet" },
      { id: "belts", name: "Belts", tag: "leatherbelt" },
      { id: "sunglasses", name: "Sunglasses", tag: "sunglasses,luxury" },
      { id: "handbags", name: "Handbags", tag: "handbag,leather" },
      { id: "jewelry", name: "Jewelry", tag: "jewelry,gold" },
    ],
  },
  {
    id: "sports",
    name: "Sports",
    slug: "sports",
    heroTag: "sports",
    subcategories: [
      { id: "sports-shoes", name: "Sports Shoes", tag: "runningshoes" },
      { id: "jerseys", name: "Jerseys", tag: "jersey,sports" },
      { id: "fitness-equipment", name: "Fitness Equipment", tag: "gymequipment" },
      { id: "gym-accessories", name: "Gym Accessories", tag: "gymbag,fitness" },
      { id: "training-gear", name: "Training Gear", tag: "trainingequipment" },
    ],
  },
  {
    id: "grocery-food",
    name: "Grocery & Food",
    slug: "grocery-food",
    heroTag: "grocery",
    subcategories: [
      { id: "snacks", name: "Snacks", tag: "snacks,gourmet" },
      { id: "beverages", name: "Beverages", tag: "beverages,drinks" },
      { id: "packaged-foods", name: "Packaged Foods", tag: "packagedfood" },
      { id: "fruits-vegetables", name: "Fruits & Vegetables", tag: "freshvegetables" },
      { id: "dairy", name: "Dairy", tag: "dairyproducts" },
    ],
  },
];

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug);
}
