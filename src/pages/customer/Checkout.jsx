import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, MapPin, Wallet, ShieldCheck, ChevronLeft } from "lucide-react";
import { useCart } from "../../context/CartContext.jsx";
import { useOrders } from "../../context/OrderContext.jsx";
import { Button, Input } from "../../components/ui/index.js";
import CountryCitySelect from "../../components/ui/CountryCitySelect.jsx";
import CheckoutSteps from "../../components/checkout/CheckoutSteps.jsx";
import PaymentForm from "../../components/checkout/PaymentForm.jsx";
import ProcessingModal from "../../components/checkout/ProcessingModal.jsx";
import ItemThumb from "../../components/product/ItemThumb.jsx";

export default function Checkout() {
  const { items, subtotal, brandsInCart, clearCart } = useCart();
  const { createOrder } = useOrders();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [contact, setContact] = useState({ fullName: "", email: "", phone: "" });
  const [location, setLocation] = useState({ country: "", city: "" });
  const [address, setAddress] = useState({ street: "", houseNo: "", landmark: "", postalCode: "" });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [wallet, setWallet] = useState({ pin: "" });
  const [paymentValid, setPaymentValid] = useState(false);
  const [processing, setProcessing] = useState(false);

  const shipping = subtotal > 200 ? 0 : 14.99;
  const tax = Math.round(subtotal * 0.05 * 100) / 100;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-28 text-center">
        <h1 className="font-display text-3xl text-sapphire font-semibold mb-3">Nothing to check out</h1>
        <p className="text-ink/55 text-sm mb-8">Your cart is empty — add something first.</p>
        <Button as={Link} to="/" variant="primary">Continue Shopping →</Button>
      </div>
    );
  }

  const shippingValid =
    contact.fullName && contact.email && contact.phone && location.country && location.city && address.street && address.houseNo;

  function handlePlaceOrder() {
    setProcessing(true);
    setTimeout(() => {
      const order = createOrder({
        items,
        contact,
        location,
        address,
        paymentMethod,
        cardLast4: paymentMethod === "card" ? card.number.replace(/\s/g, "").slice(-4) : null,
        subtotal,
        shipping,
        tax,
        total,
        brandName: brandsInCart.map((b) => b.brandName).join(", "),
      });
      clearCart();
      setProcessing(false);
      navigate(`/order-confirmation/${order.orderId}`);
    }, 1800);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-12">
      <div className="flex items-center gap-2 text-xs text-ink/45 mb-6">
        <Link to="/" className="hover:text-amethyst">Home</Link>
        <ChevronRight size={12} />
        <Link to="/cart" className="hover:text-amethyst">Cart</Link>
        <ChevronRight size={12} />
        <span className="text-sapphire font-medium">Checkout</span>
      </div>

      <h1 className="font-display text-4xl text-sapphire font-semibold text-center mb-2">Checkout</h1>
      <p className="text-center text-ink/50 text-sm mb-10">{items.length} item{items.length !== 1 ? "s" : ""} from {brandsInCart.length} brand{brandsInCart.length !== 1 ? "s" : ""}</p>

      <CheckoutSteps current={step} />

      <div className="grid lg:grid-cols-[1fr_360px] gap-10">
        <div className="bg-white border border-sapphire/10 p-8">
          {step === 1 && (
            <div>
              <h2 className="font-display text-xl font-semibold text-sapphire mb-6 flex items-center gap-2.5">
                <MapPin size={19} className="text-amethyst" /> Shipping Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <Input label="Full Name" value={contact.fullName} onChange={(e) => setContact({ ...contact, fullName: e.target.value })} placeholder="Malik Ahmed" />
                <Input label="Phone Number" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} placeholder="+92 300 1234567" />
              </div>
              <div className="mb-6">
                <Input label="Email Address" type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} placeholder="you@example.com" />
              </div>

              <div className="mb-4">
                <CountryCitySelect value={location} onChange={setLocation} />
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <Input label="Street Address" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} placeholder="e.g. Main Boulevard" />
                <Input label="House / Apartment No." value={address.houseNo} onChange={(e) => setAddress({ ...address, houseNo: e.target.value })} placeholder="e.g. House 24-B" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <Input
                  label="Nearest Landmark (optional)"
                  value={address.landmark}
                  onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                  placeholder="e.g. Near City Mall"
                />
                <Input
                  label="Postal Code (optional)"
                  value={address.postalCode}
                  onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                  placeholder="e.g. 44000"
                />
              </div>

              <Button variant="primary" className="w-full justify-center" disabled={!shippingValid} onClick={() => setStep(2)}>
                Continue to Payment →
              </Button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-display text-xl font-semibold text-sapphire mb-6 flex items-center gap-2.5">
                <Wallet size={19} className="text-amethyst" /> Payment Method
              </h2>
              <PaymentForm
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                card={card}
                setCard={setCard}
                wallet={wallet}
                setWallet={setWallet}
                onValidChange={setPaymentValid}
              />
              <div className="flex gap-3 mt-6">
                <Button variant="ghost" onClick={() => setStep(1)}>
                  <ChevronLeft size={15} /> Back
                </Button>
                <Button variant="primary" className="flex-1 justify-center" disabled={!paymentValid} onClick={() => setStep(3)}>
                  Review Order →
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-display text-xl font-semibold text-sapphire mb-6">Review Your Order</h2>

              <div className="mb-6">
                <div className="text-xs font-bold uppercase tracking-wide text-sapphire/50 mb-2">Ship To</div>
                <p className="text-sm text-ink/70 leading-relaxed">
                  {contact.fullName} · {contact.phone}<br />
                  {address.houseNo}, {address.street}
                  {address.landmark && `, near ${address.landmark}`}<br />
                  {location.city}, {location.country}
                  {address.postalCode && ` — ${address.postalCode}`}
                </p>
              </div>

              <div className="mb-6">
                <div className="text-xs font-bold uppercase tracking-wide text-sapphire/50 mb-2">Payment</div>
                <p className="text-sm text-ink/70">
                  {paymentMethod === "cod" ? "Cash on Delivery" : paymentMethod === "wallet" ? "Luxe Pay Wallet" : `Card ending in ${card.number.slice(-4) || "••••"}`}
                </p>
              </div>

              <div className="mb-6 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wide text-sapphire/50 mb-2">Items</div>
                {items.map((item) => (
                  <div key={`${item.productId}-${item.variant}`} className="flex items-center gap-3">
                    <div className="w-12 h-12 flex-shrink-0">
                      <ItemThumb item={item} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13.5px] font-medium text-sapphire truncate">{item.name}</div>
                      <div className="text-[11px] text-ink/45">Qty {item.qty}{item.variant && ` · ${item.variant}`}</div>
                    </div>
                    <div className="font-mono text-[13px] text-sapphire">${(item.price * item.qty).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="ghost" onClick={() => setStep(2)}>
                  <ChevronLeft size={15} /> Back
                </Button>
                <Button variant="gold" className="flex-1 justify-center" onClick={handlePlaceOrder} disabled={processing}>
                  {processing ? "Processing..." : `Place Order — $${total.toFixed(2)}`}
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="relative bg-sapphire text-ivory p-7 h-fit sticky top-24 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold via-amethyst-light to-gold" />
          <h2 className="font-display text-xl font-semibold mb-6">Order Total</h2>
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
          <div className="flex justify-between items-baseline border-t border-ivory/15 pt-5 mb-6">
            <span className="font-semibold">Total</span>
            <span className="font-mono text-2xl font-bold text-gold-light">${total.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-ivory/50">
            <ShieldCheck size={13} /> Secure simulated checkout · No real charges
          </div>
        </div>
      </div>

      <ProcessingModal open={processing} />
    </div>
  );
}
