import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { generateDemoReviews } from "../../data/demoReviews.js";
import { useReviews } from "../../context/ReviewContext.jsx";
import RatingBreakdown from "./RatingBreakdown.jsx";
import WriteReviewForm from "./WriteReviewForm.jsx";
import { Button } from "../ui/index.js";

export default function ProductReviews({ product }) {
  const { getUserReviews } = useReviews();
  const [showForm, setShowForm] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);

  const demoReviews = generateDemoReviews(product, 3);
  const userReviews = getUserReviews(product.id);
  const allReviews = [...userReviews, ...demoReviews];

  const averageRating =
    allReviews.reduce((sum, r) => sum + r.stars, 0) / (allReviews.length || 1);

  return (
    <div id="reviews" className="scroll-mt-24">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="font-display text-2xl font-semibold text-sapphire">Customer Reviews</h2>
        {!showForm && (
          <Button variant="ghost" size="sm" onClick={() => setShowForm(true)}>
            Write a Review
          </Button>
        )}
      </div>

      <div className="mb-8">
        <RatingBreakdown reviews={allReviews} averageRating={averageRating} totalCount={allReviews.length} />
      </div>

      {showForm && (
        <div className="mb-8">
          <WriteReviewForm
            product={product}
            onSubmitted={() => {
              setShowForm(false);
              setJustSubmitted(true);
              setTimeout(() => setJustSubmitted(false), 3000);
            }}
          />
        </div>
      )}

      {justSubmitted && (
        <div className="flex items-center gap-2 text-emerald text-sm font-semibold mb-6">
          <CheckCircle2 size={16} /> Thanks — your review has been posted.
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-5">
        {allReviews.map((r) => (
          <div key={r.id} className="bg-white border border-sapphire/10 p-6">
            <div className="text-gold text-sm mb-2.5">{"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}</div>
            <p className="text-[13.5px] leading-relaxed text-ink/70 mb-4">{r.comment}</p>
            <div className="text-[13px] font-bold text-sapphire">{r.name}</div>
            {r.location && <div className="text-[11px] text-ink/45">{r.location}</div>}
            {r.verified && <div className="text-[10.5px] text-emerald font-bold mt-1">✓ Verified Purchase</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
