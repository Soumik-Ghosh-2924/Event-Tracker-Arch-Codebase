import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cart") || "[]"); } catch { return []; }
  });

  const add = (product, qty = 1) => {
    setItems(prev => {
      const found = prev.find(p => p.id === product.id);
      let next;
      if (found) {
        next = prev.map(p => p.id === product.id ? { ...p, qty: p.qty + qty } : p);
      } else {
        next = [...prev, { ...product, qty }];
      }
      localStorage.setItem("cart", JSON.stringify(next));
      return next;
    });
  };

  const remove = (id) => {
    setItems(prev => {
      const next = prev.filter(p => p.id !== id);
      localStorage.setItem("cart", JSON.stringify(next));
      return next;
    });
  };

  const updateQty = (id, qty) => {
    setItems(prev => {
      const next = prev.map(p => p.id === id ? { ...p, qty } : p);
      localStorage.setItem("cart", JSON.stringify(next));
      return next;
    });
  };

  const clear = () => { localStorage.removeItem("cart"); setItems([]); };

  return (
    <CartContext.Provider value={{ items, add, remove, updateQty, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
