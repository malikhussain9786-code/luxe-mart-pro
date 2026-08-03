import { useState } from "react";
import { Input, Button } from "../ui/index.js";

function formatCardNumber(v) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(v) {
  const digits = v.replace(/\D/g, "").slice(0, 4);
  return digits.length <= 2 ? digits : `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function CardForm({ onSave, onCancel }) {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");

  const valid = number.replace(/\s/g, "").length === 16 && name.trim().length > 1 && expiry.length === 5;

  function handleSave() {
    // Demo only: we never persist a full card number, only a masked last-4.
    onSave({ last4: number.replace(/\s/g, "").slice(-4), name, expiry, network: "Card" });
  }

  return (
    <div className="bg-ivory-2 border border-sapphire/10 p-6 space-y-4">
      <Input label="Card Number" value={number} onChange={(e) => setNumber(formatCardNumber(e.target.value))} placeholder="1234 5678 9012 3456" inputMode="numeric" />
      <Input label="Cardholder Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="As shown on card" />
      <Input label="Expiry Date" value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))} placeholder="MM/YY" inputMode="numeric" />
      <p className="text-[11px] text-ink/40">Demo only — only the last 4 digits are ever saved. Full numbers are never stored.</p>
      <div className="flex gap-3 pt-2">
        <Button variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
        <Button variant="primary" size="sm" disabled={!valid} onClick={handleSave}>Save Card</Button>
      </div>
    </div>
  );
}
