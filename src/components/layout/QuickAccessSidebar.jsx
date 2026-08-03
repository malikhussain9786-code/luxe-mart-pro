import { Link, useLocation } from "react-router-dom";
import { Home, LayoutGrid, Search, Heart, ShoppingBag, User, Store } from "lucide-react";
import { useCart } from "../../context/CartContext.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import Logo from "./Logo.jsx";

function RailButton({ to, icon: Icon, label, badge, active }) {
  return (
    <Link
      to={to}
      title={label}
      aria-label={label}
      className={`relative flex flex-col items-center gap-1 py-3 w-full transition-colors group ${
        active ? "text-amethyst" : "text-sapphire/55 hover:text-amethyst"
      }`}
    >
      <span className="relative">
        <Icon size={19} strokeWidth={active ? 2.2 : 1.8} />
        {badge > 0 && (
          <span className="absolute -top-1.5 -right-2 bg-ruby text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {badge}
          </span>
        )}
      </span>
      <span className="text-[9px] font-semibold leading-none">{label}</span>
      {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-amethyst rounded-r" />}
    </Link>
  );
}

export default function QuickAccessSidebar() {
  const { itemCount } = useCart();
  const { count: wishCount } = useWishlist();
  const { isProfileComplete } = useAuth();
  const { pathname } = useLocation();

  return (
    <aside className="hidden lg:flex flex-col items-center w-16 flex-shrink-0 bg-white border-r border-sapphire/10 sticky top-0 h-screen py-4">
      <Link to="/" title="Home" aria-label="Home" className="mb-6">
        <Logo size={32} />
      </Link>
      <div className="flex flex-col items-center w-full flex-1">
        <RailButton to="/" icon={Home} label="Home" active={pathname === "/"} />
        <RailButton to="/category/mens-fashion" icon={LayoutGrid} label="Shop" active={pathname.startsWith("/category")} />
        <RailButton to="/brands" icon={Store} label="Brands" active={pathname.startsWith("/brand")} />
        <RailButton to="/search" icon={Search} label="Search" active={pathname === "/search"} />
        <RailButton to="/wishlist" icon={Heart} label="Wishlist" badge={wishCount} active={pathname === "/wishlist"} />
        <RailButton to="/cart" icon={ShoppingBag} label="Cart" badge={itemCount} active={pathname === "/cart"} />
      </div>
      <RailButton
        to={isProfileComplete ? "/profile" : "/login"}
        icon={User}
        label={isProfileComplete ? "Profile" : "Sign In"}
        active={pathname === "/profile" || pathname === "/login" || pathname === "/register"}
      />
    </aside>
  );
}
