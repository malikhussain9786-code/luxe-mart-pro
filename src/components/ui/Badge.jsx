const tones = {
  ruby: "bg-ruby text-white",
  gold: "bg-gold text-sapphire",
  emerald: "bg-emerald text-white",
  sapphire: "bg-sapphire text-ivory",
  outline: "border border-sapphire/20 text-sapphire bg-white",
};

export default function Badge({ children, tone = "gold", className = "" }) {
  return (
    <span
      className={`inline-block text-[10.5px] font-bold tracking-wide uppercase px-2.5 py-1 ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
