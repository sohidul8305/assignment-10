import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router";

const Root = () => {
  const location = useLocation();

  
  const hideHeaderFooterRoutes = ["/404"]; 

  const hideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen max-w-[1200px] mx-auto bg-gray-50 flex flex-col">
      {!hideHeaderFooter && <Navbar />}

      <div className="flex-grow p-4">
        <Outlet />
      </div>

      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

export default Root;
