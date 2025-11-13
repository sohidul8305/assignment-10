import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";

const FindPartners = () => {
  const [study, setPartners] = useState([]);
  const { user } = useContext(AuthContext); 
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/study")
      .then((res) => setPartners(res.data))
   
      .catch((err) => console.error(err));
     
  }, []);

  const handleViewProfile = (id) => {
    if (!user) {
      navigate("/login"); 
          toast.error("please login fast!")
    } else {
      navigate(`/partnerdetails/${id}`); 
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Find Your Study Partners
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {study.map((partner) => (
          <div
            key={partner._id}
            className="relative bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition-all group"
          >
            <img
              src={partner.image || "https://via.placeholder.com/150"}
              alt={partner.name}
              className="w-32 h-32 rounded-full mx-auto object-cover mb-4 border-4 border-blue-500"
            />
            <h3 className="text-xl font-semibold text-center">{partner.name}</h3>
            <p className="text-gray-600 text-center mt-2">
              ⭐ {partner.rating || "N/A"}
            </p>
            <p className="text-sm text-gray-500 text-center mt-1">
              {Array.isArray(partner.skills)
                ? partner.skills.join(", ")
                : partner.skills || "No skills"}
            </p>
            <p className="absolute inset-x-0 bottom-14 text-center text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition">
              ID: {partner._id}
            </p>
            <div className="text-center mt-4">
              <button
                onClick={() => handleViewProfile(partner._id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindPartners;
