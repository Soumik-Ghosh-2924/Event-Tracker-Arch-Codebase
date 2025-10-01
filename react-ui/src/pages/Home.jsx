import React from "react";
import PRODUCTS from "../data/PRODUCT";
import ProductCard from "../components/ProductCard";
import sendEvent from "../utils/tracker";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Home() {
  const q = useQuery().get("q") || "";
  const [query, setQuery] = React.useState(q);
  const [category, setCategory] = React.useState("All");
  const [priceRange, setPriceRange] = React.useState([0, 5000]); // min-max price

  React.useEffect(() => {
    sendEvent("PageView", { page: "Home" });
  }, []);

  const categories = ["All", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
  const filtered = PRODUCTS.filter(p => {
    const inCategory = category === "All" || p.category === category;
    const inQuery = query.trim() === "" || p.name.toLowerCase().includes(query.toLowerCase());
    const inPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return inCategory && inQuery && inPrice;
  });

  return (
    <>
      <div className="headerRow">
        <h2>Products</h2>
        <div className="filters">
          <select className="filterSelect" value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <input
            className="filterSelect"
            placeholder="Quick search"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />

          <div className="priceFilter">
            <label>Price: ₹{priceRange[0]} - ₹{priceRange[1]}</label>
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={priceRange[1]}
              onChange={e => setPriceRange([0, +e.target.value])}
            />
          </div>
        </div>
      </div>

      {filtered.length === 0 && <p style={{ marginTop: 20 }}>No products match your filters.</p>}

      <div className="grid">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </>
  );
}
