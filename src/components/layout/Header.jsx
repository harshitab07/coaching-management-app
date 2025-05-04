import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import "../../styles/navbar.css";

const Header = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("auth");
    navigate('/login');
  };

  return (
    <>
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <NavLink className="navbar-brand" to="/">
      My-Coaching
    </NavLink>
    
    {/* Hamburger Toggle Button */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* Collapsible Menu */}
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

        {!auth.user ? (
          <>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                <button className="btn btn-sm btn-outline-secondary w-100">
                  Log In
                </button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register" className="nav-link">
                <button className="btn btn-sm btn-outline-secondary w-100">
                  Sign Up
                </button>
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <NavLink to="/active-students" className="nav-link">
                <button className="btn btn-sm btn-outline-primary w-100">
                  Active Students
                </button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/completed-students" className="nav-link">
                <button className="btn btn-sm btn-outline-primary w-100">
                  Completed Students
                </button>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/left-students" className="nav-link">
                <button className="btn btn-sm btn-outline-primary w-100">
                  Left Students
                </button>
              </NavLink>
            </li>
            <li className="nav-item m-auto">
              <button
                className="btn btn-sm btn-outline-secondary w-100"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        )}

      </ul>
    </div>
  </div>
</nav>
    </>
  );
};

export default Header;
