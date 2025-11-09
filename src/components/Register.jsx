import React from "react";
import { Link } from "react-router";

const Register = () => {
  const handleRegister = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const image = event.target.image.value;
    const password = event.target.password.value;

    console.log(name, email, image, password);
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left"></div>
        <div className="card bg-base-100 w-full max-w-m shrink-0 shadow-2xl bg-blue-400 p-10">
          <h1 className="text-3xl font-bold text-center">Register now!</h1>
          <div className="card-body">
            <form onSubmit={handleRegister}>
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input
                  type="text"
                  className="input"
                  name="name"
                  placeholder="Inter Your Name"
                />
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Inter Your Email"
                  name="email"
                />
                <label className="label font-semibold">Photo URL</label>
                <input
                  type="text"
                  placeholder="Enter image URL"
                  className="input input-bordered w-full"
                  name="image"
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Inter Your Password"
                  name="password"
                />
                <button className="btn btn-warning mt-4">Register</button>
              </fieldset>
            </form>
            {/* Google */}
            <button className="btn bg-white text-black border-[#e5e5e5]">
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
           <div className="flex gap-2 justify-center mt-4 text-white ml-50">
                         {/* <p>Conggrates you create account</p> */}
                         <Link to="/login" className="text-blue-900 font-semibold underline hover:text-blue-700">
                           Login
                         </Link>
                       </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
