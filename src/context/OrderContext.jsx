import { createContext, useContext, useState, useEffect } from "react";

const OrderContext = createContext(null);
const STORAGE_KEY = "lmp_orders";

const STATUS_STAGES = ["Pending", "Processing", "Shipped", "Out for Delivery", "Delivered"];

function loadOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(loadOrders);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // storage unavailable — demo continues without persistence
    }
  }, [orders]);

  function createOrder(data) {
    const orderId = `LMP-${Date.now().toString().slice(-8)}`;
    const placedAt = new Date().toISOString();
    const order = {
      orderId,
      ...data,
      placedAt,
      status: "Processing",
      statusIndex: 1,
      statusStages: STATUS_STAGES,
      statusHistory: [
        { stage: "Pending", at: placedAt },
        { stage: "Processing", at: placedAt },
      ],
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  }

  function getOrderById(orderId) {
    return orders.find((o) => o.orderId === orderId);
  }

  function advanceOrderStatus(orderId) {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.orderId !== orderId || o.statusIndex >= STATUS_STAGES.length - 1) return o;
        const nextIndex = o.statusIndex + 1;
        return {
          ...o,
          statusIndex: nextIndex,
          status: STATUS_STAGES[nextIndex],
          statusHistory: [...o.statusHistory, { stage: STATUS_STAGES[nextIndex], at: new Date().toISOString() }],
        };
      })
    );
  }

  return (
    <OrderContext.Provider value={{ orders, createOrder, getOrderById, advanceOrderStatus, STATUS_STAGES }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
}
