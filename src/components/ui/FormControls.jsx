export function IconButton({ icon: Icon, badge, size = 20, className = "", as: Tag = "button", title, ...props }) {
  return (
    <Tag className={`relative inline-flex ${className}`} title={title} aria-label={title} {...props}>
      <Icon size={size} />
      {badge > 0 && (
        <span className="absolute -top-2 -right-2 bg-ruby text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </Tag>
  );
}

export function Input({ label, className = "", ...props }) {
  return (
    <label className="block">
      {label && <span className="block text-xs font-semibold text-sapphire/70 mb-1.5">{label}</span>}
      <input
        className={`w-full border border-sapphire/15 px-4 py-3 text-sm bg-white focus:outline-none focus:border-amethyst transition ${className}`}
        {...props}
      />
    </label>
  );
}

export function Select({ label, children, className = "", ...props }) {
  return (
    <label className="block">
      {label && <span className="block text-xs font-semibold text-sapphire/70 mb-1.5">{label}</span>}
      <select
        className={`w-full border border-sapphire/15 px-4 py-3 text-sm bg-white focus:outline-none focus:border-amethyst transition ${className}`}
        {...props}
      >
        {children}
      </select>
    </label>
  );
}
