import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "alertifyjs/build/css/alertify.min.css";
import "alertifyjs/build/css/themes/default.min.css";

import Dashboard from "./components/admin/Dashboard";
import Profiles from "./components/admin/Profiles";
import Home from "./components/frontend/Home";
import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";
import Category from "./components/admin/category/Category";
import Viewcategory from "./components/admin/category/Viewcategory";
import Editcategory from "./components/admin/category/Editcategory";
import Product from "./components/admin/Product/Product";
import Viewproduct from "./components/admin/Product/Viewproduct";
import Editproduct from "./components/admin/Product/Editproduct";

import Collections from "./components/frontend/Collections";
import Master from "./layouts/frontend/Master";
import Products from "./components/frontend/Products";
import Productdetail from "./components/frontend/Productdetail";
import Cart from "./components/frontend/Cart";
import Checkout from "./components/frontend/Checkout";
import Paymentsuccess from "./components/frontend/Paymentsuccess";
import Vieworder from "./components/frontend/Vieworder";
import Orderdetails from "./components/admin/Orderdetails";

import AdminRoute from "./AdminRoute";
import { CartProvider } from "./CartContext";

function App() {
  const isAuthenticated = () => {
    const token = localStorage.getItem("auth_token");
    return !!token;
  };

  return (
    <div className="App">
      <Router>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Master />}>
              <Route index element={<Home />} />
              <Route path="cart" element={<Cart />} />
              <Route path="collections" element={<Collections />} />
              <Route path="collections/:slug" element={<Products />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="payment-success" element={<Paymentsuccess />} />
              <Route
                path="collections/:category_slug/:product_slug"
                element={<Productdetail />}
              />
            </Route>

            <Route
              path="/login"
              element={
                isAuthenticated() ? <Navigate to="/" replace /> : <Login />
              }
            />
            <Route
              path="/register"
              element={
                isAuthenticated() ? <Navigate to="/" replace /> : <Register />
              }
            />

            <Route path="/admin" element={<AdminRoute />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="orders" element={<Profiles />} />
              <Route path="orders/:id" element={<Vieworder />} />

              <Route path="add-category" element={<Category />} />
              <Route path="view-category" element={<Viewcategory />} />
              <Route path="view-category/edit/:id" element={<Editcategory />} />

              <Route path="add-product" element={<Product />} />
              <Route path="view-products" element={<Viewproduct />} />
              <Route path="view-products/edit/:id" element={<Editproduct />} />
            </Route>
          </Routes>
        </CartProvider>
      </Router>
    </div>
  );
}

export default App;
