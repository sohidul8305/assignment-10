import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Profileuser = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-base-100 dark:bg-gray-800 rounded-xl shadow text-center">
        <p className="text-base-content dark:text-gray-200 text-lg">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-100 dark:bg-gray-800 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary dark:text-gray-100">
        My Profile
      </h1>

      <div className="flex justify-center mb-6">
        <img
          src={user.photoURL || "https://via.placeholder.com/150"}
          alt="User"
          className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-md"
        />
      </div>

      <p className="text-lg text-base-content dark:text-gray-200">
        <strong className="text-primary">Name:</strong>{" "}
        {user.displayName || "No name available"}
      </p>

      <p className="text-lg mt-3 text-base-content dark:text-gray-200">
        <strong className="text-primary">Email:</strong>{" "}
        {user.email || "No email found"}
      </p>

      <p className="text-sm mt-4 text-gray-500 dark:text-gray-400 text-center">
        User ID: {user.uid}
      </p>
    </div>
  );
};

export default Profileuser;
