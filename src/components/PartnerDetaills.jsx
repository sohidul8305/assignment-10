import React from "react";
import { useLoaderData } from "react-router";

const PartnerDetails = () => {

  const data = useLoaderData();
  const partner = data.result || data; 

  if (!partner) {
    return (
      <div className="text-center text-red-500 mt-10">
        No partner data found!
      </div>
    );
  }

 
  const { name, image, skills, rating, email, bio } = partner;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <div className="flex flex-col items-center text-center">
        <img
          src={image || "https://via.placeholder.com/150"}
          alt={name}
          className="w-40 h-40 rounded-full object-cover mb-4 border-4 border-blue-500"
        />
        <h2 className="text-3xl font-bold mb-2">{name}</h2>
        <p className="text-gray-600 mb-4">⭐ Rating: {rating || "N/A"}</p>
      </div>

      <div className="border-t pt-4 space-y-2 text-left">
        <p>
          <strong>Email:</strong> {email || "Not provided"}
        </p>
        <p>
          <strong>Skills:</strong>{" "}
          {Array.isArray(skills) ? skills.join(", ") : skills || "No skills listed"}
        </p>
        <p>
          <strong>Bio:</strong> {bio || "No bio available"}
        </p>
      </div>
    </div>
  );
};

export default PartnerDetails;
