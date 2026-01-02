import React from "react";
import logo from "../assets/studylogo.jpg";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Logo & Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
          <img
            src={logo}
            alt="StudyMate Logo"
            className="h-14 w-14 rounded-full object-cover"
          />
          <p className="text-sm md:text-base leading-relaxed">
            StudyMate Industries Ltd. <br />
            Your ultimate platform to find study partners, collaborate, and achieve learning goals together.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
          <h6 className="text-lg font-semibold mb-2">Quick Links</h6>
          <Link to="/" className="hover:text-blue-500 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-blue-500 transition-colors">About</Link>
          <Link to="/findpartners" className="hover:text-blue-500 transition-colors">Find Partners</Link>
          <Link to="/topstudy" className="hover:text-blue-500 transition-colors">TopStudy</Link>
          <Link to="/contact" className="hover:text-blue-500 transition-colors">Contact</Link>
        </div>

        {/* Contact & Social Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
          <h6 className="text-lg font-semibold mb-2">Contact & Social</h6>
          <p>Email: <a href="mailto:sohidul8305@gmail.com" className="hover:text-blue-500 transition-colors">sohidul8305@gmail.com</a></p>
          <p>Phone: <a href="tel:+8801540659004" className="hover:text-blue-500 transition-colors">+880 1540659004</a></p>
          <p>Address: Airport, Dhaka, Bangladesh</p>
          <div className="flex space-x-4 mt-2">
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
              <FaFacebookF className="text-blue-600 text-2xl hover:scale-110 transition-transform" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer">
              <FaTwitter className="text-blue-400 text-2xl hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
              <FaLinkedinIn className="text-blue-700 text-2xl hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <FaInstagram className="text-pink-500 text-2xl hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} StudyMate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
