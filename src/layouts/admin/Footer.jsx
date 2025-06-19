import React from "react";

const Footer = () => {
  return (
    <footer className="py-4 bg-dark mt-auto footer text-white">
      <div className="container-fluid px-4">
        <div className="d-flex align-items-center justify-content-between small">
          <div className="text-white">Copyright &copy; Eucia 2025</div>
          <div className="m-2">
            <a href="#" className="text-white text-decoration-none m-1">
              Privacy Policy
            </a>
            &nbsp;&middot;&nbsp;
            <a href="#" className="text-white text-decoration-none m-2">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
