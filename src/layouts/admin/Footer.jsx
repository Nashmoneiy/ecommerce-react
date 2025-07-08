import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5 mt-auto">
      <div className="container">
        <div className="row align-items-center text-center text-md-start">
          <div className="col-md-6 mb-3 mb-md-0">
            <p className="mb-0 footer-text">
              &copy; {new Date().getFullYear()} Eucia. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 d-flex justify-content-center justify-content-md-end flex-wrap">
            <a
              href="#"
              className="text-white text-decoration-none footer-link footer-text me-4 me-md-3"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white text-decoration-none footer-link footer-text me-4 me-md-3"
            >
              Terms &amp; Conditions
            </a>
            <a
              href="#"
              className="text-white text-decoration-none footer-link footer-text"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-text {
          font-size: 0.90rem;
        }

        @media (min-width: 576px) {
          .footer-text {
            font-size: 0.97rem;
          }
        }

        @media (min-width: 768px) {
          .footer-text {
            font-size: 0.9rem;
          }
        }

        .footer-link:hover {
          text-decoration: underline;
          color: #f8f9fa;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
