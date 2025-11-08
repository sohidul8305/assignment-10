import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
    return (
 <div className="navbar bg-base-100 shadow-sm bg-gray-700">
  <div className="navbar-center">
    <a className="btn btn-ghost text-xl"><span className='text-teal-400'>Study</span><span className='text-blue-400'>Plants</span></a>
    <div className='ml-65'>
        <ul className='flex gap-5 font-bold'>
          <NavLink to="/"><li><a>Home</a></li></NavLink>
          <NavLink to="/findpartners"><li><a> FindPartners</a></li></NavLink>
          <NavLink to="/login"><li><a>Login</a></li></NavLink>
          /
         <NavLink><li><a>Register</a></li></NavLink>
        </ul>
    </div>
  </div>

</div>

    );
};

export default Navbar;