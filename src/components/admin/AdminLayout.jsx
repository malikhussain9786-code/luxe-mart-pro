import { useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, Boxes, ShoppingCart, Users, BarChart3, ArrowLeft, Menu, X } from "lucide-react";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/inventory", label: "Inventory", icon: Boxes },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

function SidebarContent({ onNavigate }) {
  return (
    <>
      <div className="px-6 py-7 border-b border-ivory/10">
        <div className="font-display text-xl font-semibold">Luxe Mart <span className="text-gold">Pro</span></div>
        <div className="text-[11px] text-ivory/50 mt-0.5 tracking-wide uppercase">Admin Console</div>
      </div>
      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-sm font-medium transition ${
                  isActive ? "bg-amethyst text-white" : "text-ivory/65 hover:bg-ivory/5 hover:text-ivory"
                }`
              }
            >
              <Icon size={17} /> {item.label}
            </NavLink>
          );
        })}
      </nav>
      <div className="px-3 py-6 border-t border-ivory/10">
        <NavLink to="/" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-ivory/50 hover:text-ivory transition">
          <ArrowLeft size={16} /> Back to Storefront
        </NavLink>
      </div>
    </>
  );
}

export default function AdminLayout({ children, title, subtitle }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ivory-2 flex">
      <aside className="w-64 bg-sapphire text-ivory flex-shrink-0 hidden lg:flex flex-col">
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <div className="absolute inset-0 bg-sapphire/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 bg-sapphire text-ivory flex flex-col shadow-lux">
            <button onClick={() => setMobileOpen(false)} className="absolute top-6 right-5 text-ivory/60" aria-label="Close menu" title="Close Menu">
              <X size={20} />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <main className="flex-1 min-w-0">
        <header className="bg-white border-b border-sapphire/10 px-5 sm:px-6 md:px-10 py-5 md:py-6 flex items-center gap-4">
          <button className="lg:hidden flex-shrink-0" onClick={() => setMobileOpen(true)} aria-label="Open admin menu" title="Open Admin Menu">
            <Menu size={22} className="text-sapphire" />
          </button>
          <div className="min-w-0">
            <h1 className="font-display text-xl md:text-3xl text-sapphire font-semibold truncate">{title}</h1>
            {subtitle && <p className="text-ink/50 text-xs md:text-sm mt-1 truncate">{subtitle}</p>}
          </div>
        </header>
        <div className="px-4 sm:px-6 md:px-10 py-6 md:py-8 overflow-x-hidden">{children}</div>
      </main>
    </div>
  );
}
