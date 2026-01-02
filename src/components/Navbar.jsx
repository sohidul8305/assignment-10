import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { Menu, X, Moon, Sun } from "lucide-react";
import { FaCircleUser } from "react-icons/fa6";
import studylogo from "../assets/studylogo.jpg";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLinkClick = (path) => {
    setMenuOpen(false);
    setDropdownOpen(false);
    if (path) navigate(path);
  };

  const handleLogout = () => {
    logout();
    handleLinkClick("/");
  };

  const linkClass = ({ isActive }) =>
    `${isActive ? "text-primary dark:text-blue-400" : "text-base-content dark:text-gray-50"} hover:text-primary transition-colors duration-200`;

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <nav className="w-full bg-gradient-to-r from-primary to-secondary dark:from-gray-800 dark:to-gray-950 shadow-md sticky top-0 z-50 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={studylogo} alt="StudyMate Logo" className="h-10 w-10 rounded-full object-cover" />
            <button onClick={() => handleLinkClick("/")} className="text-2xl font-bold flex gap-1">
              <span className="text-white dark:text-blue-400">Study</span>
              <span className="text-white/90 dark:text-blue-200">Mate</span>
            </button>
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex gap-6 font-semibold items-center">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/findpartners" className={linkClass}>Find Partners</NavLink>
            <NavLink to="/about" className={linkClass}>About</NavLink>
            <NavLink to="/contact" className={linkClass}>Contact</NavLink>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-white hover:bg-white/20 transition-colors duration-200"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {user ? (
              <>
                <NavLink to="/createpartnerprofile" className={linkClass}>Create Profile</NavLink>
                <NavLink to="/myconnections" className={linkClass}>My Connections</NavLink>

                <div className="relative">
                  <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
                    {user.photoURL ? (
                      <img src={user.photoURL} className="w-9 h-9 rounded-full border-2 border-white object-cover" alt="User" />
                    ) : (
                      <FaCircleUser className="w-9 h-9 text-white transition-colors duration-200" />
                    )}
                  </button>

                  {dropdownOpen && (
                    <ul className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                      <li>
                        <button onClick={() => handleLinkClick("/profile")} className="block w-full text-left px-4 py-2 text-gray-900 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                          Profile
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 mt-1 transition-colors duration-200"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <>
                <NavLink to="/login" className={linkClass}>Login</NavLink>
                <NavLink to="/register" className={linkClass}>Register</NavLink>
              </>
            )}
          </ul>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full text-white hover:bg-white/20 transition-colors duration-200"
            >
              {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <ul className="md:hidden px-6 py-4 space-y-3 text-lg font-semibold transition-colors duration-500 border-t border-white/20">
          <NavLink to="/" onClick={() => handleLinkClick("/")} className="block hover:text-primary">Home</NavLink>
          <NavLink to="/findpartners" onClick={() => handleLinkClick("/findpartners")} className="block hover:text-primary">Find Partners</NavLink>
          <NavLink to="/about" onClick={() => handleLinkClick("/about")} className="block hover:text-primary">About</NavLink>
          <NavLink to="/contact" onClick={() => handleLinkClick("/contact")} className="block hover:text-primary">Contact</NavLink>
          {user && (
            <>
              <NavLink to="/createpartnerprofile" onClick={() => handleLinkClick("/createpartnerprofile")} className="block hover:text-primary">Create Profile</NavLink>
              <NavLink to="/myconnections" onClick={() => handleLinkClick("/myconnections")} className="block hover:text-primary">My Connections</NavLink>
              <button onClick={handleLogout} className="w-full text-white bg-red-600 hover:bg-red-700 rounded py-2 mt-2">Logout</button>
            </>
          )}
          {!user && (
            <>
              <NavLink to="/login" className="block hover:text-primary">Login</NavLink>
              <NavLink to="/register" className="block hover:text-primary">Register</NavLink>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
