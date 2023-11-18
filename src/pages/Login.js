// Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import "./Login.css";

const Login = ({ onLogin, isLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulated authentication logic
    const storedUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const user = storedUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      onLogin(user);
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  if (isLoggedIn) {
    navigate("/");
  }

  return (
    <div className="login-page">
      <h2>Tugas Akhir Kelompok 10</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <h3>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </h3>
        <br />
        <h3>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </h3>
        <br />
        <button type="submit">
          <FaSignInAlt /> Login
        </button>
      </form>
      <h3>
        Belum ada akun? <Link to="/register">Daftar Disini</Link>
      </h3>
    </div>
  );
};

export default Login;
