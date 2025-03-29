import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import "../../styles/navbar.css";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("auth");
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container flex-row">
          <NavLink className="navbar-brand" to="/">
            My-Coaching
          </NavLink>
          <form class="d-flex header-buttons">
            {!auth.user ? (
              <>
                <button class="btn btn-sm btn-outline-secondary" type="button">
                  <NavLink to="/login" className="nav-link">Log In</NavLink>
                </button>
                <button class="btn btn-sm btn-outline-secondary" type="button">
                  <NavLink to="/register" className="nav-link">Sign Up</NavLink>
                </button>
              </>
            ) : (
              <>
                <button class="btn btn-sm btn-outline-primary" type="button">
                  <NavLink to="/students">Students</NavLink>
                </button>
                <button class="btn btn-sm btn-outline-primary" type="button">
                <NavLink to="/students">Students</NavLink>
                </button>
                <button class="btn btn-sm btn-outline-secondary" type="button" onClick={handleLogout}>
                Logout
                </button>
              </>
            )}
          </form>
        </div>
      </nav>
    </>
  );
};

export default Header;
