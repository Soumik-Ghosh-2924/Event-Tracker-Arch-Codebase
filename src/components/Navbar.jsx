import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import sendEvent from "../utils/tracker";

export default function Navbar(){
  const { items } = useCart();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const onSearch = (e) => {
    e.preventDefault();
    sendEvent("Search", { query: q });
    navigate("/?q=" + encodeURIComponent(q));
  };

  return (
    <header className="navbar">
      <div className="bar">
        <div className="brand">
          <div className="logo">E</div>
          <div>
            <div style={{fontWeight:700}}>Martello</div>
            <div style={{fontSize:12, color:"#ddd"}}>Embracing elegance</div>
          </div>
        </div>

        <form className="searchRow" onSubmit={onSearch}>
          <input className="searchInput" placeholder="Search products..." value={q} onChange={e => setQ(e.target.value)} />
          <button className="btn secondary" type="submit">Search</button>
        </form>

        <div className="navLinks">
          <Link to="/" style={{color:"#fff"}}>Home</Link>
          <Link to="/cart" style={{color:"#fff"}}>
            <span style={{marginLeft:6}}>Cart</span>
            <span className="cartBubble" style={{marginLeft:8}}>{items.reduce((s,i)=>s+i.qty,0)}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
