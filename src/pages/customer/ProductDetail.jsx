import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronRight, Heart, Minus, Plus, ShieldCheck, Truck, RotateCcw, ShoppingBag } from "lucide-react";
import { getProductById, getRelatedProducts } from "../../data/products.js";
import { brands } from "../../data/brands.js";
import { useCart } from "../../context/CartContext.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";
import { Button, Badge, PriceTag, RatingStars } from "../../components/ui/index.js";
import ImageGallery from "../../components/product/ImageGallery.jsx";
import ProductReviews from "../../components/product/ProductReviews.jsx";
import ProductCard from "../../components/product/ProductCard.jsx";

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = getProductById(productId);
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] ?? null);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[Math.floor((product?.sizes?.length ?? 1) / 2)] ?? null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-sapphire mb-3">Product not found</h1>
        <Link to="/" className="text-amethyst font-semibold">← Back to home</Link>
      </div>
    );
  }

  const brand = brands.find((b) => b.id === product.brandId);
  const related = getRelatedProducts(product);
  const wished = isWishlisted(product.id);
  const variant = [selectedColor, selectedSize].filter(Boolean).join(" / ") || null;

  function handleAddToCart() {
    addItem(product, qty, variant);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
      <div className="flex items-center gap-2 text-xs text-ink/45 mb-8 flex-wrap">
        <Link to="/" className="hover:text-amethyst">Home</Link>
        <ChevronRight size={12} />
        <Link to={`/category/${product.categoryId}`} className="hover:text-amethyst">{product.categoryName}</Link>
        <ChevronRight size={12} />
        <span className="text-sapphire font-medium">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-20">
        <ImageGallery product={product} />

        <div>
          <Link to={`/brand/${brand.slug}`} className="text-[11px] uppercase tracking-wide text-amethyst font-bold mb-2 inline-block">
            {brand.name}
          </Link>
          <h1 className="font-display text-3xl md:text-4xl text-sapphire font-semibold mb-3 leading-tight">
            {product.name}
          </h1>
          <div className="mb-4">
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} size={16} />
          </div>
          <div className="mb-6">
            <PriceTag price={product.price} comparePrice={product.comparePrice} size="lg" />
          </div>

          <p className="text-ink/60 text-sm leading-relaxed mb-7 max-w-lg">{product.longDescription}</p>

          {product.colors && (
            <div className="mb-6">
              <div className="text-xs font-bold uppercase tracking-wide text-sapphire/60 mb-2.5">
                Color: <span className="text-ink/70 font-normal normal-case">{selectedColor}</span>
              </div>
              <div className="flex gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3.5 py-2 text-xs font-semibold border ${
                      selectedColor === c ? "border-amethyst text-amethyst" : "border-sapphire/15 text-ink/60"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes && (
            <div className="mb-6">
              <div className="text-xs font-bold uppercase tracking-wide text-sapphire/60 mb-2.5">
                Size: <span className="text-ink/70 font-normal normal-case">{selectedSize}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-11 h-11 text-xs font-semibold border ${
                      selectedSize === s ? "bg-sapphire text-ivory border-sapphire" : "border-sapphire/15 text-ink/60"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-3">
            <Badge tone={product.stockStatus === "In Stock" ? "emerald" : product.stockStatus === "Low Stock" ? "ruby" : "outline"}>
              {product.stockStatus}{product.stock > 0 && ` · ${product.stock} left`}
            </Badge>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center border border-sapphire/15">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-10 h-11 flex items-center justify-center" aria-label="Decrease quantity" title="Decrease Quantity">
                <Minus size={14} />
              </button>
              <span className="w-10 text-center font-mono text-sm">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(product.stock || 10, q + 1))} className="w-10 h-11 flex items-center justify-center" aria-label="Increase quantity" title="Increase Quantity">
                <Plus size={14} />
              </button>
            </div>
            <Button variant="primary" className="flex-1 justify-center" onClick={handleAddToCart} disabled={product.stock === 0}>
              <ShoppingBag size={16} /> {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
            <button
              onClick={() => toggleWishlist(product)}
              className="w-11 h-11 border border-sapphire/15 flex items-center justify-center flex-shrink-0"
              aria-label="Toggle wishlist" title="Add or Remove from Wishlist"
            >
              <Heart size={18} className={wished ? "fill-ruby text-ruby" : "text-sapphire/60"} />
            </button>
          </div>

          {added && (
            <div className="flex items-center justify-between gap-3 bg-emerald/10 border border-emerald/30 px-5 py-3.5 mb-7 animate-[fadeIn_0.2s_ease]">
              <span className="text-sm font-semibold text-emerald flex items-center gap-2">
                <ShoppingBag size={16} /> Added to your cart!
              </span>
              <Link to="/cart" className="text-sm font-bold text-sapphire hover:text-amethyst underline flex-shrink-0">
                View Cart →
              </Link>
            </div>
          )}
          {!added && <div className="mb-7" />}

          <div className="grid grid-cols-3 gap-3 text-center border-t border-sapphire/10 pt-6">
            <div className="text-[11.5px] text-ink/55 flex flex-col items-center gap-1.5">
              <Truck size={17} className="text-amethyst" /> Ships to 195 countries
            </div>
            <div className="text-[11.5px] text-ink/55 flex flex-col items-center gap-1.5">
              <ShieldCheck size={17} className="text-amethyst" /> Secure checkout
            </div>
            <div className="text-[11.5px] text-ink/55 flex flex-col items-center gap-1.5">
              <RotateCcw size={17} className="text-amethyst" /> 30-day returns
            </div>
          </div>

          <div className="mt-8 border-t border-sapphire/10 pt-6 grid grid-cols-2 gap-y-2 text-[13px] text-ink/60">
            <span className="text-sapphire/50 font-semibold">SKU</span><span className="font-mono">{product.sku}</span>
            <span className="text-sapphire/50 font-semibold">Material</span><span>{product.material}</span>
            <span className="text-sapphire/50 font-semibold">Category</span><span>{product.subcategoryName}</span>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <ProductReviews product={product} />
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="font-display text-2xl font-semibold text-sapphire mb-6">You may also like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
