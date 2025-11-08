import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const Root = () => {
    return (
         <div className="min-h-screen max-w-[1200px] mx-auto bg-gray-50">
      <Navbar />
      <div className="p-4">
        <Outlet />  
      </div>
      <Footer />
    </div>
    );
};

export default Root;