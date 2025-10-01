import React from "react";
import { Link } from "react-router-dom";
import sendEvent from "../utils/tracker";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  const onView = () => sendEvent("ProductClick", { productId: product.id, name: product.name });
  const onQuickAdd = () => {
    addItem(product, 1);
    sendEvent("QuickAddToCart", { productId: product.id });
  };

  return (
    <div className="card">
      <div className="imgContainer">
        <img src={product.img} alt={product.name} />
        <button className="quickAdd" onClick={onQuickAdd}>Add to Cart</button>
      </div>
      <h3>{product.name}</h3>
      <p className="price">Price: ₹{product.price}</p>
      <div className="actions">
        <Link to={`/product/${product.id}`} onClick={onView} className="viewBtn">
          View Details
        </Link>
      </div>
    </div>
  );
}
