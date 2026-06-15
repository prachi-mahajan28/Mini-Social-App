import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://your-backend-url.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const data = await res.json();
      alert(data.message);
      if (res.ok) navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Signup failed. Ensure backend server is running.");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h3 style={{ marginTop: 0 }}>Create Account</h3>
      <input
        className="input-field"
        type="text"
        placeholder="Username"
        required
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
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
        Sign Up
      </button>
      <p style={{ fontSize: "14px", textAlign: "center", marginTop: "15px" }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </form>
  );
}

export default Signup;
