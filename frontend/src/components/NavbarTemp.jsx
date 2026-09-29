import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavbarTemp({ theme, toggleTheme }) {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg taskflow-navbar sticky-top">
        <div className="container py-2">
          <Link className="navbar-brand taskflow-logo" to="/">
            Task<span>Flow</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav mx-auto gap-lg-3">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#product">
                  Product
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#solutions">
                  Solutions
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                {theme === "light" ? "☾" : "☀"}
              </button>

              {user ? (
                <button
                  className="btn taskflow-signin"
                  onClick={() => setShowLogoutModal(true)}
                >
                  Sign out
                </button>
              ) : (
                <>
                  <Link className="btn taskflow-signin" to="/login">
                    Sign in
                  </Link>
                  <Link className="btn taskflow-primary-btn" to="/register">
                    Get started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showLogoutModal && (
        <>
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content taskflow-logout-modal">
                <div className="modal-header">
                  <h5 className="modal-title">Sign out?</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setShowLogoutModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <p className="mb-0">
                    Are you sure you want to sign out of TaskFlow?
                  </p>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn taskflow-modal-cancel"
                    onClick={() => setShowLogoutModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="btn taskflow-modal-confirm"
                    onClick={() => {
                      logout();
                      setShowLogoutModal(false);
                    }}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
}

export default NavbarTemp;