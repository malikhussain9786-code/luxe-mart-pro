import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function SectionHeading({ eyebrow, title, viewAllHref, viewAllLabel = "View all", dark = false }) {
  return (
    <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
      <div>
        {eyebrow && (
          <span className={`font-mono text-[11px] tracking-[0.18em] uppercase font-medium ${dark ? "text-gold-light" : "text-amethyst"}`}>
            {eyebrow}
          </span>
        )}
        <h2 className={`font-display text-3xl md:text-4xl font-semibold mt-2 ${dark ? "text-white" : "text-sapphire"}`}>
          {title}
        </h2>
      </div>
      {viewAllHref && (
        <Link
          to={viewAllHref}
          className={`text-sm font-bold flex items-center gap-1.5 ${dark ? "text-gold-light" : "text-amethyst"} hover:gap-2.5 transition-all`}
        >
          {viewAllLabel} <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}
