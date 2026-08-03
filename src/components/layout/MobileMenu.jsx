import { Link, useNavigate } from "react-router-dom";
import { X, ChevronRight, LogIn, UserPlus, Package, Settings, Heart, LayoutDashboard, LogOut } from "lucide-react";
import { categories } from "../../data/categories.js";
import { brands } from "../../data/brands.js";
import { useAuth } from "../../context/AuthContext.jsx";
import SearchBar from "./SearchBar.jsx";

export default function MobileMenu({ open, onClose }) {
  const { isProfileComplete, signOut } = useAuth();
  const navigate = useNavigate();
  if (!open) return null;

  function handleSignOut() {
    signOut();
    onClose();
    navigate("/");
  }

  return (
    <div className="fixed inset-0 z-[90] lg:hidden">
      <div className="absolute inset-0 bg-sapphire/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute top-0 right-0 h-full w-full max-w-sm bg-ivory shadow-lux overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-5 border-b border-sapphire/10">
          <span className="font-display text-xl font-semibold text-sapphire">Menu</span>
          <button onClick={onClose} aria-label="Close menu" title="Close Menu">
            <X size={22} className="text-sapphire" />
          </button>
        </div>

        <div className="px-6 py-5 border-b border-sapphire/10">
          <SearchBar mobile />
        </div>

        <div className="px-6 py-5 border-b border-sapphire/10 space-y-1">
          <Link to="/" onClick={onClose} className="flex items-center justify-between py-2.5 text-[15px] font-semibold text-sapphire">
            Home
          </Link>
          {!isProfileComplete ? (
            <>
              <Link to="/login" onClick={onClose} className="flex items-center gap-2.5 py-2.5 text-[15px] font-semibold text-amethyst">
                <LogIn size={16} /> Sign In
              </Link>
              <Link to="/register" onClick={onClose} className="flex items-center gap-2.5 py-2.5 text-[15px] font-semibold text-sapphire">
                <UserPlus size={16} /> Create Account
              </Link>
            </>
          ) : (
            <Link to="/profile" onClick={onClose} className="flex items-center gap-2.5 py-2.5 text-[15px] font-semibold text-sapphire">
              <Settings size={16} /> My Profile
            </Link>
          )}          <Link to="/orders" onClick={onClose} className="flex items-center gap-2.5 py-2.5 text-[15px] font-semibold text-sapphire">
            <Package size={16} /> Order History
          </Link>
          <Link to="/wishlist" onClick={onClose} className="flex items-center gap-2.5 py-2.5 text-[15px] font-semibold text-sapphire">
            <Heart size={16} /> Wishlist
          </Link>
          <Link to="/admin" onClick={onClose} className="flex items-center gap-2.5 py-2.5 text-[15px] font-semibold text-amethyst">
            <LayoutDashboard size={16} /> Admin Panel <span className="text-[10px] text-ink/35 font-normal">(demo)</span>
          </Link>
          {isProfileComplete && (
            <button onClick={handleSignOut} className="flex items-center gap-2.5 py-2.5 text-[15px] font-bold text-ruby w-full text-left">
              <LogOut size={16} /> Sign Out
            </button>
          )}
        </div>

        <div className="px-6 py-5 border-b border-sapphire/10">
          <div className="text-[11px] font-bold uppercase tracking-wide text-sapphire/50 mb-3">Shop by Category</div>
          <div className="space-y-1">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                onClick={onClose}
                className="flex items-center justify-between py-3 text-[15px] font-semibold text-sapphire border-b border-sapphire/5"
              >
                {cat.name} <ChevronRight size={16} className="text-sapphire/30" />
              </Link>
            ))}
          </div>
        </div>

        <div className="px-6 py-5">
          <div className="text-[11px] font-bold uppercase tracking-wide text-sapphire/50 mb-3">Brands</div>
          <div className="space-y-1">
            {brands.map((b) => (
              <Link
                key={b.id}
                to={`/brand/${b.slug}`}
                onClick={onClose}
                className="flex items-center gap-2.5 py-2.5 text-sm font-medium text-ink/70"
              >
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: b.accent }} />
                {b.name}
              </Link>
            ))}
          </div>
          <Link to="/brands" onClick={onClose} className="block text-sm font-bold text-amethyst mt-4">
            View all brands →
          </Link>
        </div>
      </div>
    </div>
  );
}
