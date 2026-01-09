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
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const provider = new GoogleAuthProvider();

  // =============================
  // Navigate based on role
  // =============================
  const navigateByRole = (role) => {
    if (role === "admin") navigate("/admin");
    else navigate("/dashboard");
  };

  // =============================
  // Email / Password Login
  // =============================
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);

      const role =
        email === "demo.admin@example.com" ? "admin" : "user";

      toast.success(`Logged in as ${role.toUpperCase()}`);
      navigateByRole(role);
    } catch (error) {
      console.error(error);
      toast.error("Login failed!");
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

      const role =
        res.user.email === "demo.admin@example.com" ? "admin" : "user";

      toast.success(`Logged in as ${role.toUpperCase()}`);
      navigateByRole(role);
    } catch (error) {
      console.error(error);
      toast.error("Google login failed!");
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // Demo Login
  // =============================
  const handleDemoLogin = async (role) => {
    setLoading(true);

    const demoAccounts = {
      user: {
        email: "demo.user@example.com",
        password: "DemoUser123",
      },
      admin: {
        email: "demo.admin@example.com",
        password: "DemoAdmin123",
      },
    };

    try {
      const res = await signInWithEmailAndPassword(
        auth,
        demoAccounts[role].email,
        demoAccounts[role].password
      );

      setUser(res.user);
      toast.success(`Logged in as ${role.toUpperCase()}`);
      navigateByRole(role);
    } catch (error) {
      console.error(error);
      toast.error("Demo login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content">
        <div className="card bg-blue-400 w-full max-w-md shadow-2xl p-10">
          <h1 className="text-3xl font-bold text-center text-white mb-6">
            Login
          </h1>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full mb-3"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full mb-3"
              required
            />

            <button className="btn btn-warning w-full" disabled={loading}>
              Login
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="btn bg-white text-black mt-4 w-full"
            disabled={loading}
          >
            Login with Google
          </button>

          <div className="mt-4 space-y-2">
            <button
              onClick={() => handleDemoLogin("user")}
              className="btn btn-info w-full"
            >
              Demo User Login
            </button>

            <button
              onClick={() => handleDemoLogin("admin")}
              className="btn btn-success w-full"
            >
              Demo Admin Login
            </button>
          </div>

          <p className="text-center text-white mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
