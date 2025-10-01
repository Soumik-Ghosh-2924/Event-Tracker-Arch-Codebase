import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import sendEvent from "../utils/tracker";

export default function Navbar() {
  const { items } = useCart();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const onSearch = (e) => {
    e.preventDefault();
    sendEvent("Search", { query: q });
    navigate("/?q=" + encodeURIComponent(q));
  };

  // Mock typeahead suggestions
  useEffect(() => {
    if (q.length > 1) {
      setSuggestions([
        q + " Pro",
        q + " Lite",
        "Best " + q,
      ]);
    } else setSuggestions([]);
  }, [q]);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);

  return (
    <header className="navbar">
      <div className="bar">
        <div className="brand">
          <div className="logo">E</div>
          <div>
            <div style={{ fontWeight: 700 }}>Martello</div>
            <div style={{ fontSize: 12, color: "#ddd" }}>Embracing elegance</div>
          </div>
        </div>

        <form className="searchRow" onSubmit={onSearch}>
          <input
            className="searchInput"
            placeholder="Search products..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button className="btn secondary" type="submit">Search</button>
          {suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((s, i) => (
                <li key={i} onClick={() => { setQ(s); navigate("/?q=" + encodeURIComponent(s)) }}>
                  {s}
                </li>
              ))}
            </ul>
          )}
        </form>

        <div className="navLinks">
          <Link to="/" style={{ color: "#fff" }}>Home</Link>
          <Link to="/cart" style={{ color: "#fff", position: "relative" }}>
            <span style={{ marginLeft: 6 }}>Cart</span>
            <span className="cartBubble" style={{ marginLeft: 8 }}>{totalItems}</span>
          </Link>
          <button className="hamburger" onClick={() => setShowMenu(!showMenu)}>☰</button>
          {showMenu && (
            <div className="mobileMenu">
              <Link to="/">Home</Link>
              <Link to="/cart">Cart ({totalItems})</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
