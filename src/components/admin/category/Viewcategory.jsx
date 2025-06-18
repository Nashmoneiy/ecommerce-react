import React from "react";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import AxiosInstance from "./AxiosInstance";

function viewcategory() {
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategory] = useState([]);

  useEffect(() => {
    AxiosInstance.get("/api/admin/add-category")
      .then((response) => {
        if (response.status === 200) {
          setCategory(response.data.data);
        }
        setLoading(false);
      })

      .catch((error) => {});
  });

  const deleteCategory = (e, id) => {
    e.preventDefault();
    const clicked = e.currentTarget;

    AxiosInstance.delete(`/api/admin/add-category/${id}`).then((response) => {
      if (response.status === 200) {
        setAlert({
          show: true,
          type: "success",
          message: response.data.message,
        });
        clicked.closest("tr").remove;
        console.log(response);
      }
    });
  };

  var viewcategory_HTMLTABLE = [];
  if (loading) {
  } else {
    viewcategory_HTMLTABLE = categoryList.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.slug}</td>
          <td>{item.description}</td>
          <td>
            <div>{item.status === 1 ? <p>visible</p> : <p>hidden</p>}</div>
          </td>
          <td className="p-1">
            <Link to={`edit/${item.id}`} className="btn btn-sm btn-dark">
              Edit
            </Link>
            <button
              type="button"
              className="btn btn-danger deletebtn btn-sm m-1"
              onClick={(e) => deleteCategory(e, item.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }
  return (
    <div className="card">
      {alert.show && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show mt-2`}
          role="alert"
        >
          {alert.message}
          <button
            type="button"
            className="btn-close"
            onClick={() => setAlert({ ...alert, show: false })}
          ></button>
        </div>
      )}

      <div className="card-header">
        <h4>All categories</h4>
        <Link to="/admin/add-category" className="btn btn-warning float-end">
          add category
        </Link>
      </div>
      <div className="card-body">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{viewcategory_HTMLTABLE}</tbody>
        </table>
      </div>
    </div>
  );
}
export default viewcategory;
