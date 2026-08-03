import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { Badge, PriceTag, RatingStars, Card, Button } from "../ui/index.js";
import { useWishlist } from "../../context/WishlistContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import ProductImage from "./ProductImage.jsx";

export default function ProductCard({ product }) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addItem } = useCart();
  const wished = isWishlisted(product.id);
  const [added, setAdded] = useState(false);

  function handleQuickAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, null);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <Card className="group border border-transparent hover:border-gold/40 transition-colors duration-300">
      <div className="relative h-64 overflow-hidden bg-ivory-2">
        <Link to={`/product/${product.id}`}>
          <ProductImage product={product} className="transition-transform duration-500 group-hover:scale-[1.06]" />
        </Link>
        {product.comparePrice && (
          <Badge tone="ruby" className="absolute top-3.5 left-3.5">
            -{Math.round(100 - (product.price / product.comparePrice) * 100)}%
          </Badge>
        )}
        {!product.comparePrice && product.isNew && (
          <Badge tone="gold" className="absolute top-3.5 left-3.5">New</Badge>
        )}
        <button
          onClick={() => toggleWishlist(product)}
          aria-label={wished ? "Remove from Wishlist" : "Add to Wishlist"}
          title={wished ? "Remove from Wishlist" : "Add to Wishlist"}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center"
        >
          <Heart size={15} className={wished ? "fill-ruby text-ruby" : "text-sapphire/60"} />
        </button>
      </div>
      <Link to={`/product/${product.id}`} className="block px-5 pt-5">
        <div className="text-[10.5px] uppercase tracking-wide text-amethyst font-bold mb-1.5">
          {product.brandName}
        </div>
        <div className="font-semibold text-sapphire text-[15px] mb-2 leading-snug">{product.name}</div>
        <div className="mb-3">
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
        </div>
        <PriceTag price={product.price} comparePrice={product.comparePrice} />
      </Link>
      <div className="px-5 pb-5 pt-3">
        <Button
          variant={added ? "gold" : "ghost"}
          size="sm"
          className="w-full justify-center"
          onClick={handleQuickAdd}
          disabled={product.stock === 0}
        >
          {added ? <><Check size={14} /> Added</> : product.stock === 0 ? "Out of Stock" : <><ShoppingBag size={14} /> Add to Cart</>}
        </Button>
      </div>
    </Card>
  );
}
