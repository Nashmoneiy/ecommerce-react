import React, { useState } from "react";
import Navbar from "../../../layouts/frontend/Navbar";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Footer from "../../../layouts/admin/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // import icons

function Login() {
  const navigate = useNavigate();
  const [InputErrorList, setInputErrorList] = useState({});
  const [loginInput, setLogin] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // toggle password visibility

  const handleInput = (e) => {
    e.persist();
    setLogin({ ...loginInput, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: loginInput.email,
      password: loginInput.password,
    };

    axios
      .post(
        `https://laravel-api-production-1d4a.up.railway.app/api/login`,
        data
      )
      .then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("auth_token", res.data.token);
          localStorage.setItem("role", res.data.role);
          swal("success", res.data.message, "success");
          navigate("/");
          window.location.reload();
        }
      })
      .catch(function (error) {
        if (error.response.data.status === 422) {
          setInputErrorList(error.response.data.errors);
        }
        if (error.response.data.status === 401) {
          swal("warning", error.response.data.message, "warning");
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
                <h5>Login</h5>
              </div>
              <div className="card-body">
                <form onSubmit={loginSubmit}>
                  <div className="mb-3">
                    <label>Email address</label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleInput}
                      value={loginInput.email}
                      className="form-control"
                      aria-describedby="emailHelp"
                    />
                    <span className="text-danger">{InputErrorList.email}</span>
                  </div>

                  <div className="mb-3 position-relative">
                    <label>Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onChange={handleInput}
                        value={loginInput.password}
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

export default Login;
