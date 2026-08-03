import { getIconFallback } from "../../data/iconFallbacks.js";

/**
 * Safe image renderer for cart/order line items, which carry a smaller
 * snapshot (image + subcategoryId) rather than the full product object.
 * Falls back to the same icon-card treatment as ProductImage.
 */
export default function ItemThumb({ item, className = "" }) {
  if (item.image) {
    return <img src={item.image} alt={item.name} className={`w-full h-full object-cover ${className}`}  decoding="async" />;
  }
  const { icon: Icon } = getIconFallback(item.subcategoryId);
  return (
    <div
      className={`w-full h-full flex items-center justify-center ${className}`}
      style={{ background: "linear-gradient(135deg, #14213D 0%, #1E3054 60%, #3D3018 100%)" }}
    >
      <Icon size={18} className="text-gold-light/90" strokeWidth={1.4} />
    </div>
  );
}
