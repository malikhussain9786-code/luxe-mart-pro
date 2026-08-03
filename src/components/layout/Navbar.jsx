import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Menu, Search } from "lucide-react";
import { useCart } from "../../context/CartContext.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { IconButton, Button } from "../ui/index.js";
import { categories } from "../../data/categories.js";
import MegaMenu from "./MegaMenu.jsx";
import BrandSwitcher from "./BrandSwitcher.jsx";
import SearchBar from "./SearchBar.jsx";
import MobileMenu from "./MobileMenu.jsx";
import AccountMenu from "./AccountMenu.jsx";
import Logo from "./Logo.jsx";

export default function Navbar() {
  const { itemCount } = useCart();
  const { count: wishCount } = useWishlist();
  const { isProfileComplete } = useAuth();
  const [hoveredCat, setHoveredCat] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [cartPulsing, setCartPulsing] = useState(false);
  const prevCount = useRef(itemCount);

  useEffect(() => {
    if (itemCount > prevCount.current) {
      setCartPulsing(true);
      const t = setTimeout(() => setCartPulsing(false), 500);
      prevCount.current = itemCount;
      return () => clearTimeout(t);
    }
    prevCount.current = itemCount;
  }, [itemCount]);

  return (
    <nav
      className="sticky top-0 z-50 bg-ivory border-b border-sapphire/10 backdrop-blur"
      onMouseLeave={() => setHoveredCat(null)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-4 md:py-5 flex items-center justify-between gap-4 md:gap-8">
        <button className="lg:hidden flex-shrink-0" onClick={() => setMobileOpen(true)} aria-label="Open menu" title="Menu">
          <Menu size={22} className="text-sapphire" />
        </button>

        <Link to="/" className="font-display text-lg sm:text-2xl font-semibold flex items-center gap-2.5 text-sapphire flex-shrink-0">
          <Logo size={32} />
          <span>Luxe Mart <span className="text-gold">Pro</span></span>
        </Link>

        <div className="hidden lg:flex items-center gap-6 text-sm font-semibold flex-shrink-0 whitespace-nowrap">
          <Link to="/" className="hover:text-amethyst transition">Home</Link>
          {categories.map((cat) => (
            <div key={cat.id} onMouseEnter={() => setHoveredCat(cat.id)} className="py-2">
              <Link
                to={`/category/${cat.slug}`}
                className={`relative pb-1 transition ${hoveredCat === cat.id ? "text-amethyst" : "hover:text-amethyst"}`}
              >
                {cat.name}
                <span
                  className={`absolute left-0 -bottom-0.5 h-0.5 bg-gold transition-all ${hoveredCat === cat.id ? "w-full" : "w-0"}`}
                />
              </Link>
            </div>
          ))}
          <BrandSwitcher />
        </div>

        <div className="flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
          <div className="hidden md:block">
            <SearchBar />
          </div>
          <button className="md:hidden" onClick={() => setMobileSearchOpen((v) => !v)} aria-label="Toggle search" title="Search">
            <Search size={20} className="text-sapphire" />
          </button>
          <Link to="/wishlist" className="hidden xsm:block">
            <IconButton as="span" icon={Heart} badge={wishCount} title="Wishlist" />
          </Link>
          <Link to="/cart" className={`relative ${cartPulsing ? "cart-pulse" : ""}`}>
            <IconButton as="span" icon={ShoppingBag} badge={itemCount} title="Shopping Cart" />
          </Link>
          {isProfileComplete ? (
            <AccountMenu />
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link to="/login" className="text-[13px] sm:text-sm font-bold text-sapphire hover:text-amethyst transition px-1 sm:px-2 whitespace-nowrap">
                Sign In
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm" className="!px-3 sm:!px-4 whitespace-nowrap">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {mobileSearchOpen && (
        <div className="md:hidden px-4 sm:px-6 pb-4">
          <SearchBar mobile />
        </div>
      )}

      {hoveredCat && <MegaMenu activeCategoryId={hoveredCat} onClose={() => setHoveredCat(null)} />}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </nav>
  );
}
