import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();

  // ✅ Use state so React re-renders when login state changes
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  // ✅ Re-check login status whenever storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Smart Job Portal</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Always show Jobs link after login */}
            {isLoggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/jobs">Jobs</NavLink>
              </li>
            )}

            {/* Show Applications + Saved Jobs for candidates */}
            {isLoggedIn && role === "candidate" && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/applications">
                    Applications
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/saved-jobs">
                    Saved Jobs
                  </NavLink>
                </li>
              </>
            )}

            {/* Show Recruiter Dashboard for recruiters */}
            {isLoggedIn && role === "recruiter" && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/recruiter-dashboard">
                  Recruiter Dashboard
                </NavLink>
              </li>
            )}

            {/* Show login/register when not logged in */}
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">Register</NavLink>
                </li>
              </>
            )}

            {/* Show logout when logged in */}
            {isLoggedIn && (
              <li className="nav-item">
                <button
                  className="btn btn-outline-light btn-sm ms-2"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
