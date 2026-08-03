import { SectionHeading } from "../ui/index.js";

// Initials avatars — no external image dependency, so these can never
// fail to load or show the wrong picture.
const reviews = [
  {
    stars: 5,
    text: "The checkout felt genuinely premium — real-time tracking, clean receipts, and the single-brand cart rule actually makes sense once you see it in action.",
    name: "Amina R.",
    location: "Dubai, UAE",
    initials: "AR",
  },
  {
    stars: 5,
    text: "Product photography and detail pages feel like a real luxury retailer, not a demo. The brand pages being view-only is a nice touch of realism.",
    name: "Daniyal K.",
    location: "Islamabad, PK",
    initials: "DK",
  },
  {
    stars: 4,
    text: "Loved how smooth the country and city address flow was — 195 options and it still felt fast. Receipts download instantly as PDF too.",
    name: "Sofia L.",
    location: "Singapore",
    initials: "SL",
  },
];

export default function ReviewsSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-14">
      <SectionHeading eyebrow="Trusted worldwide" title="What shoppers are saying" />
      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <div key={r.name} className="bg-white border border-sapphire/10 p-7 relative">
            <div className="text-gold text-sm mb-3">{"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}</div>
            <p className="text-[14px] leading-relaxed text-ink/70 mb-6">{r.text}</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amethyst to-sapphire text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                {r.initials}
              </div>
              <div>
                <div className="font-bold text-[13.5px] text-sapphire">{r.name}</div>
                <div className="text-[11.5px] text-ink/45">{r.location}</div>
                <div className="text-[10.5px] text-emerald font-bold mt-0.5">✓ Verified Purchase</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
