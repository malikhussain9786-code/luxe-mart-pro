import { useState } from "react";
import { Star } from "lucide-react";
import { useOrders } from "../../context/OrderContext.jsx";
import { useReviews } from "../../context/ReviewContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { Button } from "../ui/index.js";

export default function WriteReviewForm({ product, onSubmitted }) {
  const { orders } = useOrders();
  const { addReview } = useReviews();
  const { profile } = useAuth();
  const [stars, setStars] = useState(0);
  const [hoverStars, setHoverStars] = useState(0);
  const [comment, setComment] = useState("");

  const isVerifiedPurchase = orders.some((o) => o.items.some((i) => i.productId === product.id));

  function handleSubmit(e) {
    e.preventDefault();
    if (stars === 0 || comment.trim().length < 5) return;
    addReview(product.id, {
      stars,
      comment: comment.trim(),
      name: profile.fullName || "Anonymous Shopper",
      verified: isVerifiedPurchase,
    });
    setStars(0);
    setComment("");
    onSubmitted?.();
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-sapphire/10 p-6">
      <h3 className="font-semibold text-sapphire text-[15px] mb-4">Write a Review</h3>
      {isVerifiedPurchase && (
        <div className="text-[11px] text-emerald font-bold mb-4">✓ You've purchased this item — your review will be marked Verified Purchase</div>
      )}
      <div className="flex gap-1.5 mb-4">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onMouseEnter={() => setHoverStars(n)}
            onMouseLeave={() => setHoverStars(0)}
            onClick={() => setStars(n)}
            aria-label={`Rate ${n} stars`}
          >
            <Star
              size={24}
              className={(hoverStars || stars) >= n ? "fill-gold text-gold" : "text-sapphire/15"}
            />
          </button>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience with this product..."
        rows={3}
        className="w-full border border-sapphire/15 px-4 py-3 text-sm focus:outline-none focus:border-amethyst transition mb-4 resize-none"
      />
      <Button variant="primary" size="sm" type="submit" disabled={stars === 0 || comment.trim().length < 5}>
        Submit Review
      </Button>
    </form>
  );
}
