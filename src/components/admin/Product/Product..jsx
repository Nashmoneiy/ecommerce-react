import React from "react";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AxiosInstance from "./AxiosInstance";

const Product = () => {
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const [InputErrorList, setInputErrorList] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [Checked, setChecked] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ProductInput, setProduct] = useState({
    name: "",
    category: "",
    slug: "",
    brand: "",
    description: "",
    image: "",
    meta_title: "",
    quantity: "",
    selling_price: "",
    original_price: "",
    status: "",
    trending: "",
  });

  const [Image, setImage] = useState([]);

  useEffect(() => {
    AxiosInstance.get("/api/admin/all-category")
      .then((response) => {
        if (response.status === 200) {
          setCategoryList(response.data.data);
          console.log(response);
        }
      })

      .catch((error) => {
        if (error.response.data.status === 422) {
          setInputErrorList(error.response.data.errors);
        }
      });
  }, []);

  const handleInput = (e) => {
    e.persist();
    setProduct({ ...ProductInput, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    e.persist();
    setImage({ image: e.target.files[0] });
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  const handleCheckboxChange = (e) => {
    e.persist();
    setIsChecked(e.target.checked);
    setProduct({ ...ProductInput, [e.target.name]: e.target.value });
  };

  const handleTrendingChange = (event) => {
    event.persist();
    setChecked(event.target.checked);
    setProduct({ ...ProductInput, [event.target.name]: event.target.value });
  };

  const productSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    const formData = new FormData();
    formData.append("image", Image.image);
    formData.append("category", ProductInput.category);
    formData.append("name", ProductInput.name);
    formData.append("slug", ProductInput.slug);
    formData.append("brand", ProductInput.brand);
    formData.append("quantity", ProductInput.quantity);
    formData.append("description", ProductInput.description);
    formData.append("meta_title", ProductInput.meta_title);
    formData.append("status", ProductInput.status);
    formData.append("trending", ProductInput.trending);
    formData.append("original_price", ProductInput.original_price);
    formData.append("selling_price", ProductInput.selling_price);

    AxiosInstance.post("/api/admin/products", formData)
      .then((response) => {
        if (response.status === 200) {
          setAlert({
            show: true,
            type: "success",
            message: response.data.message,
          });
          setProduct({
            name: "",
            category: "",
            slug: "",
            description: "",
            meta_title: "",
            status: "",
            brand: "",
            original_price: "",
            selling_price: "",
            quantity: "",
            trending: "",
            meta_title: "",
          });
          // console.log(response.data);
        }
      })
      .catch((error) => {
        if (error.response.data.status === 422) {
          setInputErrorList(error.response.data.errors);
        }
        console.log(error);
      });
  };

  return (
    <div className="container-fluid px-4">
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
      <h4>Add product</h4>
      <div className="card">
        <div className="card-header">
          <Link to="/admin/view-products" className="btn btn-danger float-end">
            back
          </Link>
        </div>
        <div className="card-body">
          <form onSubmit={productSubmit}>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="home-tab-pane"
                  aria-selected="true"
                >
                  Home
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#seotags-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="seotags-tab-pane"
                  aria-selected="false"
                >
                  Seo tags
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home-tab-pane"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div>
                  {" "}
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={handleInput}
                      value={ProductInput.name}
                    />
                    <span className="text-danger">{InputErrorList.name}</span>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select
                      className="form-select"
                      name="category"
                      onChange={handleInput}
                      value={ProductInput.category}
                    >
                      <option>--select category--</option>

                      {categoryList.map((item) => {
                        return (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                    <span className="text-danger">
                      {InputErrorList.category}
                    </span>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Slug</label>
                    <input
                      type="text"
                      name="slug"
                      onChange={handleInput}
                      value={ProductInput.slug}
                      className="form-control"
                    />
                    <span className="text-danger">{InputErrorList.slug}</span>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Brand</label>
                    <input
                      type="text"
                      name="brand"
                      onChange={handleInput}
                      value={ProductInput.brand}
                      className="form-control"
                    />
                    <span className="text-danger">{InputErrorList.brand}</span>
                  </div>
                  <div className="mb-12">
                    <label className="form-label">Description</label>
                    <textarea
                      name="description"
                      onChange={handleInput}
                      value={ProductInput.description}
                      className="form-control m-2"
                      rows="3"
                    ></textarea>
                    <span className="text-danger">
                      {InputErrorList.description}
                    </span>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Meta_title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="meta_title"
                      onChange={handleInput}
                      value={ProductInput.meta_title}
                    />
                    <span className="text-danger">
                      {InputErrorList.meta_title}
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="seotags-tab-pane"
                role="tabpanel"
                aria-labelledby="seotags-tab"
              >
                <div className="row m-3">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">image</label>
                    <input
                      type="file"
                      name="image"
                      className="form-control"
                      accept="image/*"
                      onChange={handleImage}
                      value={ProductInput.image}
                    />
                    <img src="" alt="" />
                    <span className="text-danger">{InputErrorList.image}</span>
                    {selectedFile && (
                      <p>
                        Selected file: <strong>{selectedFile.name}</strong>
                      </p>
                    )}
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">selling price</label>
                    <input
                      type="text"
                      name="selling_price"
                      className="form-control"
                      onChange={handleInput}
                      value={ProductInput.selling_price}
                    />
                    <span className="text-danger">
                      {InputErrorList.selling_price}
                    </span>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>original price</label>
                    <input
                      type="number"
                      name="original_price"
                      className="form-control"
                      onChange={handleInput}
                      value={ProductInput.original_price}
                    />
                    <span className="text-danger">
                      {InputErrorList.original_price}
                    </span>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label>Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      className="form-control"
                      onChange={handleInput}
                      value={ProductInput.quantity}
                    />
                    <span className="text-danger">
                      {InputErrorList.quantity}
                    </span>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>status</label>
                    <input
                      type="checkbox"
                      name="status"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Trending</label>
                    <input
                      type="checkbox"
                      name="trending"
                      checked={Checked}
                      onChange={handleTrendingChange}
                    />
                  </div>
                </div>

                <button
                  variant="primary"
                  disabled={loading}
                  type="submit"
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
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Product;
