/**
 * CutFrame — the one signature visual motif for Luxe Mart Pro,
 * representing a faceted gem cut. Use sparingly: hero media,
 * promo banners, and standout cards only — never as a default
 * for every image on the page.
 */
export function CutFrame({ children, size = "md", className = "" }) {
  const cls = size === "sm" ? "cut-frame-sm" : "cut-frame";
  return <div className={`${cls} overflow-hidden ${className}`}>{children}</div>;
}

export function Card({ children, hover = true, className = "" }) {
  return (
    <div
      className={`bg-white shadow-[0_14px_30px_-18px_rgba(20,33,61,0.2)] overflow-hidden ${
        hover ? "transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_44px_-20px_rgba(20,33,61,0.32)]" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
