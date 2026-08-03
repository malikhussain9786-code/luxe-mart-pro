export default function Logo({ size = 32, className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center flex-shrink-0 rounded-full bg-gradient-to-br from-sapphire to-sapphire-2 border border-gold/40 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 24 24" width={size * 0.56} height={size * 0.56} fill="none">
        <path
          d="M4 18 V6 L9 15 L14 6 V18 M17 6 V18 H21"
          stroke="#E4C989"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
