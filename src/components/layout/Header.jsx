import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ''
    });

    localStorage.removeItem('auth');
  };

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary header">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            {!auth.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Signup
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li class="nav-item dropdown">
              <div>
                <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {auth.user.name}
                </div>
                <ul className="dropdown-menu">
                  <li><NavLink className="dropdown-item" to="/dashboard">Dashboard</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/students">Students</NavLink></li>
                  <li><NavLink className="dropdown-item" to="/teachers">Teachers</NavLink></li>
                  <li><NavLink className="dropdown-item" to='/login' onClick={handleLogout} >Logout</NavLink></li>
                </ul>
                </div>
            </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  </>
  );
};

export default Header;
