import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const [data, setData] = useState({ username: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();

    // DEMO LOGIN
    const ADMIN_USERNAME = process.env.REACT_APP_ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD;
    // DEMO LOGIN
    if (data.username === ADMIN_USERNAME && data.password === ADMIN_PASSWORD){
      localStorage.setItem("isAdmin", "true"); // ✅ LOGIN MARK
      navigate("/admin"); // → ADMIN PANEL
    } else {
      alert("Wrong username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h2>

        <input
          placeholder="Username"
          className="w-full p-3 border rounded mb-4"
          onChange={(e) => setData({ ...data, username: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded mb-6"
          onChange={(e) => setData({ ...data, password: e.target.value })}
          required
        />

        <button className="w-full bg-black text-white py-3 rounded font-semibold">
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
