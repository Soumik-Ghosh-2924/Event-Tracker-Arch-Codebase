import React from "react";
import PRODUCTS from "../data/products";
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

  React.useEffect(() => {
    sendEvent("PageView", { page: "Home" });
  }, []);

  const categories = ["All", ...Array.from(new Set(PRODUCTS.map(p=>p.category)))];
  const filtered = PRODUCTS.filter(p => {
    return (category === "All" || p.category === category) &&
           (query.trim() === "" || p.name.toLowerCase().includes(query.toLowerCase()));
  });

  return (
    <>
      <div className="headerRow">
        <h2>Products</h2>
        <div className="filters">
          <select className="filterSelect" value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input className="filterSelect" placeholder="Quick search" value={query} onChange={e => setQuery(e.target.value)} />
        </div>
      </div>

      <div className="grid">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </>
  );
}
