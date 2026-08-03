import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User as UserIcon, LogIn, UserPlus, Package, Settings, ChevronDown, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function AccountMenu() {
  const [open, setOpen] = useState(false);
  const { profile, isProfileComplete, signOut } = useAuth();
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function handleSignOut() {
    signOut();
    setOpen(false);
    navigate("/");
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Account menu"
        title="Account Menu"
        className="flex items-center gap-1.5 text-sapphire hover:text-amethyst transition"
      >
        <UserIcon size={20} />
        <span className="hidden xl:inline text-[13px] font-semibold max-w-[110px] truncate">
          {isProfileComplete ? profile.fullName.split(" ")[0] : "Account"}
        </span>
        <ChevronDown size={13} className={`hidden xl:inline transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-4 w-64 bg-white border border-sapphire/10 shadow-lux py-2 z-40">
          {isProfileComplete ? (
            <div className="px-5 py-3 border-b border-sapphire/10">
              <div className="text-[13.5px] font-bold text-sapphire truncate">{profile.fullName}</div>
              <div className="text-[11px] text-ink/45 truncate">{profile.email}</div>
            </div>
          ) : (
            <div className="px-5 py-4 border-b border-sapphire/10 space-y-2.5">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 text-sm font-bold text-amethyst"
              >
                <LogIn size={15} /> Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 text-sm font-semibold text-ink/60"
              >
                <UserPlus size={15} /> Create Account
              </Link>
            </div>
          )}
          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-5 py-3 text-sm font-medium text-ink/70 hover:bg-ivory-2"
          >
            <Settings size={15} /> My Profile
          </Link>
          <Link
            to="/orders"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-5 py-3 text-sm font-medium text-ink/70 hover:bg-ivory-2"
          >
            <Package size={15} /> Order History
          </Link>
          <Link
            to="/admin"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-5 py-3 text-sm font-medium text-amethyst hover:bg-ivory-2 border-t border-sapphire/10"
          >
            <LayoutDashboard size={15} /> Admin Panel <span className="text-[10px] text-ink/35 font-normal ml-auto">(demo)</span>
          </Link>
          {isProfileComplete && (
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2.5 px-5 py-3 text-sm font-bold text-ruby hover:bg-ruby/5 border-t border-sapphire/10"
            >
              <LogOut size={15} /> Sign Out
            </button>
          )}
        </div>
      )}
    </div>
  );
}
