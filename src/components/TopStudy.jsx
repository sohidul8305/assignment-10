import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider"; 
import toast from "react-hot-toast";

const TopStudy = () => {
  const [partners, setPartners] = useState([]);
  const { user } = useContext(AuthContext); 
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://assignment-10-server-zeta-gold.vercel.app/study")
      .then((res) => res.json())
      .then((data) => setPartners(data))
      .catch((err) => console.error(err));
  }, []);

  const topRated = [...partners]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  if (!topRated.length) {
    return (
      <div className="text-center mt-10 text-gray-500">
        No study partners found!
      </div>
    );
  }

  const handleViewProfile = (id) => {
    if (!user) {
      navigate("/login");
      toast.error("please login fast!!")
    } else {
      navigate(`/partnerdetails/${id}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🌟 Top Study Partners
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topRated.map((study) => (
          <div
            key={study._id}
            className="relative bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition-all group"
          >
            <img
              src={study.image || "https://via.placeholder.com/150"}
              alt={study.name}
              className="w-32 h-32 rounded-full mx-auto object-cover mb-4 border-4 border-blue-500"
            />

            <h3 className="text-xl font-semibold text-center">{study.name}</h3>
            <p className="text-gray-600 text-center mt-2">
              ⭐ {study.rating || "N/A"}
            </p>

            <p className="text-sm text-gray-500 text-center mt-1">
              {Array.isArray(study.skills)
                ? study.skills.join(", ")
                : study.skills || "No skills listed"}
            </p>

            <div className="text-center mt-4">
              <button
                className="btn btn-primary"
                onClick={() => handleViewProfile(study._id)}
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

export default TopStudy;
