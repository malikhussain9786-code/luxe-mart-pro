import { Link } from "react-router-dom";
import { Button, CutFrame } from "../ui/index.js";
import { products } from "../../data/products.js";
import { getPoolImage } from "../../data/imagePools.js";
import ProductImage from "../product/ProductImage.jsx";

export default function HeroBanner() {
  const featured = products.find((p) => p.id === "heritage-watches-0") || products.find((p) => p.image) || products[0];
  const heroImage = getPoolImage("mens-jackets", 0);

  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gold/10 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12 md:gap-16 items-center relative">
        <div>
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-amethyst font-medium mb-4 inline-block">
            ◆ The Luxe Mart Pro Edit — Autumn Collection
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-semibold leading-[1.05] text-sapphire mb-6">
            Curated luxury,<br /><em className="not-italic text-amethyst">delivered with precision.</em>
          </h1>
          <p className="text-ink/60 max-w-md mb-8 leading-relaxed">
            Discover premium fashion, footwear, accessories, sport, and fine grocery from
            our demo brand roster — one seamless, secure, simulated checkout.
          </p>
          <div className="flex flex-wrap gap-4 mb-9">
            <Button as={Link} to="/category/mens-fashion" variant="primary">Shop the Edit →</Button>
            <Button as={Link} to="/brands" variant="ghost">Explore Brands</Button>
          </div>
          <div className="flex flex-wrap gap-7 text-xs font-semibold text-ink/60">
            <span className="flex items-center gap-2"><i className="w-1.5 h-1.5 rounded-full bg-emerald inline-block" /> 195 Countries Served</span>
            <span className="flex items-center gap-2"><i className="w-1.5 h-1.5 rounded-full bg-emerald inline-block" /> Secure Simulated Checkout</span>
            <span className="flex items-center gap-2"><i className="w-1.5 h-1.5 rounded-full bg-emerald inline-block" /> Verified Demo Brands</span>
          </div>
        </div>

        <div className="relative">
          <CutFrame className="h-[440px] md:h-[540px] shadow-lux">
            <img src={heroImage} alt="Luxe Mart Pro" className="w-full h-full object-cover" loading="eager" fetchPriority="high" decoding="async" />
          </CutFrame>
          <div className="absolute top-6 right-4 md:-right-6 bg-sapphire text-ivory px-5 py-3.5 shadow-lux text-center">
            <div className="font-display text-2xl font-bold">4.9</div>
            <div className="text-[10px] tracking-wide uppercase opacity-80">Avg Rating</div>
          </div>
          {featured && (
            <Link
              to={`/product/${featured.id}`}
              className="absolute bottom-7 left-4 md:-left-8 bg-white px-5 py-4 shadow-lux flex items-center gap-3.5 w-52 sm:w-60"
            >
              <div className="w-14 h-14 flex-shrink-0 overflow-hidden">
                <ProductImage product={featured} />
              </div>
              <div>
                <div className="text-[12px] text-ink/50 mb-0.5">{featured.name}</div>
                <div className="font-mono font-semibold text-amethyst text-[15px]">${featured.price}.00</div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
