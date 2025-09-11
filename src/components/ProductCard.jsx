import React from "react";
import { Link } from "react-router-dom";
import sendEvent from "../utils/tracker";

export default function ProductCard({ product }) {
  const onView = () => sendEvent("ProductClick", { productId: product.id, name: product.name });
  return (
    <div className="card">
      <img src={product.img} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Price: ₹{product.price}</p>
      <div className="actions">
        <Link to={`/product/${product.id}`} onClick={onView}>View Details</Link>
      </div>
    </div>
  );
}
