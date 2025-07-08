import React from "react";
import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.jpg";
import img4 from "../images/img4.jpg";
import img5 from "../images/img5.jpg";
import Img from "../images/img.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const images = [
    { src: img1, username: "@leoniesh", offset: "10px" },
    { src: img2, username: "", offset: "0px" },
    { src: img3, username: "", offset: "20px" },
    { src: img4, username: "", offset: "5px" },
    { src: img5, username: "@daarinh", offset: "15px" },
  ];
  const navigates = () => {
    navigate("/collections");
  };

  return (
    <div>
      <section
        className="d-flex flex-column justify-content-center align-items-center bg-light text-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="container">
          <div
            className="d-flex overflow-auto gap-1 justify-content-center pb-3"
            style={{ scrollbarWidth: "none" }}
          >
            {images.map((img, idx) => (
              <div
                key={idx}
                className="position-relative"
                style={{ marginTop: img.offset }}
              >
                <img
                  src={img.src}
                  alt={img.username}
                  className="promo-img"
                  style={{}}
                />
                {img.username && (
                  <span
                    className={`badge position-absolute bottom-0 start-50 translate-middle-x`}
                    style={{
                      backgroundColor: idx === 0 ? "#1877F2" : "#FF9900",
                      color: "white",
                    }}
                  >
                    {img.username}
                  </span>
                )}
              </div>
            ))}
          </div>
          <h3 className="mt-3">
            Buy, share and earn with people{" "}
            <span className="text-primary">like you</span>
          </h3>
          <button className="btn btn-dark mt-2" onClick={navigates}>
            Join 4000+ others
          </button>
        </div>
      </section>

      {/* 
      <section className="section bg-c-light py-5">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-12 text-center">
              <h3 className="main-heading">Our Services</h3>
              <div className="underline mx-auto"></div>
            </div>
          </div>

          <div className="row align-items-center">
           
            <div className="col-md-6 mb-4 mb-md-0">
              <div className="position-relative animate-fadeInDown">
                <img
                  src={Img}
                  alt="Shop"
                  className="img-fluid"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "15px",
                  }}
                />
                <p
                  className="position-absolute top-50 start-50 translate-middle text-secondary fw-bold px-3 py-2 rounded"
                  style={{
                    fontSize: "2.5rem",
                  }}
                >
                  SHOP NOW
                </p>
              </div>
            </div>

            
            <div className="col-md-6 border-2">
              <div
                className="p-3 rounded animate-fadeInDown"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // transparent black
                  color: "white",
                  maxHeight: "420px",
                  overflow: "hidden",
                }}
              >
                <h5 className="text-dark mb-2">What we offer</h5>
                <p className="custom-paragraph mb-2">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more or less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                </p>
                <Link to="/collections" className="btn btn-success w-50 mt-2">
                  View collections
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
       */}
    </div>
  );
};

export default Home;
