import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "lmp_profile";

const defaultProfile = {
  fullName: "",
  email: "",
  phone: "",
  addresses: [],
  savedCards: [],
  preferences: { currency: "USD", language: "English", emailUpdates: true, smsUpdates: false },
};

function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultProfile, ...JSON.parse(raw) } : defaultProfile;
  } catch {
    return defaultProfile;
  }
}

export function AuthProvider({ children }) {
  const [profile, setProfile] = useState(loadProfile);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // storage unavailable — demo continues without persistence
    }
  }, [profile]);

  function updateProfile(data) {
    setProfile((prev) => ({ ...prev, ...data }));
  }

  function addAddress(addr) {
    const id = `addr-${Date.now()}`;
    setProfile((prev) => ({
      ...prev,
      addresses: [...prev.addresses, { id, ...addr, isDefault: prev.addresses.length === 0 }],
    }));
  }

  function removeAddress(id) {
    setProfile((prev) => ({ ...prev, addresses: prev.addresses.filter((a) => a.id !== id) }));
  }

  function setDefaultAddress(id) {
    setProfile((prev) => ({
      ...prev,
      addresses: prev.addresses.map((a) => ({ ...a, isDefault: a.id === id })),
    }));
  }

  function addCard(card) {
    const id = `card-${Date.now()}`;
    setProfile((prev) => ({ ...prev, savedCards: [...prev.savedCards, { id, ...card }] }));
  }

  function removeCard(id) {
    setProfile((prev) => ({ ...prev, savedCards: prev.savedCards.filter((c) => c.id !== id) }));
  }

  function updatePreferences(data) {
    setProfile((prev) => ({ ...prev, preferences: { ...prev.preferences, ...data } }));
  }

  function signOut() {
    setProfile((prev) => ({ ...prev, fullName: "", email: "", phone: "" }));
  }

  const isProfileComplete = !!(profile.fullName && profile.email);

  return (
    <AuthContext.Provider
      value={{
        profile,
        isProfileComplete,
        updateProfile,
        addAddress,
        removeAddress,
        setDefaultAddress,
        addCard,
        removeCard,
        updatePreferences,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
