import React, { useState } from 'react';
import { Link } from 'react-router';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import { Eye, EyeOff } from 'lucide-react'; // ✅ eye icon
import toast from 'react-hot-toast';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false); // 👁 toggle state
  const provider = new GoogleAuthProvider();

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    


    const uppercaseReg = /[A-Z]/;
  const lowercaseReg = /[a-z]/;

  if (!uppercaseReg.test(password)) {
    toast.error("Password must at least one uppercase letter!");
    return;
  }
  if (!lowercaseReg.test(password)) {
    toast.error("Password must at least one lowercase letter!");
    return;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long!");
    return;
  }


    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        console.log('Email login successful:', result.user);
          toast.success("Login successful!");
      })
      .catch(error => {
        console.error('Email login error:', error.message);
         toast.error("this email is already used");
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
       
        console.log('Google login successful:', user);
      })
      .catch(error => {
        console.error('Google login error:', error.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-blue-400 w-full max-w-md shadow-2xl p-10">
          <h1 className="text-3xl font-bold text-center text-white">Login now!</h1>

          <div className="card-body">
            <form onSubmit={handleLogin}>
              <fieldset className="fieldset space-y-2">
                <label className="label text-white">Email</label>
                <input
                  type="email"
                  className="input"
                  name="email"
                  placeholder="Email"
                  required
                />

                <label className="label text-white">Password</label>

                {/* 🔽 Password Input with Eye Toggle */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input w-full pr-10"
                    name="password"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-600 hover:text-black"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div><a className="link link-hover text-white">Forgot password?</a></div>
                <button className="btn btn-warning mt-4 w-full">Login</button>
              </fieldset>
            </form>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              className="btn bg-white text-black border-[#e5e5e5] w-full mt-3"
            >
              <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512" className="mr-2">
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                  <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                  <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                  <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                </g>
              </svg>
              Login with Google
            </button>

            <div className="flex gap-2 justify-center mt-4 text-white">
              <p>Don’t have an account? please</p>
              <Link to="/register" className="text-blue-900 font-semibold underline hover:text-blue-700">
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
