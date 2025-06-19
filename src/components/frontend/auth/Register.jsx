import React, { useState } from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Footer from "../../../layouts/admin/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👁️ import icons

function Register() {
  const navigate = useNavigate();
  const [InputErrorList, setInputErrorList] = useState({});
  const [registerInput, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // 👁️ control visibility

  const handleInput = (e) => {
    e.persist();
    setRegister({ ...registerInput, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: registerInput.name,
      email: registerInput.email,
      password: registerInput.password,
    };

    axios
      .post(
        `https://laravel-api-production-1d4a.up.railway.app/api/register`,
        data
      )
      .then((res) => {
        swal("Success", res.data.message, "success");
        navigate("/");
      })
      .catch(function (error) {
        if (error.response) {
          setInputErrorList(error.response.data.errors);
        }
      });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h5>Register</h5>
              </div>
              <div className="card-body">
                <form onSubmit={registerSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="name"
                      onChange={handleInput}
                      value={registerInput.name}
                      className="form-control"
                    />
                    <span className="text-danger">{InputErrorList.name}</span>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleInput}
                      value={registerInput.email}
                      className="form-control"
                    />
                    <span className="text-danger">{InputErrorList.email}</span>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onChange={handleInput}
                        value={registerInput.password}
                        className="form-control"
                      />
                      <span
                        className="input-group-text"
                        style={{ cursor: "pointer" }}
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    <span className="text-danger">
                      {InputErrorList.password}
                    </span>
                  </div>

                  <button type="submit" className="btn btn-dark w-100">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
