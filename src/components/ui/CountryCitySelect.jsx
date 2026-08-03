import { useState, useEffect } from "react";
import { countries, getCitiesForCountry } from "../../data/countries.js";

/**
 * CountryCitySelect — cascading dropdown covering all 195 countries.
 * City list updates automatically when country changes.
 * Controlled component: pass value + onChange({ country, city }).
 */
export default function CountryCitySelect({ value, onChange }) {
  const [country, setCountry] = useState(value?.country || "");
  const [city, setCity] = useState(value?.city || "");
  const cities = country ? getCitiesForCountry(country) : [];

  useEffect(() => {
    onChange({ country, city });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country, city]);

  function handleCountryChange(code) {
    setCountry(code);
    setCity(""); // reset city whenever country changes
  }

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <label className="block">
        <span className="block text-xs font-semibold text-sapphire/70 mb-1.5">Country</span>
        <select
          value={country}
          onChange={(e) => handleCountryChange(e.target.value)}
          className="w-full border border-sapphire/15 px-4 py-3 text-sm bg-white focus:outline-none focus:border-amethyst transition"
          required
        >
          <option value="">Select country ({countries.length})</option>
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="block text-xs font-semibold text-sapphire/70 mb-1.5">City</span>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={!country}
          className="w-full border border-sapphire/15 px-4 py-3 text-sm bg-white focus:outline-none focus:border-amethyst transition disabled:bg-ivory-2 disabled:text-ink/35"
          required
        >
          <option value="">{country ? "Select city" : "Select country first"}</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
