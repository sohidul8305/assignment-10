import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";

const API_BASE = "https://assignmentserver-lovat.vercel.app/study";

const TopStudy = () => {
  const [partners, setPartners] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(API_BASE)
      .then((res) => res.json())
      .then((data) => {
        const normalized = data
          .filter(p => p.rating > 0 || p.partnerCount > 0)
          .map((p) => {
            // subject প্রসেসিং
            let allSubjectsAndSkills = [];
            if (Array.isArray(p.subject)) {
              allSubjectsAndSkills = p.subject;
            } else if (typeof p.subject === "string") {
              allSubjectsAndSkills = p.subject.split(",").map(s => s.trim()).filter(Boolean);
            }

            const mainSubject = allSubjectsAndSkills[0] || null;
            const skillsList = allSubjectsAndSkills.slice(1); // baki skill গুলো

            return {
              ...p,
              name: p.name || p.fullName || "N/A",
              rating: p.rating || p.rate || 0,
              profileimage: p.profileimage || p.image || "https://via.placeholder.com/150",
              mainSubject,
              skillsArray: skillsList,
            };
          });
        setPartners(normalized);
      })
      .catch((err) => console.error(err));
  }, []);

  // rating অনুযায়ী top 3
  const topRated = [...partners].sort((a, b) => b.rating - a.rating).slice(0, 3);

  if (!topRated.length) return <p className="text-center mt-10">No top study partners found</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">🌟 Top Study Partners</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topRated.map((partner) => (
          <div key={partner._id} className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <img
              src={partner.profileimage}
              alt={partner.name}
              className="w-32 h-32 rounded-full mx-auto object-cover mb-4 border-4 border-blue-600"
            />
            <h3 className="text-xl font-semibold text-center">{partner.name}</h3>
            <p className="text-center text-gray-600 mt-1">⭐ {partner.rating}</p>

            {/* Main Subject */}
            <p className="text-center text-gray-700 text-sm mt-2">
              <strong>Main Subject:</strong> {partner.mainSubject || "No subject listed"}
            </p>

            {/* Dynamic Skill - শুধুমাত্র প্রথমটি */}
            <p className="text-center text-gray-700 text-sm mt-1">
              <strong>Skill:</strong> {partner.skillsArray[0] || "No skill listed"}
            </p>

            <div className="text-center mt-4">
              {user ? (
                <Link
                  to={`/topdetails/${partner._id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition inline-block"
                >
                  View Profile
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition inline-block"
                  onClick={() => toast.error("Please login first!")}
                >
                  View Profile
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopStudy;
