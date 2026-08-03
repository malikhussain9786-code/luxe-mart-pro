import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ShieldCheck, ChevronRight } from "lucide-react";
import { useCart } from "../../context/CartContext.jsx";
import { Button } from "../../components/ui/index.js";
import ItemThumb from "../../components/product/ItemThumb.jsx";

export default function Cart() {
  const { items, subtotal, itemCount, brandsInCart, updateQty, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  const shipping = subtotal > 200 || subtotal === 0 ? 0 : 14.99;
  const tax = Math.round(subtotal * 0.05 * 100) / 100;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-28 text-center">
        <div className="w-16 h-16 rounded-full bg-ivory-2 flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={26} className="text-sapphire/40" />
        </div>
        <h1 className="font-display text-3xl text-sapphire font-semibold mb-3">Your cart is empty</h1>
        <p className="text-ink/55 text-sm mb-8">Browse our demo brands and add something to get started.</p>
        <Button as={Link} to="/" variant="primary">Continue Shopping →</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
      <div className="flex items-center gap-2 text-xs text-ink/45 mb-6">
        <Link to="/" className="hover:text-amethyst">Home</Link>
        <ChevronRight size={12} />
        <span className="text-sapphire font-medium">Cart</span>
      </div>

      <h1 className="font-display text-4xl text-sapphire font-semibold mb-3">Shopping Cart</h1>
      <p className="text-ink/55 text-sm mb-8">{itemCount} item{itemCount !== 1 ? "s" : ""} in your cart</p>

      <div className="flex items-center justify-between gap-4 bg-ivory-2 border border-sapphire/10 px-5 py-4 mb-8 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap text-sm">
          <span className="text-ink/55">Shopping from:</span>
          {brandsInCart.map((b, i) => (
            <span key={b.brandId} className="font-bold text-sapphire">
              {b.brandName}{i < brandsInCart.length - 1 ? "," : ""}
            </span>
          ))}
        </div>
        <button onClick={clearCart} className="text-xs font-bold text-ruby hover:underline">
          Clear cart
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-10">
        <div className="space-y-5">
          {items.map((item) => (
            <div key={`${item.productId}-${item.variant}`} className="flex gap-5 bg-white border border-sapphire/10 p-5">
              <Link to={`/product/${item.productId}`} className="w-24 h-24 flex-shrink-0 overflow-hidden">
                <ItemThumb item={item} />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-3">
                  <div>
                    <div className="text-[10.5px] uppercase tracking-wide text-amethyst font-bold mb-1">{item.brandName}</div>
                    <Link to={`/product/${item.productId}`} className="font-semibold text-sapphire text-[15px] hover:text-amethyst">
                      {item.name}
                    </Link>
                    {item.variant && <div className="text-xs text-ink/45 mt-1">{item.variant}</div>}
                  </div>
                  <button onClick={() => removeItem(item.productId, item.variant)} aria-label="Remove item" title="Remove Item from Cart" className="text-ink/30 hover:text-ruby flex-shrink-0">
                    <Trash2 size={17} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-sapphire/15">
                    <button
                      onClick={() => updateQty(item.productId, item.variant, Math.max(1, item.qty - 1))}
                      className="w-8 h-8 flex items-center justify-center"
                      aria-label="Decrease quantity"
                      title="Decrease Quantity"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-8 text-center font-mono text-xs">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.productId, item.variant, item.qty + 1)}
                      className="w-8 h-8 flex items-center justify-center"
                      aria-label="Increase quantity"
                      title="Increase Quantity"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <div className="font-mono font-semibold text-sapphire text-[15px]">
                    ${(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative bg-sapphire text-ivory p-7 h-fit sticky top-24 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold via-amethyst-light to-gold" />
          <h2 className="font-display text-xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-3 text-sm mb-6">
            <div className="flex justify-between text-ivory/70">
              <span>Subtotal</span><span className="font-mono">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-ivory/70">
              <span>Shipping</span><span className="font-mono">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-ivory/70">
              <span>Estimated Tax</span><span className="font-mono">${tax.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex justify-between items-baseline border-t border-ivory/15 pt-5 mb-7">
            <span className="font-semibold">Total</span>
            <span className="font-mono text-2xl font-bold text-gold-light">${total.toFixed(2)}</span>
          </div>
          <Button variant="gold" className="w-full justify-center mb-4" onClick={() => navigate("/checkout")}>
            Proceed to Checkout →
          </Button>
          <div className="flex items-center justify-center gap-2 text-[11px] text-ivory/50">
            <ShieldCheck size={13} /> Secure simulated checkout · No real charges
          </div>
        </div>
      </div>
    </div>
  );
}
