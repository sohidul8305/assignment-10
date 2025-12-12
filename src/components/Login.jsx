import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  // Email/Password Login
  const handleLogin = (event) => {
    event.preventDefault();
    setLoading(true);

    const email = event.target.email.value;
    const password = event.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        login(result.user);
        toast.success("Login successful!");
        navigate("/");
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setLoading(false));
  };

  // Google Login
  const handleGoogleLogin = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        login(result.user);
        toast.success("Google login successful!");
        navigate("/");
      })
      .catch(() => {
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-blue-400 w-full max-w-md shadow-2xl p-10">
          <h1 className="text-3xl font-bold text-center text-white">Login now!</h1>

          <div className="card-body">
            <form onSubmit={handleLogin}>
              <label className="label text-white">Email</label>
              <input type="email" name="email" className="input w-full" required />

              <label className="label text-white">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input w-full pr-14"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <button className="btn btn-warning w-full mt-5" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <button
              onClick={handleGoogleLogin}
              className="btn bg-white text-black border mt-3 w-full"
              disabled={loading}
            >
              {loading ? "Processing..." : "Login with Google"}
            </button>

            <div className="text-center text-white mt-4">
              Don’t have an account?
              <Link to="/register" className="text-blue-900 underline ml-1">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
