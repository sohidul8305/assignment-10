import React from "react";
import logo from "../assets/studylogo.jpg";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content py-10 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-start gap-8">
        
     
        <aside className="flex flex-col items-center sm:items-start text-center sm:text-left gap-4">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={logo}
            alt="Study Mate Logo"
          />
          <p className="text-sm sm:text-base">
            Study Mate Industries Ltd.
            <br />
            Very easy to use and helpful for group study sessions. Highly recommend it!
          </p>
        </aside>

        <nav className="flex flex-col items-center sm:items-end gap-4">
          <h6 className="text-lg font-semibold mb-2">Social Media Links</h6>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF className="text-blue-600 text-2xl hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://twitter.com/YourHandle"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-blue-400 text-2xl hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://www.linkedin.com/feed/?trk=guest_homepage-basic_nav-header-signin"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIn className="text-blue-700 text-2xl hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram className="text-pink-500 text-2xl hover:scale-110 transition-transform" />
            </a>
          </div>
        </nav>

      </div>
    </footer>
  );
};

export default Footer;
