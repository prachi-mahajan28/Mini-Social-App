import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";

function App() {
  // Check local storage to keep the user logged in across page refreshes
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} handleLogout={handleLogout} />
      <div className="container">
        <Routes>
          {/* Protected Route: Redirects to login if user is not authenticated */}
          <Route
            path="/"
            element={user ? <Feed user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={
              !user ? <Login handleLogin={handleLogin} /> : <Navigate to="/" />
            }
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
