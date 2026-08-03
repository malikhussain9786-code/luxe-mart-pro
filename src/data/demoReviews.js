const reviewerPool = [
  { name: "Amina R.", location: "Dubai, UAE" },
  { name: "Daniyal K.", location: "Islamabad, PK" },
  { name: "Sofia L.", location: "Singapore" },
  { name: "James O.", location: "London, UK" },
  { name: "Layla H.", location: "Riyadh, SA" },
  { name: "Marco B.", location: "Milan, IT" },
];

const commentPool = [
  "Exactly as described, and the finish feels genuinely premium in hand.",
  "Fast simulated checkout and the tracking updates felt very realistic.",
  "Fit true to size. Would order from this brand again.",
  "The material quality exceeded what I expected at this price point.",
  "Packaging and presentation felt like a real luxury unboxing.",
  "Color in person matches the product photos closely.",
];

function seeded(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function generateDemoReviews(product, count = 3) {
  return Array.from({ length: count }).map((_, i) => {
    const seed = product.id.length * 13 + i * 5;
    const reviewer = reviewerPool[Math.floor(seeded(seed) * reviewerPool.length)];
    const comment = commentPool[Math.floor(seeded(seed + 1) * commentPool.length)];
    const stars = Math.max(3, Math.round(product.rating - i * 0.3));
    return {
      id: `${product.id}-demo-review-${i}`,
      name: reviewer.name,
      location: reviewer.location,
      comment,
      stars,
      verified: true,
      submittedAt: null,
    };
  });
}
