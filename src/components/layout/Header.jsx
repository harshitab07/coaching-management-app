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
      <nav className="navbar bg-body-tertiary">
        <div className="container flex-row">
          <NavLink className="navbar-brand" to="/">
            My-Coaching
          </NavLink>
          <form className="d-flex header-buttons">
            {!auth.user ? (
              <>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  type="button"
                >
                  <NavLink to="/login" className="nav-link">
                    Log In
                  </NavLink>
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  type="button"
                >
                  <NavLink to="/register" className="nav-link">
                    Sign Up
                  </NavLink>
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-sm btn-outline-primary"
                  type="button"
                >
                  <NavLink to="/active-students" className="nav-link">
                    Active Students
                  </NavLink>
                </button>
                <button
                  className="btn btn-sm btn-outline-primary"
                  type="button"
                >
                  <NavLink to="/completed-students" className="nav-link">
                    Completed Students
                  </NavLink>
                </button>
                <button
                  className="btn btn-sm btn-outline-primary"
                  type="button"
                >
                  <NavLink to="/left-students" className="nav-link">
                    Left Students
                  </NavLink>
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  type="button"
                  onClick={handleLogout}
                >
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
