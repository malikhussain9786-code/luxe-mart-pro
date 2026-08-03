import { createContext, useContext, useState, useMemo, useEffect } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "lmp_cart";

function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Cart for Luxe Mart Pro — a normal multi-brand cart.
 * Cart contents persist to localStorage across reloads and sessions.
 */
export function CartProvider({ children }) {
  const [items, setItems] = useState(loadItems); // { productId, brandId, brandName, name, price, qty, variant, image, subcategoryId }
  const [lastAdded, setLastAdded] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable — cart still works for this session
    }
  }, [items]);

  function addItem(product, qty = 1, variant = null) {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === product.id && i.variant === variant
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id && i.variant === variant
            ? { ...i, qty: i.qty + qty }
            : i
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          brandId: product.brandId,
          brandName: product.brandName,
          name: product.name,
          price: product.price,
          image: product.image,
          subcategoryId: product.subcategoryId,
          variant,
          qty,
        },
      ];
    });
    setLastAdded({ name: product.name, image: product.image, price: product.price, id: Date.now() });
    return { blocked: false };
  }

  function removeItem(productId, variant = null) {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.variant === variant))
    );
  }

  function updateQty(productId, variant, qty) {
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.variant === variant ? { ...i, qty } : i
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  const brandsInCart = useMemo(() => {
    const map = new Map();
    items.forEach((i) => {
      if (!map.has(i.brandId)) map.set(i.brandId, i.brandName);
    });
    return Array.from(map, ([brandId, brandName]) => ({ brandId, brandName }));
  }, [items]);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  const value = {
    items,
    brandsInCart,
    lastAdded,
    clearLastAdded: () => setLastAdded(null),
    addItem,
    removeItem,
    updateQty,
    clearCart,
    subtotal,
    itemCount: items.reduce((n, i) => n + i.qty, 0),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
