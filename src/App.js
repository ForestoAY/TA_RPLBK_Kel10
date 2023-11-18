import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Header from "./component/Header/Header";
import Navigation from "./component/Navigation/Navigation";
import MainActivity from "./pages/MainActivity";
import PlayersActivity from "./pages/PlayersActivity";
import LeaderboardActivity from "./pages/LeaderboardActivity";
import RecentMatchesActivity from "./pages/RecentMatchesActivity";
import AboutActivity from "./pages/AboutActivity";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Store authentication status in localStorage
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Remove authentication status from localStorage
    localStorage.removeItem("isLoggedIn");
    // Refresh the page after logout
    window.location.reload();
  };

  useEffect(() => {
    // Check if the user is logged in on application start
    if (localStorage.getItem("isLoggedIn") === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        {isLoggedIn && (
          <Navigation isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        )}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/login" replace />
              ) : (
                <Login onLogin={handleLogin} isLoggedIn={isLoggedIn} />
              )
            }
          />

          {/* Protected routes (accessible only when authenticated) */}
          {isLoggedIn ? (
            <>
              <Route exact path="/" element={<Navigate to="/teams" />} />
              <Route path="/teams" element={<MainActivity />} />
              <Route
                exact
                path="/teams/players/:id"
                element={<PlayersActivity />}
              />
              <Route
                exact
                path="/teams/matches/:id"
                element={<RecentMatchesActivity />}
              />
              <Route
                exact
                path="/leaderboard"
                element={<LeaderboardActivity />}
              />
              <Route exact path="/profile" element={<AboutActivity />} />
            </>
          ) : (
            // Redirect to login if not authenticated
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
