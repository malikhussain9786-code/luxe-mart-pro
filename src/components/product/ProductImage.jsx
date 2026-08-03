import { getIconFallback } from "../../data/iconFallbacks.js";

/**
 * Renders a product's image. If the product has a real, verified photo
 * URL, it renders a normal <img>. If not (no verified real photo exists
 * for that subcategory), it renders a clean, on-brand icon card instead
 * of ever guessing with a mismatched or unreliable photo.
 */
export default function ProductImage({ product, className = "" }) {
  if (product.image) {
    return (
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        decoding="async"
        className={`w-full h-full object-cover ${className}`}
      />
    );
  }

  const { icon: Icon, label } = getIconFallback(product.subcategoryId);
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center gap-3 ${className}`}
      style={{ background: "linear-gradient(135deg, #14213D 0%, #1E3054 60%, #3D3018 100%)" }}
    >
      <Icon size={40} className="text-gold-light/90" strokeWidth={1.3} />
      <span className="text-[11px] font-mono tracking-wide uppercase text-ivory/70">{label}</span>
    </div>
  );
}
