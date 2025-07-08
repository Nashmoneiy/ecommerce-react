import React from "react";
import Navbar from "../../layouts/frontend/Navbar";

import { useEffect, useState } from "react";
import Master from "../../layouts/frontend/Master";
import Footer from "../../layouts/admin/Footer";
import { Link } from "react-router-dom";
import mobile from "../images/mobile.jpg";
import Checkout from "./Checkout";
import AxiosInstance from "../../AxiosInstance";

const Collections = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const categoryCount = category.length;

  useEffect(() => {
    document.title = "Categories";
    AxiosInstance.get("/api/category")
      .then((response) => {
        if (response.status === 200) {
          setCategory(response.data.data);
          setLoading(false);
          // console.log(response.data.data);
        }
      })

      .catch((error) => {
        if (error.status === 404) {
          // console.log(response.data.data);
        }
      });
  });

  if (loading) {
    return (
      <div>
        <div className="col-md-12">
          <p className="m-3">Loading category details...</p>
        </div>
      </div>
    );
  } else {
    var displayCategory = [];
    if (category.length > 0) {
      displayCategory = category.map((item, idx) => {
        return (
          <div className="col-md-4" key={item.id}>
            <div className="card m-2">
              <Link to={`/collections/${item.slug}`}>
                <img
                  src={`laravel-api-production-6ecd.up.railway.app/${item.image}`}
                  className="product-image"
                />
              </Link>
              <div className="card-body">
                <Link className="name" to={`/collections/${item.slug}`}>
                  <h5 className="name">{item.name}</h5>
                </Link>
              </div>
            </div>
          </div>
        );
      });
    } else {
      displayCategory = (
        <div>
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <p>no category available at this time. check back later</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      <div className="py-3 bg-warning">
        <div className="container">
          <h4>Categories</h4>
        </div>
      </div>
      <div className="py-3 m-4">
        <div className="container">
          <div className="row">{displayCategory}</div>
        </div>
      </div>
    </div>
  );
};
export default Collections;
