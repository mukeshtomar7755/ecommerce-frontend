import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";

export default function Landing() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  async function load() {
    try {
      const data = await apiFetch("/api/products", { headers: {} });
      setProducts(data);
    } catch (e) {
      setError(e.message);
    }
  }
  
useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  load();
}, []);

  return (
    <div style={{ padding: 24 }}>
      <h2 className="bg-red-500 text-white p-4 rounded">Products</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {products.map((p) => (
          <div key={p._id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>
            <small>{p.category}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
