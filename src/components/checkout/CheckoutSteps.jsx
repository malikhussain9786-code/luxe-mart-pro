import { Check } from "lucide-react";

const steps = ["Shipping", "Payment", "Review"];

export default function CheckoutSteps({ current }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-12">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const done = stepNum < current;
        const active = stepNum === current;
        return (
          <div key={label} className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  done
                    ? "bg-emerald text-white"
                    : active
                    ? "bg-amethyst text-white"
                    : "bg-ivory-2 text-ink/40"
                }`}
              >
                {done ? <Check size={14} /> : stepNum}
              </div>
              <span className={`text-sm font-semibold ${active ? "text-sapphire" : done ? "text-ink/60" : "text-ink/35"}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && <div className="w-10 h-px bg-sapphire/15" />}
          </div>
        );
      })}
    </div>
  );
}
