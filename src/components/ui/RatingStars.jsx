import { Star, StarHalf } from "lucide-react";

export default function RatingStars({ rating = 0, reviewCount, size = 14 }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;

  return (
    <div className="flex items-center gap-1.5 text-ink/50">
      <div className="flex text-gold">
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < full) return <Star key={i} size={size} fill="currentColor" strokeWidth={0} />;
          if (i === full && half) return <StarHalf key={i} size={size} fill="currentColor" strokeWidth={0} />;
          return <Star key={i} size={size} className="text-sapphire/15" />;
        })}
      </div>
      <span className="text-xs">
        {rating.toFixed(1)}
        {reviewCount != null && ` (${reviewCount})`}
      </span>
    </div>
  );
}
