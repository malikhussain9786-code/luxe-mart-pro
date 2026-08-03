const variants = {
  primary:
    "bg-gradient-to-br from-[#FF9A3E] to-[#E67E22] text-white shadow-[0_14px_30px_-10px_rgba(230,126,34,0.55)] hover:-translate-y-0.5",
  ghost:
    "bg-transparent text-sapphire border-[1.5px] border-sapphire hover:bg-sapphire hover:text-ivory",
  gold:
    "bg-gradient-to-br from-gold-light to-gold text-sapphire hover:-translate-y-0.5",
  amethyst:
    "bg-gradient-to-br from-amethyst to-[#4E2A80] text-ivory shadow-[0_14px_30px_-10px_rgba(110,58,168,0.55)] hover:-translate-y-0.5",
  dark:
    "bg-sapphire text-ivory hover:bg-sapphire-2",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  as: Tag = "button",
  ...props
}) {
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-7 py-3.5 text-sm",
    lg: "px-9 py-4 text-base",
  };
  return (
    <Tag
      className={`inline-flex items-center gap-2 font-bold tracking-wide transition-all duration-200 cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
