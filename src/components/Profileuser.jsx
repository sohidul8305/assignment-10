import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Profileuser = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <img
        src={user.photoURL || "https://via.placeholder.com/150"}
        alt="User"
        className="w-32 h-32 rounded-full mb-4 object-cover"
      />
      <p><strong>Name:</strong> {user.displayName}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default Profileuser;
