import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, role } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const provider = new GoogleAuthProvider();

  // =============================
  // Helper: navigate based on role
  // =============================
  const navigateByRole = (userRole) => {
    if (userRole === "admin") navigate("/admin");
    else navigate("/dashboard");
  };

  // =============================
  // Email/Password Login
  // =============================
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    const email = event.target.email.value.trim();
    const password = event.target.password.value.trim();

    if (!email || !password) {
      toast.error("Email and password are required!");
      setLoading(false);
      return;
    }

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);

      // 🔑 Detect role for redirect
      const userRole = email === "demo.admin@example.com" ? "admin" : "user";

      toast.success(`Logged in as ${userRole.toUpperCase()}`);
      navigateByRole(userRole);
    } catch (err) {
      console.error(err);
      toast.error("Login failed! Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // Google Login
  // =============================
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, provider);
      setUser(res.user);

      // 🔑 Detect role for redirect
      const userRole = res.user.email === "demo.admin@example.com" ? "admin" : "user";

      toast.success(`Logged in as ${userRole.toUpperCase()}`);
      navigateByRole(userRole);
    } catch (err) {
      console.error(err);
      toast.error("Google login failed!");
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // Demo Login (auto-fill)
  // =============================
  const handleDemoLogin = async (type) => {
    setLoading(true);

    let email = "";
    let password = "";

    if (type === "user") {
      email = "demo.user@example.com";
      password = "DemoUser123";
    } else if (type === "admin") {
      email = "demo.admin@example.com";
      password = "DemoAdmin123";
    }

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      toast.success(`Logged in as ${type.toUpperCase()}`);
      navigateByRole(type); // type is 'user' or 'admin'
    } catch (err) {
      console.error(err);
      toast.error("Demo login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-blue-400 w-full max-w-md shadow-2xl p-10">
          <h1 className="text-3xl font-bold text-center text-white mb-6">
            Login
          </h1>

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="label text-white">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="label text-white">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                className="input input-bordered w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-warning w-full mt-4"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Social Login */}
          <button
            onClick={handleGoogleLogin}
            className="btn bg-white text-black border mt-4 w-full flex items-center justify-center"
            disabled={loading}
          >
            {loading ? "Processing..." : "Login with Google"}
          </button>

          {/* Demo Login Buttons */}
          <div className="flex flex-col gap-2 mt-4">
            <button
              onClick={() => handleDemoLogin("user")}
              className="btn btn-info w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Demo User Login"}
            </button>
            <button
              onClick={() => handleDemoLogin("admin")}
              className="btn btn-success w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Demo Admin Login"}
            </button>
          </div>

          {/* Register Link */}
          <div className="flex gap-2 justify-center mt-4 text-white">
            <p>Don't have an account?</p>
            <Link
              to="/register"
              className="text-blue-900 font-semibold underline hover:text-blue-700"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
