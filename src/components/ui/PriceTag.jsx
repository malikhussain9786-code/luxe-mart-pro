export default function PriceTag({ price, comparePrice, currency = "$", size = "md" }) {
  const sizes = {
    sm: "text-sm",
    md: "text-[17px]",
    lg: "text-2xl",
  };
  return (
    <div className="flex items-baseline gap-2.5 font-mono">
      <span className={`font-semibold text-sapphire ${sizes[size]}`}>
        {currency}
        {price.toFixed(2)}
      </span>
      {comparePrice && comparePrice > price && (
        <span className="text-xs text-ink/35 line-through">
          {currency}
          {comparePrice.toFixed(2)}
        </span>
      )}
    </div>
  );
}
