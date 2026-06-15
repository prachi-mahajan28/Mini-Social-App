import React from "react";
import { Link } from "react-router-dom";

function Navbar({ user, handleLogout }) {
  return (
    <nav className="navbar">
      <h3 style={{ margin: 0, color: "#007bff" }}>SocialFeed</h3>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: "15px", fontSize: "15px" }}>
              Welcome, <b>{user.username}</b>
            </span>
            <button
              className="btn"
              style={{ backgroundColor: "#dc3545", padding: "6px 12px" }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                marginRight: "15px",
                textDecoration: "none",
                color: "#007bff",
                fontWeight: "bold",
              }}
            >
              Login
            </Link>
            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                color: "#333",
                fontWeight: "bold",
              }}
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
