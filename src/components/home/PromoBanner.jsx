import { Link } from "react-router-dom";
import { Button, CutFrame } from "../ui/index.js";
import { brands } from "../../data/brands.js";

export default function PromoBanner() {
  const brand = brands.find((b) => b.id === "noir-co");

  return (
    <section className="px-6 md:px-10">
      <CutFrame className="max-w-7xl mx-auto relative h-[420px] shadow-lux">
        <img src={brand.bannerImage} alt="Seasonal Sale" className="w-full h-full object-cover"  decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-r from-sapphire/90 via-sapphire/55 to-transparent flex flex-col justify-center px-6 sm:px-10 md:px-16 max-w-xl">
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-gold-light mb-3">Limited-time edit</span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-white leading-tight mb-4">
            The Winter<br />Formalwear Sale
          </h2>
          <p className="text-white/75 mb-7 max-w-sm">
            Up to 30% off tailored menswear and eveningwear across all demo brands. Ends soon.
          </p>
          <Button as={Link} to="/category/mens-fashion" variant="gold" className="self-start">
            Shop Formalwear →
          </Button>
        </div>
      </CutFrame>
    </section>
  );
}
