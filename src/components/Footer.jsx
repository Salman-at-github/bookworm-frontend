import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-teal-500 text-white py-4 text-center">
      <div className="container mx-auto">
        <p className="font-semibold text-lg mb-1">
          © {new Date().getFullYear()} BookWorm. All rights reserved.
        </p>
        <div className="flex justify-center">
          <Link
            to="/#privacy"
            className="text-white hover:text-black mr-4"
          >
            Privacy Policy
          </Link>
          <Link to="/#terms" className="text-white hover:text-black">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
