import { Link } from "react-router-dom";
import { brands } from "../../data/brands.js";

export default function BrandStrip() {
  return (
    <section className="bg-ivory-2 py-11">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-wrap justify-between items-center gap-6">
        {brands.map((b) => (
          <Link
            key={b.id}
            to={`/brand/${b.slug}`}
            className="font-display text-lg font-semibold text-sapphire/55 hover:text-sapphire transition flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amethyst inline-block" />
            {b.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
