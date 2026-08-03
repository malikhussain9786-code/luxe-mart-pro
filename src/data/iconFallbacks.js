import {
  Shirt, Footprints, Wallet, Glasses, ShoppingBag, Gem,
  Dumbbell, Backpack, Trophy, Cookie, Coffee, Package, Carrot, Milk,
} from "lucide-react";

// Maps subcategories that don't have a curated real-photo pool to a
// clean icon + label treatment (see ProductImage.jsx). Used instead of
// ever guessing with a mismatched or unreliable photo.
export const iconFallbacks = {
  "mens-hoodies": { icon: Shirt, label: "Hoodie" },
  "mens-formal": { icon: Shirt, label: "Formal Wear" },
  "womens-dresses": { icon: Shirt, label: "Dress" },
  "womens-tops": { icon: Shirt, label: "Top" },
  "womens-skirts": { icon: Shirt, label: "Skirt" },
  "womens-formal": { icon: Shirt, label: "Evening Wear" },

  "mens-formal-shoes": { icon: Footprints, label: "Formal Shoes" },
  "mens-boots": { icon: Footprints, label: "Boots" },
  "womens-heels": { icon: Footprints, label: "Heels" },
  "womens-flats": { icon: Footprints, label: "Flats" },

  wallets: { icon: Wallet, label: "Wallet" },
  belts: { icon: ShoppingBag, label: "Belt" },
  sunglasses: { icon: Glasses, label: "Sunglasses" },
  handbags: { icon: ShoppingBag, label: "Handbag" },
  jewelry: { icon: Gem, label: "Jewelry" },

  jerseys: { icon: Trophy, label: "Jersey" },
  "fitness-equipment": { icon: Dumbbell, label: "Fitness Equipment" },
  "gym-accessories": { icon: Backpack, label: "Gym Accessories" },
  "training-gear": { icon: Dumbbell, label: "Training Gear" },

  snacks: { icon: Cookie, label: "Snacks" },
  beverages: { icon: Coffee, label: "Beverages" },
  "packaged-foods": { icon: Package, label: "Packaged Foods" },
  "fruits-vegetables": { icon: Carrot, label: "Fresh Produce" },
  dairy: { icon: Milk, label: "Dairy" },
};

export function getIconFallback(subcategoryId) {
  return iconFallbacks[subcategoryId] || { icon: Package, label: "Product" };
}
