import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useCart } from "../../CartContext";
import AxiosInstance from "../../AxiosInstance";

function Navbar() {
  const { cartCount } = useCart();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navbarRef = useRef();

  // Toggle open/close
  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Close on nav link click
  const handleNavLinkClick = () => {
    setIsCollapsed(true);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsCollapsed(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logoutSubmit = (e) => {
    e.preventDefault();
    AxiosInstance.post("/api/logout")
      .then((response) => {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("role");
        if (response.status === 200) {
          window.location.reload();
        }
      })
      .catch((error) => console.log(error));
  };

  const authButtons = localStorage.getItem("auth_token") ? (
    <ul className="navbar-nav">
      <li className="nav-item">
        <button className="logout-btn" onClick={logoutSubmit}>
          Logout
        </button>
      </li>
    </ul>
  ) : (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link
          to="/login"
          className="nav-link active"
          style={{ color: "lightblue" }}
          onClick={handleNavLinkClick}
        >
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/register"
          className="nav-link active"
          style={{ color: "lightblue" }}
          onClick={handleNavLinkClick}
        >
          Register
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg bg-dark fixed-top" ref={navbarRef}>
      <div className="container">
        <Link
          className="navbar-brand"
          to="/"
          style={{ color: "white" }}
          onClick={handleNavLinkClick}
        >
          Eucia
        </Link>

        <div className="d-flex align-items-center ms-auto order-lg-1">
          <button
            className="navbar-toggler me-2 ms-auto"
            type="button"
            aria-expanded={!isCollapsed}
            onClick={toggleNavbar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="white"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
            </svg>
          </button>

          <Link
            to="/cart"
            className="nav-link ms-auto position-relative"
            style={{ color: "lightblue", fontSize: "1.4rem" }}
            onClick={handleNavLinkClick}
          >
            <i className="bi bi-cart"></i>
            {cartCount > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.6rem" }}
              >
                {cartCount}
                <span className="visually-hidden">cart items</span>
              </span>
            )}
          </Link>
        </div>

        <div
          className={`collapse navbar-collapse order-lg-0 ${
            !isCollapsed ? "show" : ""
          }`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link active"
                style={{ color: "lightblue" }}
                onClick={handleNavLinkClick}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/collections"
                className="nav-link active"
                style={{ color: "lightblue" }}
                onClick={handleNavLinkClick}
              >
                Collections
              </Link>
            </li>
            {authButtons}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
