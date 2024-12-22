import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="bg-white py-10 mt-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col  md:flex-row justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center mb-2 mt-6 md:mb-0">
            <Link to="/">
              <Logo width="150" className="text-white" />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-4 mb-4 mt-10 md:mb-0 text-lg">
            <Link to="/about" className="hover:text-gray-400">
              About Us
            </Link>
            <Link to="/contact" className="hover:text-gray-400">
              Contact
            </Link>
            <Link to="/privacy" className="hover:text-gray-400">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-gray-400">
              Terms & Conditions
            </Link>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-6 text-center">
          <p>&copy; {new Date().getFullYear()} Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
