import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div id="layoutSidenav_nav">
      <nav
        className="sb-sidenav accordion sb-sidenav-dark"
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Core</div>
            <Link className="nav-link" to="/admin/dashboard">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              Dashboard
            </Link>
            <Link className="nav-link" to="/admin/orders">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              Orders
            </Link>

            <div className="sb-sidenav-menu-heading">Categorys</div>
            <Link className="nav-link" to="/admin/add-category">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              Add Category
            </Link>
            <Link className="nav-link" to="/admin/view-category">
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              View Category
            </Link>
            <div className="sb-sidenav-menu-heading">Products</div>
            <Link className="nav-link" to="/admin/add-product">
              <div className="sb-nav-link-icon">
                <i className="fas fa-chart-area"></i>
              </div>
              Add products
            </Link>
            <Link className="nav-link" to="/admin/view-products">
              <div className="sb-nav-link-icon">
                <i className="fas fa-table"></i>
              </div>
              View products
            </Link>
          </div>
        </div>
        <div className="sb-sidenav-footer">
          <div className="small">Logged in as:</div>
          Start Bootstrap
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
