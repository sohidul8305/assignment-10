import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { Menu, X } from "lucide-react";
import studylogo from "../assets/studylogo.jpg";
import { FaCircleUser } from "react-icons/fa6";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || "light")

  useEffect(() => {
    const html = document.querySelector('html')
     html.setAttribute("data-theme", theme)
     localStorage.setItem("theme", theme)
  }, [theme])


  const handleTheme = (checked) => {
    setTheme(checked ? "dark": "light")
  }

  return (
    <nav className="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center gap-2">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={studylogo}
              alt="StudyMate Logo"
            />
            <NavLink to="/" className="text-2xl font-bold flex gap-1">
              <span className="text-teal-400">Study</span>
              <span className="text-blue-400">Mate</span>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6 font-semibold items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-teal-300 ${isActive ? "text-teal-400" : ""}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/findpartners"
              className={({ isActive }) =>
                `hover:text-teal-300 ${isActive ? "text-teal-400" : ""}`
              }
            >
              Find Partners
            </NavLink>

            {user ? (
              <>
                <NavLink
                  to="/createpartnerprofile"
                  className={({ isActive }) =>
                    `hover:text-teal-300 ${isActive ? "text-teal-400" : ""}`
                  }
                >
                  Create Profile
                </NavLink>

                <NavLink
                  to="/myconnections"
                  className={({ isActive }) =>
                    `hover:text-teal-300 ${isActive ? "text-teal-400" : ""}`
                  }
                >
                  My Connections
                </NavLink>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button onClick={toggleDropdown} className="focus:outline-none">
                    <img
                      src={user.photoURL || ""}
                      alt="User"
                      className="w-8 h-8 rounded-full border-2 border-blue-400 object-cover"
                    />
                    {!user.photoURL && <FaCircleUser className="w-8 h-8" />}
                  </button>

                  {dropdownOpen && (
                    <ul className="absolute right-0 mt-2 w-36 bg-gray-700 rounded shadow-lg py-1">
                      <li>
                     <Link to="/profileuser">
                        <button
                          onClick={() => navigate("/profile")}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                        >
                          Profile
                        </button>
                     </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 hover:bg-red-600"
                        >
                          Logout
                        </button>
                          <input
           onChange={(e)=> handleTheme(e.target.checked)}
           type="checkbox"
           defaultChecked={localStorage.getItem('theme') === "dark"}
           className="toggle"/>
                      </li>
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `hover:text-teal-300 ${isActive ? "text-teal-400" : ""}`
                  }
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `hover:text-teal-300 ${isActive ? "text-teal-400" : ""}`
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </ul>

      
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

     
      {menuOpen && (
        <ul className="md:hidden bg-gray-800 px-6 py-4 space-y-3 text-lg font-semibold">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            <li className="hover:text-teal-400">Home</li>
          </NavLink>

          <NavLink to="/findpartners" onClick={() => setMenuOpen(false)}>
            <li className="hover:text-teal-400">Find Partners</li>
          </NavLink>

          {user ? (
            <>
              <NavLink to="/createpartnerprofile" onClick={() => setMenuOpen(false)}>
                <li className="hover:text-teal-400">Create Profile</li>
              </NavLink>

              <NavLink to="/myconnections" onClick={() => setMenuOpen(false)}>
                <li className="hover:text-teal-400">My Connections</li>
              </NavLink>

              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="bg-red-500 hover:bg-red-600 w-full text-left px-3 py-2 rounded"
                >
                  Logout
                </button>
                 <input
           onChange={(e)=> handleTheme(e.target.checked)}
           type="checkbox"
           defaultChecked={localStorage.getItem('theme') === "dark"}
           className="toggle"/>
              </li>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                <li className="hover:text-teal-400">Login</li>
              </NavLink>

              <NavLink to="/register" onClick={() => setMenuOpen(false)}>
                <li className="hover:text-teal-400">Register</li>
              </NavLink>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;