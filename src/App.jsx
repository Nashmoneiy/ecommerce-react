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
import AdminRoute from "./AdminRoute";
import Editcategory from "./components/admin/category/Editcategory";
import Product from "./components/admin/Product/Product.";
import Viewproduct from "./components/admin/Product/Viewproduct";
import Editproduct from "./components/admin/Product/Editproduct";
import Collections from "./components/frontend/Collections";
import Master from "./layouts/frontend/Master";
import Products from "./components/frontend/Products";
import Productdetail from "./components/frontend/Productdetail";
import Cart from "./components/frontend/Cart";
import Checkout from "./components/frontend/Checkout";
import { CartProvider } from "./CartContext";
import Paymentsuccess from "./components/frontend/Paymentsuccess";
//import ViewOrder from "./components/frontend/Vieworder";
import Vieworder from "./components/frontend/Vieworder";
import Orderdetails from "./components/admin/Orderdetails";
function App() {
  const isAuthenticated = () => {
    // Example: Check for a token in local storage
    const token = localStorage.getItem("auth_token");
    if (token) {
      return true;
    }
  };
  return (
    <div className="App">
      <Router>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Master />}>
              <Route exact path="/" element={<Home />} />

              <Route exact path="/cart" element={<Cart />} />
              <Route exact path="/collections" element={<Collections />} />
              <Route exact path="/collections/:slug" element={<Products />} />
              <Route exact path="/checkout" element={<Checkout />} />
              <Route
                exact
                path="/payment-success"
                element={<Paymentsuccess />}
              />
              <Route
                exact
                path="/collections/:category_slug/:product_slug"
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
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/orders">
                <Route path="/admin/orders" element={<Profiles />}></Route>
                <Route path="/admin/orders/:id" element={<Vieworder />}></Route>
              </Route>

              <Route path="/admin/add-category" element={<Category />} />
              <Route path="/admin/view-category">
                <Route path="/admin/view-category" element={<Viewcategory />} />
                <Route
                  exact
                  path="/admin/view-category/edit/:id"
                  element={<Editcategory />}
                />
              </Route>
              <Route path="/admin/add-product" element={<Product />} />
              <Route path="/admin/view-products">
                <Route path="/admin/view-products" element={<Viewproduct />} />
                <Route
                  exact
                  path="/admin/view-products/edit/:id"
                  element={<Editproduct />}
                />
              </Route>
            </Route>
          </Routes>
        </CartProvider>
      </Router>
    </div>
  );
}

export default App;
