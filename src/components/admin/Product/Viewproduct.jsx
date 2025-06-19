import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AxiosInstance from "../../../AxiosInstance";

const Viewproduct = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "view products";
    AxiosInstance.get("/api/admin/products")
      .then((response) => {
        if (response.status === 200) {
          setProduct(response.data.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []); // ✅ run only once when component mounts

  var productData = [];
  if (loading) {
  } else {
    var prodStatus = [];
    productData = product.map((item) => {
      if (item.status == "1") {
        prodStatus = "visible";
      } else if (item.status == "0") {
        prodStatus = "hidden";
      }
      return (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.categories.name}</td>
          <td>{item.selling_price}</td>
          <td>
            <div>{item.status === 1 ? <p>visible</p> : <p>hidden</p>}</div>
          </td>
          <td>
            <img
              src={`https://laravel-api-production-1d4a.up.railway.app/${item.image}`}
              width="50px"
              height="50px"
            />
          </td>
          <td className="p-2">
            <Link to={`edit/${item.id}`} className="btn btn-sm btn-dark">
              Edit
            </Link>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="card m-2">
      <h4>View product</h4>

      <div className="card-header">
        <Link to="/admin/add-product" className="btn btn-warning float-end">
          add product
        </Link>
      </div>
      <div className="card-body">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>selling price</th>
              <th>Status</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>{productData}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Viewproduct;
