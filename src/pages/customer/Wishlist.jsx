import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, X, ChevronRight, ShoppingBag } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { Button, PriceTag, RatingStars } from "../../components/ui/index.js";
import ProductImage from "../../components/product/ProductImage.jsx";

export default function Wishlist() {
  const { items, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(null);

  function handleAdd(product) {
    addItem(product, 1, null);
    setJustAdded(product.id);
    setTimeout(() => setJustAdded((cur) => (cur === product.id ? null : cur)), 2000);
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-28 text-center">
        <div className="w-16 h-16 rounded-full bg-ivory-2 flex items-center justify-center mx-auto mb-6">
          <Heart size={26} className="text-sapphire/40" />
        </div>
        <h1 className="font-display text-3xl text-sapphire font-semibold mb-3">Your wishlist is empty</h1>
        <p className="text-ink/55 text-sm mb-8">Tap the heart on any product to save it here.</p>
        <Button as={Link} to="/" variant="primary">Continue Shopping →</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
      <div className="flex items-center gap-2 text-xs text-ink/45 mb-6">
        <Link to="/" className="hover:text-amethyst">Home</Link>
        <ChevronRight size={12} />
        <span className="text-sapphire font-medium">Wishlist</span>
      </div>

      <h1 className="font-display text-4xl text-sapphire font-semibold mb-3">Your Wishlist</h1>
      <p className="text-ink/55 text-sm mb-10">{items.length} item{items.length !== 1 ? "s" : ""} saved</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((product) => (
          <div key={product.id} className="bg-white border border-sapphire/10 relative group">
            <button
              onClick={() => toggleWishlist(product)}
              aria-label="Remove from wishlist" title="Remove from Wishlist"
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center z-10 shadow-sm"
            >
              <X size={15} className="text-sapphire/60" />
            </button>
            <Link to={`/product/${product.id}`} className="block h-56 overflow-hidden">
              <ProductImage product={product} className="transition-transform duration-500 group-hover:scale-105" />
            </Link>
            <div className="p-5">
              <div className="text-[10.5px] uppercase tracking-wide text-amethyst font-bold mb-1.5">{product.brandName}</div>
              <Link to={`/product/${product.id}`} className="block font-semibold text-sapphire text-[15px] mb-2 leading-snug hover:text-amethyst">
                {product.name}
              </Link>
              <div className="mb-3">
                <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
              </div>
              <div className="flex items-center justify-between">
                <PriceTag price={product.price} comparePrice={product.comparePrice} />
              </div>
              <Button variant={justAdded === product.id ? "gold" : "ghost"} size="sm" className="w-full justify-center mt-4" onClick={() => handleAdd(product)}>
                <ShoppingBag size={14} /> {justAdded === product.id ? "Added ✓" : "Add to Cart"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
