import { useEffect } from "react";
import { CreditCard, Wallet, Truck, Lock } from "lucide-react";
import { Input } from "../ui/index.js";
import CardPreview from "./CardPreview.jsx";

function formatCardNumber(v) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(v) {
  const digits = v.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

const methods = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard, desc: "Visa, Mastercard, Amex" },
  { id: "wallet", label: "Luxe Pay Wallet", icon: Wallet, desc: "Instant, PIN-protected" },
  { id: "cod", label: "Cash on Delivery", icon: Truck, desc: "Pay when it arrives" },
];

export default function PaymentForm({ paymentMethod, setPaymentMethod, card, setCard, wallet, setWallet, onValidChange }) {
  const cardValid =
    paymentMethod !== "card" ||
    (card.number.replace(/\s/g, "").length === 16 && card.name.trim().length > 1 && card.expiry.length === 5 && card.cvv.length === 3);
  const walletValid = paymentMethod !== "wallet" || wallet.pin.length === 4;
  const valid = cardValid && walletValid;

  useEffect(() => onValidChange?.(valid), [valid]);

  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        {methods.map((m) => {
          const Icon = m.icon;
          const active = paymentMethod === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setPaymentMethod(m.id)}
              className={`text-left border px-4 py-4 transition ${active ? "border-amethyst bg-amethyst/5" : "border-sapphire/15 hover:border-sapphire/30"}`}
            >
              <Icon size={18} className={active ? "text-amethyst" : "text-sapphire/50"} />
              <div className="text-sm font-semibold text-sapphire mt-2.5">{m.label}</div>
              <div className="text-[11px] text-ink/45 mt-0.5">{m.desc}</div>
            </button>
          );
        })}
      </div>

      {paymentMethod === "card" && (
        <div>
          <CardPreview cardNumber={card.number} cardName={card.name} expiry={card.expiry} />
          <div className="grid gap-4">
            <Input
              label="Card Number"
              value={card.number}
              onChange={(e) => setCard({ ...card, number: formatCardNumber(e.target.value) })}
              placeholder="1234 5678 9012 3456"
              inputMode="numeric"
            />
            <Input
              label="Cardholder Name"
              value={card.name}
              onChange={(e) => setCard({ ...card, name: e.target.value })}
              placeholder="As shown on card"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiry Date"
                value={card.expiry}
                onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                placeholder="MM/YY"
                inputMode="numeric"
              />
              <Input
                label="CVV"
                value={card.cvv}
                onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) })}
                placeholder="123"
                inputMode="numeric"
                type="password"
              />
            </div>
          </div>
        </div>
      )}

      {paymentMethod === "wallet" && (
        <div className="bg-ivory-2 border border-sapphire/10 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-xs text-ink/50">Luxe Pay Balance</div>
              <div className="font-display text-2xl text-sapphire font-semibold">$1,240.00</div>
            </div>
            <Wallet size={30} className="text-amethyst" />
          </div>
          <Input
            label="Wallet PIN"
            type="password"
            value={wallet.pin}
            onChange={(e) => setWallet({ pin: e.target.value.replace(/\D/g, "").slice(0, 4) })}
            placeholder="4-digit PIN"
            inputMode="numeric"
          />
        </div>
      )}

      {paymentMethod === "cod" && (
        <div className="bg-ivory-2 border border-sapphire/10 p-6 flex items-start gap-4">
          <Truck size={24} className="text-amethyst flex-shrink-0 mt-0.5" />
          <p className="text-sm text-ink/65 leading-relaxed">
            Pay in cash when your order is delivered. A small handling fee may apply for cash payments
            on orders under $50 in this simulated flow.
          </p>
        </div>
      )}

      <div className="flex items-center gap-2 text-[11.5px] text-ink/45 mt-6">
        <Lock size={13} /> This is a simulated payment — no real transaction is processed, and no card data is stored.
      </div>
    </div>
  );
}
