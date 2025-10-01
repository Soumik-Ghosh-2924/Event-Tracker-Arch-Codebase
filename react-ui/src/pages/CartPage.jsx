import React from "react";
import { useCart } from "../context/CartContext";
import sendEvent from "../utils/tracker";

export default function CartPage() {
  const { items, remove, updateQty, clear, totalItems, totalPrice } = useCart();

  const checkout = () => {
    sendEvent("CheckoutStarted", { items, total: totalPrice });
    alert("Checkout flow not implemented in demo.");
  };

  if (items.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div>
      <h2>Your Cart</h2>
      <div className="cartList">
        {items.map(it => (
          <div className="cartItem" key={it.id}>
            <img src={it.img} alt={it.name} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{it.name}</div>
              <div style={{ color: "var(--muted)" }}>₹{it.salePrice || it.price}</div>
              {it.size && <div>Size: {it.size}</div>}
              {it.color && <div>Color: {it.color}</div>}
              <div style={{ marginTop: 8 }}>
                <input
                  type="number"
                  min="1"
                  max={it.stock || 100}
                  value={it.qty}
                  onChange={e => updateQty(it.id, Math.max(1, +e.target.value))}
                  style={{ width: 64, padding: 6 }}
                />
                <button
                  className="btn secondary"
                  onClick={() => remove(it.id)}
                  style={{ marginLeft: 8 }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700 }}>Total Items: {totalItems}</div>
        <div style={{ fontWeight: 700 }}>Total Price: ₹{totalPrice}</div>
        <div style={{ marginTop: 10 }}>
          <button className="btn" onClick={checkout}>
            Proceed to Checkout
          </button>
          <button
            className="btn secondary"
            onClick={() => { clear(); sendEvent("CartCleared"); }}
            style={{ marginLeft: 8 }}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
