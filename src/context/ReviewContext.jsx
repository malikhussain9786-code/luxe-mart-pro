import { createContext, useContext, useState, useEffect } from "react";

const ReviewContext = createContext(null);
const STORAGE_KEY = "lmp_reviews";

function loadReviews() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function ReviewProvider({ children }) {
  const [reviewsByProduct, setReviewsByProduct] = useState(loadReviews);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviewsByProduct));
    } catch {
      // storage unavailable — demo continues without persistence
    }
  }, [reviewsByProduct]);

  function addReview(productId, review) {
    const entry = {
      id: `user-review-${Date.now()}`,
      stars: review.stars,
      comment: review.comment,
      name: review.name || "Anonymous Shopper",
      location: review.location || "",
      verified: review.verified,
      submittedAt: new Date().toISOString(),
    };
    setReviewsByProduct((prev) => ({
      ...prev,
      [productId]: [entry, ...(prev[productId] || [])],
    }));
    return entry;
  }

  function getUserReviews(productId) {
    return reviewsByProduct[productId] || [];
  }

  return (
    <ReviewContext.Provider value={{ addReview, getUserReviews }}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  const ctx = useContext(ReviewContext);
  if (!ctx) throw new Error("useReviews must be used within ReviewProvider");
  return ctx;
}
