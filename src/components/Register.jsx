import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";

const Register = () => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const { setUser, updateUser } = useContext(AuthContext);

  const [nameError, setNameError] = useState("");
  const [loading, setLoading] = useState(false);

  // =============================
  // Registration
  // =============================
  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);

    const name = event.target.name.value.trim();
    const email = event.target.email.value.trim();
    const image = event.target.image.value.trim();
    const password = event.target.password.value.trim();

    // Name validation
    if (name.length < 5) {
      setNameError("Name should be more than 5 characters");
      setLoading(false);
      return;
    } else setNameError("");

    // Password validation
    const uppercaseReg = /[A-Z]/;
    const lowercaseReg = /[a-z]/;
    if (!uppercaseReg.test(password)) {
      toast.error("Password must contain at least one uppercase letter!");
      setLoading(false);
      return;
    }
    if (!lowercaseReg.test(password)) {
      toast.error("Password must contain at least one lowercase letter!");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      setLoading(false);
      return;
    }

    try {
      // ✅ Create user
      await createUserWithEmailAndPassword(auth, email, password);

      // ✅ Update profile
      const currentUser = auth.currentUser;
      await updateUser({ displayName: name, photoURL: image });

      // ✅ Update context
      setUser({ ...currentUser, displayName: name, photoURL: image });

      toast.success("Account created successfully!");
      navigate("/"); // redirect
    } catch (err) {
      console.error(err);
      toast.error(err.message);
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
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      toast.success("Logged in with Google!");
      navigate("/");
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
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Demo login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen mt-10">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-blue-400 w-full max-w-md shadow-2xl p-10">
          <h1 className="text-3xl font-bold text-center text-white mb-6">
            Register now!
          </h1>

          {/* Registration Form */}
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="label text-white">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                className="input input-bordered w-full"
                required
              />
              {nameError && (
                <p className="text-red-500 mt-1">{nameError}</p>
              )}
            </div>

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
              <label className="label text-white">Photo URL</label>
              <input
                type="text"
                name="image"
                placeholder="Enter Image URL"
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
              {loading ? "Creating account..." : "Register"}
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

          {/* Login Link */}
          <div className="flex gap-2 justify-center mt-4 text-white">
            <p>Already have an account?</p>
            <Link
              to="/login"
              className="text-blue-900 font-semibold underline hover:text-blue-700"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
