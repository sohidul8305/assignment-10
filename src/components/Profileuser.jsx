import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Profileuser = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow text-center">
        <p className="text-gray-600 text-lg">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">My Profile</h1>

      <div className="flex justify-center mb-4">
        <img
          src={user.photoURL || "https://via.placeholder.com/150"}
          alt="User"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
        />
      </div>

      <p className="text-lg">
        <strong>Name:</strong> {user.displayName || "No name available"}
      </p>

      <p className="text-lg mt-2">
        <strong>Email:</strong> {user.email || "No email found"}
      </p>
    </div>
  );
};

export default Profileuser;
