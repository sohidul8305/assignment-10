import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { Menu, X } from "lucide-react";
import { FaCircleUser } from "react-icons/fa6";
import studylogo from "../assets/studylogo.jpg";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();

  // DaisyUI theme toggle
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // helper class for links
  const linkClass = ({ isActive }) =>
    `${isActive ? "text-primary" : "text-base-content dark:text-gray-100"} hover:text-primary-focus`;

  return (
    <nav className="bg-base-100 text-base-content shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src={studylogo}
              alt="StudyMate Logo"
              className="h-10 w-10 rounded-full object-cover"
            />
            <NavLink to="/" className="text-2xl font-bold flex gap-1">
              <span className="text-primary dark:text-gray-100">Study</span>
              <span className="text-secondary dark:text-gray-100">Mate</span>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 font-semibold items-center">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/findpartners" className={linkClass}>Find Partners</NavLink>

            {user ? (
              <>
                <NavLink to="/createpartnerprofile" className={linkClass}>Create Profile</NavLink>
                <NavLink to="/myconnections" className={linkClass}>My Connections</NavLink>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="focus:outline-none"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        className="w-8 h-8 rounded-full border-2 border-primary object-cover"
                        alt="User"
                      />
                    ) : (
                      <FaCircleUser className="w-8 h-8 text-base-content dark:text-gray-100" />
                    )}
                  </button>
                  {dropdownOpen && (
                    <ul className="absolute right-0 mt-2 w-44 bg-base-200 dark:bg-gray-800 rounded shadow-lg py-1 z-50">
                      <li>
                        <button
                          onClick={() => navigate("/profile")}
                          className="block w-full text-left px-4 py-2 text-base-content dark:text-gray-100 hover:bg-base-300 dark:hover:bg-gray-700"
                        >
                          Profile
                        </button>
                      </li>
                      <li className="flex items-center justify-between px-4 py-2 text-base-content dark:text-gray-100 hover:bg-base-300 dark:hover:bg-gray-700">
                        <span>Dark Mode</span>
                        <input
                          type="checkbox"
                          checked={theme === "dark"}
                          onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
                          className="toggle toggle-primary"
                        />
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-base-content dark:text-gray-100 hover:bg-red-500 dark:hover:bg-red-600"
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

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <X size={28} className="text-base-content dark:text-gray-100" />
              ) : (
                <Menu size={28} className="text-base-content dark:text-gray-100" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-base-100 dark:bg-gray-900 px-6 py-4 space-y-3 text-lg font-semibold text-base-content dark:text-gray-100">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className="block">Home</NavLink>
          <NavLink to="/findpartners" onClick={() => setMenuOpen(false)} className="block">Find Partners</NavLink>
          {user ? (
            <>
              <NavLink to="/createpartnerprofile" onClick={() => setMenuOpen(false)} className="block">Create Profile</NavLink>
              <NavLink to="/myconnections" onClick={() => setMenuOpen(false)} className="block">My Connections</NavLink>
              <li className="flex items-center justify-between px-3 py-2 hover:bg-base-300 dark:hover:bg-gray-700 rounded text-base-content dark:text-gray-100">
                <span>Dark Mode</span>
                <input
                  type="checkbox"
                  checked={theme === "dark"}
                  onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
                  className="toggle toggle-primary"
                />
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded bg-red-500 hover:bg-red-600 dark:hover:bg-red-700 text-base-content dark:text-gray-100"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setMenuOpen(false)} className="block">Login</NavLink>
              <NavLink to="/register" onClick={() => setMenuOpen(false)} className="block">Register</NavLink>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
