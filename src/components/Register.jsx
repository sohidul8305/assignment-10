import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";

const Register = () => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const { updateUser, setUser } = useContext(AuthContext);

  const [nameError, setNameError] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const image = event.target.image.value;
    const password = event.target.password.value;

    // Name validation
    if (name.length < 5) {
      setNameError("Name should be more than 5 characters");
      return;
    } else {
      setNameError("");
    }

    // Password validation
    const uppercaseReg = /[A-Z]/;
    const lowercaseReg = /[a-z]/;

    if (!uppercaseReg.test(password)) {
      toast.error("Password must contain at least one uppercase letter!");
      return;
    }
    if (!lowercaseReg.test(password)) {
      toast.error("Password must contain at least one lowercase letter!");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    try {
      // 1️⃣ Create user
      await createUserWithEmailAndPassword(auth, email, password);

      // 2️⃣ Update profile with displayName & photoURL
      const currentUser = auth.currentUser;
      await updateUser({ displayName: name, photoURL: image });

      // 3️⃣ Update context with fresh updated user
      setUser({ ...currentUser, displayName: name, photoURL: image });

      toast.success("Account created successfully!");
      navigate("/"); // Direct Home page
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      // Google user already has photoURL & displayName
      setUser(result.user);
      toast.success("Logged in with Google!");
      navigate("/"); // Direct Home page
    } catch (error) {
      console.error(error);
      toast.error("Google login failed!");
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-blue-400 w-full max-w-md shadow-2xl p-10">
          <h1 className="text-3xl font-bold text-center text-white mb-6">Register now!</h1>

          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                className="input input-bordered w-full"
                required
              />
              {nameError && <p className="text-red-500 mt-1">{nameError}</p>}
            </div>

            <div className="mb-4">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="label">Photo URL</label>
              <input
                type="text"
                name="image"
                placeholder="Enter image URL"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                className="input input-bordered w-full"
                required
              />
            </div>

            <button className="btn btn-warning w-full mt-4">Register</button>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="btn bg-white text-black border-[#e5e5e5] mt-4 w-full flex items-center justify-center"
          >
            Login with Google
          </button>

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
