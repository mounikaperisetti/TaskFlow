import { Link } from "react-router-dom";

function NavbarTemp({ theme, toggleTheme }) {
  return (
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
              <a className="nav-link" href="#product">Product</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#solutions">Solutions</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">Contact</a>
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

            <Link className="btn taskflow-signin" to="/login">
              Sign in
            </Link>

            <Link className="btn taskflow-primary-btn" to="/register">
              Get started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarTemp;