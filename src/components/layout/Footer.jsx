import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";

const shopLinks = [
  { label: "Men's Fashion", to: "/category/mens-fashion" },
  { label: "Women's Fashion", to: "/category/womens-fashion" },
  { label: "Shoes", to: "/category/shoes" },
  { label: "Accessories", to: "/category/accessories" },
];

const supportLinks = [
  { label: "Track Order", to: "/orders" },
  { label: "My Profile", to: "/profile" },
  { label: "Wishlist", to: "/wishlist" },
  { label: "All Brands", to: "/brands" },
  { label: "Admin Panel (demo)", to: "/admin" },
];

export default function Footer() {
  return (
    <footer className="bg-sapphire text-ivory/65 mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2">
            <Link to="/" className="font-display text-xl text-white mb-3 inline-flex items-center gap-2.5 hover:text-gold-light transition">
              <Logo size={26} />
              Luxe Mart Pro
            </Link>
            <p className="text-sm leading-relaxed max-w-xs mt-3">
              A premium full-stack demo marketplace — fashion, footwear, accessories, sport,
              and fine grocery, delivered to 195 countries with a fully simulated checkout.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              {shopLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-gold-light transition">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              {supportLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-gold-light transition">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-ivory/45">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Demo Disclosure</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row gap-2 justify-between text-xs">
          <span>© 2026 Luxe Mart Pro — Portfolio Demo Project. No real transactions processed.</span>
          <Link to="/" className="text-gold-light hover:text-white transition font-semibold">Back to Home ↑</Link>
        </div>
      </div>
    </footer>
  );
}
