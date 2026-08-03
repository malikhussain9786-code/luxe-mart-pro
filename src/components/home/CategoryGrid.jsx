import { Link } from "react-router-dom";
import { Shirt, Sparkles, Footprints, Watch, Dumbbell, ShoppingBasket } from "lucide-react";
import { SectionHeading } from "../ui/index.js";
import { categories } from "../../data/categories.js";
import { getProductsByCategory } from "../../data/products.js";

const categoryIcons = {
  "mens-fashion": Shirt,
  "womens-fashion": Sparkles,
  shoes: Footprints,
  accessories: Watch,
  sports: Dumbbell,
  "grocery-food": ShoppingBasket,
};

const cardStyles = [
  "from-sapphire to-sapphire-2",
  "from-[#C6437B] to-[#9C2C5B]",
  "from-emerald to-[#155940]",
  "from-gold to-[#9C7B3D]",
  "from-[#2E6FA8] to-[#1D4E7A]",
  "from-ruby to-[#7A162C]",
];

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-14">
      <SectionHeading eyebrow="Shop by category" title="Six worlds of premium living" viewAllHref="/category/mens-fashion" viewAllLabel="View all categories" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat, i) => {
          const Icon = categoryIcons[cat.id];
          return (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className={`relative h-40 overflow-hidden rounded-xl bg-gradient-to-br ${cardStyles[i % cardStyles.length]} flex flex-col items-center justify-center gap-2.5 group transition-transform duration-300 hover:-translate-y-1.5 shadow-[0_14px_28px_-14px_rgba(20,33,61,0.4)]`}
            >
              <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                <Icon size={20} className="text-white" strokeWidth={1.6} />
              </div>
              <span className="text-white text-[13px] font-bold text-center px-3 leading-tight">{cat.name}</span>
              <span className="text-white/60 text-[10.5px]">{getProductsByCategory(cat.id).length} items</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
