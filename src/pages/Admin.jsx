import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";

export default function Admin() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: "", price: "", category: "", stock: "" });
    const [msg, setMsg] = useState("");

    async function load() {
        const data = await apiFetch("/api/products", { headers: {} });
        setProducts(data);
    }

    async function add() {
        try {
            await apiFetch("/api/products", {
                method: "POST",
                body: JSON.stringify(form),
            });
            setMsg("Product added ✅");
            setForm({ name: "", price: "", category: "", stock: "" });
            load();
        } catch (e) {
            setMsg(e.message);
        }
    }

    async function del(id) {
        await apiFetch(`/api/products/${id}`, { method: "DELETE" });
        load();
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect, no-undef
        load().catch((e) => setError?.(e.message));
    }, []);


    return (
        <div style={{ padding: 24 }}>
            <h2>Admin Dashboard</h2>

            <div style={{ marginBottom: 12 }}>
                <input placeholder="Name" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <input
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                />
                <input placeholder="Category" value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })} />
                <input placeholder="Stock" value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })} />
                <button onClick={add}>Add Product</button>
                {msg && <div>{msg}</div>}
            </div>

            <ul>
                {products.map((p) => (
                    <li key={p._id}>
                        {p.name} – ₹{p.price}{" "}
                        <button onClick={() => del(p._id)} style={{ color: "red" }}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
