import React from "react";
import { useState } from "react";
import AxiosInstance from "../../../axiosInstance";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Category = () => {
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const [isChecked, setIsChecked] = useState(false);
  const [Image, setImage] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [InputErrorList, setInputErrorList] = useState({});
  const [CategoryInput, setCategory] = useState({
    name: "",
    slug: "",
    description: "",
    status: "",
    meta_title: "",
  });

  const handleInput = (e) => {
    e.persist();
    setCategory({ ...CategoryInput, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    e.persist();
    setImage({ image: e.target.files[0] });
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleCheckboxChange = (event) => {
    // now the .check is set to false so the function sets it to true when it is called.
    setIsChecked(event.target.checked);
    event.persist();
    setCategory({ ...CategoryInput, [event.target.name]: event.target.value });
  };

  const categorySubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
    const formData = new FormData();
    formData.append("image", Image.image);
    formData.append("name", CategoryInput.name);
    formData.append("slug", CategoryInput.slug);
    formData.append("description", CategoryInput.description);
    formData.append("meta_title", CategoryInput.meta_title);
    formData.append("status", CategoryInput.status);

    AxiosInstance.post("/api/admin/add-category", formData)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setAlert({
            show: true,
            type: "success",
            message: response.data.message,
          });
          setCategory({
            name: "",
            slug: "",
            description: "",
            status: "",
            meta_title: "",
          });

          console.log(response);
        }

        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.status === 422) {
          setInputErrorList(error.response.data.errors);
        }
        setAlert({
          show: true,
          type: "warning",
          message: "an error occoured",
        });
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
      <h4 className="mt-4">Add category</h4>

      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <Link
                to="/admin/view-category"
                className="btn btn-warning float-end"
              >
                view category
              </Link>
            </div>
            <div className="card-body">
              <form onSubmit={categorySubmit} id="category_form">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleInput}
                    value={CategoryInput.name}
                  />
                  <span className="text-danger">{InputErrorList.name}</span>
                </div>
                <div className="mb-3">
                  <label className="form-label">Slug</label>
                  <input
                    type="text"
                    name="slug"
                    onChange={handleInput}
                    value={CategoryInput.slug}
                    className="form-control"
                  />
                  <span className="text-danger">{InputErrorList.slug}</span>
                </div>
                <div className="mb-12">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    onChange={handleInput}
                    value={CategoryInput.description}
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
                    value={CategoryInput.meta_title}
                  />
                  <span className="text-danger">
                    {InputErrorList.meta_title}
                  </span>
                </div>

                <div className="mb-3">
                  <label className="form-label">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    onChange={handleImage}
                    value={CategoryInput.image}
                  />
                  <span className="text-danger">{InputErrorList.image}</span>
                </div>

                <div className="mb-3 form-check">
                  <label className="form-check-label" name="status">
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
      </div>
    </div>
  );
};
export default Category;
