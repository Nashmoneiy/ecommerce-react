import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Main from "./layouts/admin/Main";
const AdminRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(true);

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = localStorage.getItem("auth_token");

      try {
        const response = await axios.get("http://localhost:8000/api/auth", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200 && response.data.role === "user") {
          setIsAuth(false);
        } else {
          if (response.status === 200 && response.data.role === "admin") {
            setIsAuth(true);
          }
        }
      } catch (error) {
        setIsAuth(false);
      }
    };

    verifyAdmin();
  });

  if (!isAuth) return <Navigate to="/login" replace />;
  if (isAuth) return <Main />;

  return children;
};

export default AdminRoute;
