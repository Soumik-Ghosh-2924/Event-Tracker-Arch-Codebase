import React from "react";
import { useParams } from "react-router-dom";
import PRODUCTS from "../data/products";
import { useCart } from "../context/CartContext";
import sendEvent from "../utils/tracker";

export default function ProductDetail(){
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);
  const { add } = useCart();
  const [qty, setQty] = React.useState(1);

  React.useEffect(() => {
    sendEvent("PageView", { page: "ProductDetail", productId: id });
  }, [id]);

  if (!product) return <div>Product not found</div>;

  const addToCart = () => {
    add(product, qty);
    sendEvent("AddToCart", { productId: product.id, qty, price: product.price });
    alert(`${product.name} added to cart`);
  };

  return (
    <div className="detail">
      <div className="left card">
        <img src={product.img} alt={product.name} style={{height:340}}/>
        <h2 style={{marginTop:12}}>{product.name}</h2>
        <p style={{color:"var(--muted)"}}>{product.desc}</p>
      </div>

      <div className="right">
        <h3>₹{product.price}</h3>
        <div className="qty">
          <label>Qty</label>
          <input type="number" min="1" value={qty} onChange={e => setQty(Math.max(1, +e.target.value))} style={{width:60,padding:8,borderRadius:6,border:"1px solid #ddd"}} />
        </div>
        <button className="btn" onClick={addToCart}>Add to cart</button>
      </div>
    </div>
  );
}
