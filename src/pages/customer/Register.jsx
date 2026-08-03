import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Phone, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { Button, Input } from "../../components/ui/index.js";
import Logo from "../../components/layout/Logo.jsx";
import CountryCitySelect from "../../components/ui/CountryCitySelect.jsx";

export default function Register() {
  const { updateProfile, addAddress } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState({ country: "", city: "" });
  const [street, setStreet] = useState("");
  const [houseNo, setHouseNo] = useState("");

  const addressValid = location.country && location.city && street && houseNo;

  function handleSubmit(e) {
    e.preventDefault();
    updateProfile({ fullName, email, phone });
    if (addressValid) {
      addAddress({ label: "Home", ...location, street, houseNo, landmark: "" });
    }
    navigate("/profile");
  }

  return (
    <div className="min-h-[80vh] grid lg:grid-cols-2">
      {/* Luxury visual side */}
      <div
        className="hidden lg:flex flex-col justify-between p-14 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #14213D 0%, #1E3054 55%, #2A2013 100%)" }}
      >
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-24 w-96 h-96 rounded-full bg-gold/12 blur-3xl" />
        <Link to="/" className="font-display text-2xl font-semibold text-white flex items-center gap-2.5 relative z-10">
          <Logo size={34} />
          Luxe Mart <span className="text-gold-light">Pro</span>
        </Link>
        <div className="relative z-10">
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-gold-light">Members enjoy</span>
          <h2 className="font-display text-4xl font-semibold text-white mt-3 mb-8 leading-tight">
            Curated luxury,<br />195 countries,<br />one seamless account.
          </h2>
          <ul className="space-y-5">
            <li className="flex items-start gap-3 text-white/75 text-sm">
              <Sparkles size={17} className="text-gold-light mt-0.5 flex-shrink-0" /> Saved addresses across 195 countries for faster checkout
            </li>
            <li className="flex items-start gap-3 text-white/75 text-sm">
              <ShieldCheck size={17} className="text-gold-light mt-0.5 flex-shrink-0" /> Secure simulated checkout, receipts saved to your account
            </li>
            <li className="flex items-start gap-3 text-white/75 text-sm">
              <MapPin size={17} className="text-gold-light mt-0.5 flex-shrink-0" /> Real-time order tracking from every demo brand
            </li>
          </ul>
        </div>
        <p className="text-white/40 text-xs relative z-10">© 2026 Luxe Mart Pro — Portfolio Demo Project</p>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center px-6 py-14">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-amethyst">Join us</span>
            <h1 className="font-display text-3xl text-sapphire font-semibold mt-2">Create Your Account</h1>
            <p className="text-ink/50 text-sm mt-2">Simulated registration — set up your profile and delivery address.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="relative">
                <User size={16} className="absolute left-4 top-[38px] text-ink/30 pointer-events-none" />
                <Input label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" className="pl-10" required />
              </div>
              <div className="relative">
                <Phone size={16} className="absolute left-4 top-[38px] text-ink/30 pointer-events-none" />
                <Input label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+92 300 1234567" className="pl-10" />
              </div>
            </div>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-[38px] text-ink/30 pointer-events-none" />
              <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="pl-10" required />
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-[38px] text-ink/30 pointer-events-none" />
              <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-10" required />
            </div>

            <div className="pt-2 border-t border-sapphire/10">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-sapphire/60 mt-5 mb-3">
                <MapPin size={13} /> Delivery Address <span className="font-normal normal-case text-ink/35">(optional, saved to your profile)</span>
              </div>
              <div className="mb-4">
                <CountryCitySelect value={location} onChange={setLocation} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Street Address" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="e.g. Main Boulevard" />
                <Input label="House / Apartment No." value={houseNo} onChange={(e) => setHouseNo(e.target.value)} placeholder="e.g. House 24-B" />
              </div>
            </div>

            <Button variant="primary" type="submit" className="w-full justify-center mt-2">
              Create Account →
            </Button>
          </form>

          <p className="text-center text-sm text-ink/50 mt-6">
            Already have an account? <Link to="/login" className="text-amethyst font-bold">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
