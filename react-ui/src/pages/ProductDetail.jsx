import React from "react";
import { useParams } from "react-router-dom";
import PRODUCTS from "../data/PRODUCT";
import { useCart } from "../context/CartContext";
import sendEvent from "../utils/tracker";

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);
  const { add } = useCart();
  const [qty, setQty] = React.useState(1);
  const [selectedSize, setSelectedSize] = React.useState(product?.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = React.useState(product?.colors?.[0] || "");

  React.useEffect(() => {
    sendEvent("PageView", { page: "ProductDetail", productId: id });
  }, [id]);

  if (!product) return <div>Product not found</div>;

  const addToCart = () => {
    if (qty > product.stock) {
      alert(`Only ${product.stock} items in stock`);
      return;
    }
    add({ ...product, size: selectedSize, color: selectedColor }, qty);
    sendEvent("AddToCart", { productId: product.id, qty, price: product.price });
    alert(`${product.name} added to cart`);
  };

  return (
    <div className="detail">
      <div className="left card">
        <img src={product.img} alt={product.name} style={{ height: 340 }} />
        <h2 style={{ marginTop: 12 }}>{product.name}</h2>
        <p style={{ color: "var(--muted)" }}>{product.desc}</p>
        {product.rating && <p>⭐ {product.rating} / 5</p>}
        {product.salePrice && (
          <p>
            <span style={{ textDecoration: "line-through", color: "#888" }}>₹{product.price}</span>{" "}
            <span style={{ fontWeight: 700, color: "#d33" }}>₹{product.salePrice}</span>
          </p>
        )}
      </div>

      <div className="right">
        <h3>₹{product.salePrice || product.price}</h3>
        {product.sizes && (
          <div className="option">
            <label>Size:</label>
            <select value={selectedSize} onChange={e => setSelectedSize(e.target.value)}>
              {product.sizes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        )}

        {product.colors && (
          <div className="option">
            <label>Color:</label>
            <select value={selectedColor} onChange={e => setSelectedColor(e.target.value)}>
              {product.colors.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        )}

        <div className="qty" style={{ marginTop: 12 }}>
          <label>Qty</label>
          <input
            type="number"
            min="1"
            max={product.stock}
            value={qty}
            onChange={e => setQty(Math.max(1, Math.min(product.stock, +e.target.value)))}
            style={{ width: 60, padding: 8, borderRadius: 6, border: "1px solid #ddd" }}
          />
        </div>

        <button className="btn" onClick={addToCart} style={{ marginTop: 12 }}>
          Add to cart
        </button>
      </div>
    </div>
  );
}
