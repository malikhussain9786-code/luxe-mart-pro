import { Link } from "react-router-dom";
import { Compass } from "lucide-react";
import { Button } from "../../components/ui/index.js";

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-6 py-28 text-center">
      <div className="w-16 h-16 rounded-full bg-ivory-2 flex items-center justify-center mx-auto mb-6">
        <Compass size={26} className="text-sapphire/40" />
      </div>
      <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-amethyst">Error 404</span>
      <h1 className="font-display text-4xl text-sapphire font-semibold mt-3 mb-3">Page Not Found</h1>
      <p className="text-ink/55 text-sm mb-8">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Button as={Link} to="/" variant="primary">Back to Home →</Button>
    </div>
  );
}
