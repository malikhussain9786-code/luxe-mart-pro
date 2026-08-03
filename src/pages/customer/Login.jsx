import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ShieldCheck, Sparkles, Package } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { Button, Input } from "../../components/ui/index.js";
import Logo from "../../components/layout/Logo.jsx";

export default function Login() {
  const { updateProfile } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (email) updateProfile({ email });
    navigate("/profile");
  }

  return (
    <div className="min-h-[80vh] grid lg:grid-cols-2">
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
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-gold-light">Welcome back</span>
          <h2 className="font-display text-4xl font-semibold text-white mt-3 mb-8 leading-tight">
            Your orders, receipts,<br />and addresses —<br />all in one place.
          </h2>
          <ul className="space-y-5">
            <li className="flex items-start gap-3 text-white/75 text-sm">
              <Package size={17} className="text-gold-light mt-0.5 flex-shrink-0" /> Track every order in real time
            </li>
            <li className="flex items-start gap-3 text-white/75 text-sm">
              <ShieldCheck size={17} className="text-gold-light mt-0.5 flex-shrink-0" /> Download or print receipts anytime
            </li>
            <li className="flex items-start gap-3 text-white/75 text-sm">
              <Sparkles size={17} className="text-gold-light mt-0.5 flex-shrink-0" /> Saved addresses for instant checkout
            </li>
          </ul>
        </div>
        <p className="text-white/40 text-xs relative z-10">© 2026 Luxe Mart Pro — Portfolio Demo Project</p>
      </div>

      <div className="flex items-center justify-center px-6 py-14">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-amethyst">Welcome back</span>
            <h1 className="font-display text-3xl text-sapphire font-semibold mt-2">Sign In</h1>
            <p className="text-ink/50 text-sm mt-2">This is a simulated login for demo purposes.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-[38px] text-ink/30 pointer-events-none" />
              <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="pl-10" required />
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-[38px] text-ink/30 pointer-events-none" />
              <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-10" required />
            </div>
            <Button variant="primary" type="submit" className="w-full justify-center">
              Sign In →
            </Button>
          </form>

          <p className="text-center text-sm text-ink/50 mt-6">
            Don't have an account? <Link to="/register" className="text-amethyst font-bold">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
