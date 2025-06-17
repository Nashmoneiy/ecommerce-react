// src/contexts/CartContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import AxiosInstance from "./axiosInstance";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    if (localStorage.getItem("auth_token")) {
      AxiosInstance.get("/api/cart")
        .then((res) => {
          if (res.status === 200) {
            setCartCount(res.data.data.length);
          }
        })
        .catch((err) => console.log(err));
    } else {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    }
  };

  useEffect(() => {
    updateCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
