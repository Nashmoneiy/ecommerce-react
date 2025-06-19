import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container">
        <div className="row align-items-center text-center text-md-start">
          <div className="col-md-6 mb-3 mb-md-0">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Eucia. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 d-flex justify-content-center justify-content-md-end flex-wrap gap-3">
            <a
              href="#"
              className="text-white text-decoration-none small footer-link"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white text-decoration-none small footer-link"
            >
              Terms &amp; Conditions
            </a>
            <a
              href="#"
              className="text-white text-decoration-none small footer-link"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Optional styling for hover effect */}
      <style>{`
        .footer-link:hover {
          text-decoration: underline;
          color: #f8f9fa;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
