import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "../admin/Footer";

const Master = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <Navbar />
      </header>

      <main className="flex-fill">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Master;
