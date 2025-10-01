import React, { createContext, useContext, useState, useEffect } from "react";
import sendEvent from "../utils/tracker";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      return [];
    }
  });

  // Sync items with localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // ✅ renamed from `add` → `addItem`
  const addItem = (product, qty = 1) => {
    setItems(prev => {
      const found = prev.find(p => p.id === product.id);
      let next;
      if (found) {
        next = prev.map(p =>
          p.id === product.id ? { ...p, qty: p.qty + qty } : p
        );
      } else {
        next = [...prev, { ...product, qty }];
      }

      sendEvent("AddToCart", { productId: product.id, qty });
      return next;
    });
  };

  const remove = (id) => {
    setItems(prev => {
      const next = prev.filter(p => p.id !== id);
      sendEvent("RemoveFromCart", { productId: id });
      return next;
    });
  };

  const updateQty = (id, qty) => {
    setItems(prev => {
      const next = prev.map(p => p.id === id ? { ...p, qty } : p);
      sendEvent("UpdateCartQty", { productId: id, qty });
      return next;
    });
  };

  const clear = () => {
    setItems([]);
    sendEvent("ClearCart");
  };

  // Derived helpers
  const totalItems = items.reduce((sum, p) => sum + p.qty, 0);
  const totalPrice = items.reduce((sum, p) => sum + p.qty * p.price, 0);

  return (
    <CartContext.Provider value={{
      items, addItem, remove, updateQty, clear,
      totalItems, totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
