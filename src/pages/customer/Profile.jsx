import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, MapPin, CreditCard, Settings, Package, Plus, Trash2, Star, ChevronRight, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useOrders } from "../../context/OrderContext.jsx";
import { Button, Input } from "../../components/ui/index.js";
import AddressForm from "../../components/profile/AddressForm.jsx";
import CardForm from "../../components/profile/CardForm.jsx";

const tabs = [
  { id: "info", label: "Personal Info", icon: User },
  { id: "addresses", label: "Saved Addresses", icon: MapPin },
  { id: "cards", label: "Payment Methods", icon: CreditCard },
  { id: "preferences", label: "Preferences", icon: Settings },
];

export default function Profile() {
  const { profile, updateProfile, addAddress, removeAddress, setDefaultAddress, addCard, removeCard, updatePreferences, signOut } = useAuth();
  const { orders } = useOrders();
  const navigate = useNavigate();
  const [tab, setTab] = useState("info");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  function handleSaveInfo() {
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleSignOut() {
    signOut();
    navigate("/");
  }

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-12">
      <h1 className="font-display text-4xl text-sapphire font-semibold mb-3">My Profile</h1>
      <p className="text-ink/55 text-sm mb-10">Manage your info, addresses, saved payment methods, and preferences.</p>

      <Link to="/orders" className="flex items-center justify-between bg-sapphire text-ivory px-6 py-5 mb-10 hover:bg-sapphire-2 transition">
        <div className="flex items-center gap-3">
          <Package size={19} className="text-gold-light" />
          <span className="text-sm font-semibold">{orders.length} order{orders.length !== 1 ? "s" : ""} placed — view your order history</span>
        </div>
        <ChevronRight size={16} />
      </Link>

      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="w-full lg:w-56 flex-shrink-0">
          <div className="flex lg:flex-col gap-2 overflow-x-auto">
            {tabs.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-2.5 px-4 py-3 text-sm font-semibold whitespace-nowrap text-left ${
                    tab === t.id ? "bg-amethyst/10 text-amethyst" : "text-ink/60 hover:bg-ivory-2"
                  }`}
                >
                  <Icon size={16} /> {t.label}
                </button>
              );
            })}
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2.5 px-4 py-3 text-sm font-bold text-ruby hover:bg-ruby/5 w-full text-left mt-2 border-t border-sapphire/10 lg:border-t-0 lg:mt-4"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </aside>

        <div className="flex-1">
          {tab === "info" && (
            <div className="bg-white border border-sapphire/10 p-8 max-w-lg">
              <h2 className="font-display text-xl font-semibold text-sapphire mb-6">Personal Information</h2>
              <div className="space-y-4">
                <Input label="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Your full name" />
                <Input label="Email Address" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
                <Input label="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+92 300 1234567" />
              </div>
              <Button variant="primary" className="mt-6" onClick={handleSaveInfo}>
                {saved ? "Saved ✓" : "Save Changes"}
              </Button>
            </div>
          )}

          {tab === "addresses" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold text-sapphire">Saved Addresses</h2>
                {!showAddressForm && (
                  <Button variant="ghost" size="sm" onClick={() => setShowAddressForm(true)}>
                    <Plus size={14} /> Add Address
                  </Button>
                )}
              </div>

              {showAddressForm && (
                <div className="mb-6">
                  <AddressForm
                    onCancel={() => setShowAddressForm(false)}
                    onSave={(addr) => {
                      addAddress(addr);
                      setShowAddressForm(false);
                    }}
                  />
                </div>
              )}

              {profile.addresses.length === 0 && !showAddressForm ? (
                <p className="text-sm text-ink/50">No saved addresses yet.</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {profile.addresses.map((addr) => (
                    <div key={addr.id} className="bg-white border border-sapphire/10 p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-sapphire flex items-center gap-1.5">
                          {addr.label}
                          {addr.isDefault && <Star size={12} className="fill-gold text-gold" />}
                        </span>
                        <button onClick={() => removeAddress(addr.id)} className="text-ink/30 hover:text-ruby" aria-label="Delete address" title="Delete Address">
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <p className="text-xs text-ink/60 leading-relaxed mb-3">
                        {addr.houseNo}, {addr.street}
                        {addr.landmark && `, near ${addr.landmark}`}<br />
                        {addr.city}, {addr.country}
                      </p>
                      {!addr.isDefault && (
                        <button onClick={() => setDefaultAddress(addr.id)} className="text-[11px] font-bold text-amethyst">
                          Set as default
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "cards" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold text-sapphire">Payment Methods</h2>
                {!showCardForm && (
                  <Button variant="ghost" size="sm" onClick={() => setShowCardForm(true)}>
                    <Plus size={14} /> Add Card
                  </Button>
                )}
              </div>

              {showCardForm && (
                <div className="mb-6">
                  <CardForm
                    onCancel={() => setShowCardForm(false)}
                    onSave={(card) => {
                      addCard(card);
                      setShowCardForm(false);
                    }}
                  />
                </div>
              )}

              {profile.savedCards.length === 0 && !showCardForm ? (
                <p className="text-sm text-ink/50">No saved cards yet.</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {profile.savedCards.map((card) => (
                    <div key={card.id} className="bg-gradient-to-br from-sapphire to-amethyst text-white p-5 relative">
                      <button onClick={() => removeCard(card.id)} className="absolute top-3 right-3 text-white/60 hover:text-white" aria-label="Delete card" title="Delete Card">
                        <Trash2 size={15} />
                      </button>
                      <div className="font-mono text-sm tracking-widest mb-6">•••• •••• •••• {card.last4}</div>
                      <div className="flex justify-between text-[11px]">
                        <span className="uppercase">{card.name}</span>
                        <span className="font-mono">{card.expiry}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "preferences" && (
            <div className="bg-white border border-sapphire/10 p-8 max-w-lg space-y-6">
              <h2 className="font-display text-xl font-semibold text-sapphire mb-2">Preferences</h2>

              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-sapphire/60 mb-2">Currency</div>
                <select
                  value={profile.preferences.currency}
                  onChange={(e) => updatePreferences({ currency: e.target.value })}
                  className="w-full border border-sapphire/15 px-4 py-3 text-sm bg-white focus:outline-none"
                >
                  <option value="USD">USD ($)</option>
                  <option value="AED">AED</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-sapphire/60 mb-2">Language</div>
                <select
                  value={profile.preferences.language}
                  onChange={(e) => updatePreferences({ language: e.target.value })}
                  className="w-full border border-sapphire/15 px-4 py-3 text-sm bg-white focus:outline-none"
                >
                  <option>English</option>
                  <option>Français</option>
                  <option>العربية</option>
                </select>
              </div>

              <label className="flex items-center justify-between">
                <span className="text-sm text-ink/70">Email order updates</span>
                <input
                  type="checkbox"
                  checked={profile.preferences.emailUpdates}
                  onChange={(e) => updatePreferences({ emailUpdates: e.target.checked })}
                  className="accent-amethyst w-4 h-4"
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-ink/70">SMS order updates</span>
                <input
                  type="checkbox"
                  checked={profile.preferences.smsUpdates}
                  onChange={(e) => updatePreferences({ smsUpdates: e.target.checked })}
                  className="accent-amethyst w-4 h-4"
                />
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
