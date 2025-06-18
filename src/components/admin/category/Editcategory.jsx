import React from "react";
import { useState, useEffect } from "react";
axiosInstance;
import { Link } from "react-router-dom";
//import axios from "axios";

import { useParams } from "react-router-dom";
import axiosInstance from "../../../AxiosInstance";

const Editcategory = () => {
  const { id } = useParams();
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [CategoryInput, setCategory] = useState({
    name: "",
    slug: "",
    description: "",
    status: "",
    meta_title: "",
  });

  useEffect(() => {
    AxiosInstance.get(`/api/admin/add-category/${id}`).then((response) => {
      setCategory(response.data); // Set initial input values
    });
  }, [id]);

  const handleCheckboxChange = (event) => {
    // now the .check is set to false so the function sets it to true when it is called.
    setIsChecked(event.target.checked);
    event.persist();
    setCategory({ ...CategoryInput, [event.target.name]: event.target.value });
  };

  const handleInput = (e) => {
    e.persist();
    setCategory({ ...CategoryInput, [e.target.name]: e.target.value });
  };

  const updateCategory = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
    const data = CategoryInput;
    AxiosInstance.put(`/api/admin/add-category/${id}`, data)
      .then((response) => {
        setAlert({
          show: true,
          type: "success",
          message: response.data.message,
        });
        console.log(response.data);
      })
      .catch((error) => {
        if (error) {
          console.error(error.config);
        }
      });
  };

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
      <div className="col-md-12 m-2">
        <h4>Edit category</h4>

        <div className="card-header">
          <Link to="/admin/view-category" className="btn btn-danger float-end">
            back
          </Link>
        </div>
        <div className="card-body">
          <form onSubmit={updateCategory}>
            <div className="mb-3 col-md-8">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={CategoryInput.name}
                onChange={handleInput}
              />
            </div>
            <div className="mb-3 col-md-8">
              <label className="form-label">Slug</label>
              <input
                type="text"
                name="slug"
                className="form-control"
                value={CategoryInput.slug}
                onChange={handleInput}
              />
            </div>
            <div className="col-md-10">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control m-2"
                rows="3"
                value={CategoryInput.description}
                onChange={handleInput}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Meta_title</label>
              <input
                type="text"
                className="form-control"
                name="meta_title"
                value={CategoryInput.meta_title}
                onChange={handleInput}
              />
            </div>
            <div className="mb-3 ">
              <label className="" name="status">
                Status
              </label>
              <input
                type="checkbox"
                name="status"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </div>
            <button
              type="submit"
              variant="primary"
              disabled={loading}
              className="btn btn-success"
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Editcategory;
