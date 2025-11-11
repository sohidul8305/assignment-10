import React, { useState, useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    console.log("User logged out");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-gray-700 text-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <NavLink to="/" className="text-xl font-bold flex gap-1">
            <span className="text-teal-400">Study</span>
            <span className="text-blue-400">Plants</span>
          </NavLink>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-5 font-bold items-center">
            <NavLink to="/"><li>Home</li></NavLink>
            <NavLink to="/findpartners"><li>Find Partners</li></NavLink>

            {user ? (
              <>
                <NavLink to="/createprofile"><li>Create Partner Profile</li></NavLink>
                <NavLink to="/myconnections"><li>My Connections</li></NavLink>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                  >
                    Logout
                  </button>
                </li>
                <li>
                  <img
                    src={user.photoURL || "https://i.ibb.co/YpJ2zH8/default-avatar.png"}
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-blue-400"
                  />
                </li>
              </>
            ) : (
              <>
                <NavLink to="/login"><li>Login</li></NavLink>
                <NavLink to="/register"><li>Register</li></NavLink>
              </>
            )}
          </ul>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-gray-700 px-4 pt-4 pb-4 space-y-2 font-bold">
          <NavLink to="/" onClick={() => setMenuOpen(false)}><li>Home</li></NavLink>
          <NavLink to="/findpartners" onClick={() => setMenuOpen(false)}><li>Find Partners</li></NavLink>

          {user ? (
            <>
              <NavLink to="/createprofile" onClick={() => setMenuOpen(false)}><li>Create Partner Profile</li></NavLink>
              <NavLink to="/myconnections" onClick={() => setMenuOpen(false)}><li>My Connections</li></NavLink>
              <li>
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded w-full text-left"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setMenuOpen(false)}><li>Login</li></NavLink>
              <NavLink to="/register" onClick={() => setMenuOpen(false)}><li>Register</li></NavLink>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
