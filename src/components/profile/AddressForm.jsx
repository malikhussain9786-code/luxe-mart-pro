import { useState } from "react";
import { Input, Button } from "../ui/index.js";
import CountryCitySelect from "../ui/CountryCitySelect.jsx";

export default function AddressForm({ onSave, onCancel }) {
  const [label, setLabel] = useState("Home");
  const [location, setLocation] = useState({ country: "", city: "" });
  const [street, setStreet] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [landmark, setLandmark] = useState("");

  const valid = location.country && location.city && street && houseNo;

  function handleSave() {
    onSave({ label, ...location, street, houseNo, landmark });
  }

  return (
    <div className="bg-ivory-2 border border-sapphire/10 p-6 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Address Label" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="e.g. Home, Office" />
      </div>
      <CountryCitySelect value={location} onChange={setLocation} />
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Street Address" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="e.g. Main Boulevard" />
        <Input label="House / Apartment No." value={houseNo} onChange={(e) => setHouseNo(e.target.value)} placeholder="e.g. House 24-B" />
      </div>
      <Input label="Nearest Landmark (optional)" value={landmark} onChange={(e) => setLandmark(e.target.value)} placeholder="e.g. Near City Mall" />
      <div className="flex gap-3 pt-2">
        <Button variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
        <Button variant="primary" size="sm" disabled={!valid} onClick={handleSave}>Save Address</Button>
      </div>
    </div>
  );
}
