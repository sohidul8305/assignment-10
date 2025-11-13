import React, { useEffect, useState } from "react";
import { Link } from "react-router";
const TopStudy = () => {
  const [partners, setPartners] = useState([]);

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🌟 Top Study Partners
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topRated.map((partner) => (
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
                : partner.skills || "No skills listed"}
            </p>

         
            <p className="absolute inset-x-0 bottom-14 text-center text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition">
              ID: {partner._id}
            </p>

      
            <div className="text-center mt-4">
           <button
 
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

export default TopStudy;
