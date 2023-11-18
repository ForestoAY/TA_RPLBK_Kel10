// Register.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in both username and password");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      // Retrieve existing users from localStorage
      const existingUsers =
        JSON.parse(localStorage.getItem("registeredUsers")) || [];

      // Check if the username is already taken
      const isUsernameTaken = existingUsers.some(
        (user) => user.username === username
      );

      if (isUsernameTaken) {
        setError("Username is already taken");
      } else {
        // Handle successful registration
        alert("Registration successful!");

        // Add the new user to the existing users
        const newUser = { username, password };
        const updatedUsers = [...existingUsers, newUser];

        // Store the updated users in localStorage
        localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

        // Navigate to the login page after successful registration
        navigate("/login");
      }
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
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
        <h3>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </h3>
        <br />
        <button type="submit">Register</button>
      </form>
      <h3>
        Sudah ada akun? <Link to="/login">Login disini</Link>
      </h3>
    </div>
  );
};

export default Register;
