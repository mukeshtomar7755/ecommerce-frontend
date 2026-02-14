import { useState } from "react";
import { apiFetch } from "../api/client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg,] = useState("");
  const nav = useNavigate();

  async function login() {
    try {
      const data = await apiFetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem("token", data.token);
      toast.success("Login successful ✅");
      nav("/admin");
    } catch (e) {
      toast.error(e.message || "Login failed ❌");
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 360 }}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
      {msg && <div style={{ color: "red" }}>{msg}</div>}
    </div>
  );
}
