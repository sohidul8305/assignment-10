import React from 'react';
import { Link } from 'react-router';

const Login = () => {
  const handleLogin = (event) =>{
   event.preventDefault()
   const email = event.target.email.value;
   const password = event.target.password.value;
   console.log(email, password)
  }
    return (
      <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
    </div>
    <div className="card bg-base-100 w-full max-w-m shrink-0 shadow-2xl bg-blue-400 p-10">
          <h1 className="text-3xl font-bold text-center">Login now!</h1>
      <div className="card-body">
      <form onSubmit={handleLogin}>
          <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" className="input" name="email" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" className="input" name="password" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-warning mt-4">Login</button>
        </fieldset>
      </form>
      {/* Google */}
<button className="btn bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>
     <div className='flex gap-5'>
         <p>Dont have an account? please</p>
  <Link to="/register">    <h2 className="relative inline-block after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-500 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300 cursor-pointer">
  Register
</h2></Link>
     </div>
      </div>
    </div>
  </div>
</div>
    );
};

export default Login;