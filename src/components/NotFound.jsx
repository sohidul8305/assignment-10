import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
      <h1 className="text-8xl font-bold text-red-500 mb-4 animate-pulse">404</h1>
      <h2 className="text-3xl font-semibold mb-2">Oops! Page Not Found</h2>
      <p className="mb-6 text-gray-700">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
