export default function CardPreview({ cardNumber, cardName, expiry }) {
  const display = cardNumber ? cardNumber.padEnd(19, "•") : "•••• •••• •••• ••••";
  return (
    <div className="w-full max-w-sm h-52 rounded-2xl bg-gradient-to-br from-sapphire via-sapphire-2 to-amethyst p-6 text-white shadow-lux relative overflow-hidden mb-6">
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gold/20 blur-2xl" />
      <div className="flex justify-between items-start relative">
        <span className="font-display text-lg font-semibold">Luxe Mart Pro</span>
        <span className="w-10 h-7 rounded bg-gold-light/90" />
      </div>
      <div className="font-mono text-xl tracking-[0.15em] mt-10 relative">{display}</div>
      <div className="flex justify-between items-end mt-7 relative">
        <div>
          <div className="text-[9px] uppercase tracking-wide text-white/50 mb-1">Card Holder</div>
          <div className="text-sm font-medium uppercase">{cardName || "Your Name"}</div>
        </div>
        <div>
          <div className="text-[9px] uppercase tracking-wide text-white/50 mb-1">Expires</div>
          <div className="text-sm font-mono">{expiry || "MM/YY"}</div>
        </div>
      </div>
    </div>
  );
}
