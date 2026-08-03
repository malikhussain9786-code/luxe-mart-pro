import { SectionHeading } from "../ui/index.js";
import ProductCard from "../product/ProductCard.jsx";
import { products } from "../../data/products.js";

export default function FeaturedProducts() {
  const featured = [...products].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount).slice(0, 8);

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-14">
      <SectionHeading eyebrow="Handpicked for you" title="Featured this week" viewAllHref="/search" viewAllLabel="Browse all products" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
