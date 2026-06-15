import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({ handleLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://your-backend-url.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const data = await res.json();
      if (res.ok) {
        handleLogin(data);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Ensure backend server is running.");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h3 style={{ marginTop: 0 }}>Login</h3>
      <input
        className="input-field"
        type="email"
        placeholder="Email Address"
        required
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="input-field"
        type="password"
        placeholder="Password"
        required
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button
        className="btn"
        style={{ width: "100%", marginTop: "10px" }}
        type="submit"
      >
        Log In
      </button>
      <p style={{ fontSize: "14px", textAlign: "center", marginTop: "15px" }}>
        Don't have an account? <Link to="/signup">Register here</Link>
      </p>
    </form>
  );
}

export default Login;
