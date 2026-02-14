import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function logout() {
    localStorage.removeItem("token");
    toast.info("Logged out 👋");  
    navigate("/login");
  }

  return (
    <nav className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between">
      <div className="font-bold text-lg">Mini E-Commerce</div>

      <div className="space-x-4">
        <Link to="/" className="hover:text-blue-400">Home</Link>

        {!token && (
          <Link to="/login" className="hover:text-blue-400">Login</Link>
        )}

        {token && (
          <>
            <Link to="/admin" className="hover:text-blue-400">Admin</Link>
            <button
              onClick={logout}
              className="ml-3 bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
