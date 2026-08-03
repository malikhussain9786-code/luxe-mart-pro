import { ShieldCheck } from "lucide-react";
import { Modal } from "../ui/index.js";

export default function ProcessingModal({ open }) {
  return (
    <Modal open={open} onClose={() => {}} maxWidth="max-w-xs">
      <div className="text-center py-4">
        <div className="w-14 h-14 rounded-full border-4 border-amethyst/20 border-t-amethyst animate-spin mx-auto mb-6" />
        <h3 className="font-display text-lg font-semibold text-sapphire mb-2">Processing Payment</h3>
        <p className="text-xs text-ink/50 flex items-center justify-center gap-1.5">
          <ShieldCheck size={13} /> Securely simulating transaction...
        </p>
      </div>
    </Modal>
  );
}
