import React from "react";
import Img from "../images/img.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <section className="section py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center animate-fadeInDown">
              <h3 className="main-heading">Our company</h3>
              <div className="underline mx-auto"></div>
              <p className="">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
              <Link to="/about" className="btn btn-warning">
                Read more
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-c-light py-5">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-12 text-center">
              <h3 className="main-heading">Our Services</h3>
              <div className="underline mx-auto"></div>
            </div>
          </div>

          <div className="row align-items-center">
            {/* Image + caption */}
            <div className="col-md-6 mb-4 mb-md-0">
              <div className="position-relative animate-fadeInDown">
                <img
                  src={Img}
                  alt="Shop"
                  className="img-fluid"
                  style={{ width: "100%", height: "auto" }}
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

            {/* Text content */}
            <div className="col-md-6 border-2">
              <div
                className="p-4 rounded animate-fadeInDown"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent black
                  color: "white",
                }}
              >
                <h5 className="" style={{ color: "black" }}>
                  What we offer
                </h5>
                <p className="col-12 p-1  offer">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                </p>

                <Link to="/collections" className="btn btn-success w-50 mt-3">
                  View collections
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
