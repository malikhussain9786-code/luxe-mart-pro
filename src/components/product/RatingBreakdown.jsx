export default function RatingBreakdown({ reviews, averageRating, totalCount }) {
  const counts = [5, 4, 3, 2, 1].map((star) => reviews.filter((r) => Math.round(r.stars) === star).length);
  const max = Math.max(1, ...counts);

  return (
    <div className="flex flex-col sm:flex-row gap-8 items-start bg-ivory-2 border border-sapphire/10 p-6">
      <div className="text-center flex-shrink-0 sm:w-32">
        <div className="font-display text-4xl font-bold text-sapphire">{averageRating.toFixed(1)}</div>
        <div className="text-gold text-sm my-1.5">{"★".repeat(Math.round(averageRating))}{"☆".repeat(5 - Math.round(averageRating))}</div>
        <div className="text-xs text-ink/50">{totalCount} review{totalCount !== 1 ? "s" : ""}</div>
      </div>
      <div className="flex-1 w-full space-y-1.5">
        {[5, 4, 3, 2, 1].map((star, i) => (
          <div key={star} className="flex items-center gap-3 text-xs">
            <span className="w-8 text-ink/55 font-medium">{star} ★</span>
            <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold to-amethyst-light rounded-full"
                style={{ width: `${(counts[i] / max) * 100}%` }}
              />
            </div>
            <span className="w-6 text-right text-ink/40 font-mono">{counts[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
