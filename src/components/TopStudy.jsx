import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";

const API_BASE = "https://assignment-10-server-zeta-gold.vercel.app";

const TopStudy = () => {
  const [partners, setPartners] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/study`)
      .then((res) => res.json())
      .then((data) => {
        const normalized = data.map((p) => ({
          ...p,
          subjectName:
            (Array.isArray(p.subject) ? p.subject.join(", ") : p.subject) ||
            (Array.isArray(p.subjects) ? p.subjects.join(", ") : p.subjects) ||
            (Array.isArray(p.skills) ? p.skills.join(", ") : p.skills) ||
            "N/A",
          studyMode: p.studyMode || p.mode || "N/A",
          availability: p.availabilityTime || p.availability || p.time || "N/A",
          experience: p.experienceLevel || p.experience || p.level || "N/A",
          partnerCount: p.partnerCount || p.count || p.totalPartners || 0,
          rating: p.rating || p.rate || "N/A",
        }));
        setPartners(normalized);
      })
      .catch((err) => console.error(err));
  }, []);

  const topRated = [...partners]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 3);

  const handleViewProfile = (partner) => {
    if (!user) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }
    navigate(`/topdetails/${partner._id}`);
  };

  if (!topRated.length) return <p className="text-center mt-10">No top study partners found</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">🌟 Top Study Partners</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topRated.map((p) => (
          <div key={p._id} className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
            <img
              src={p.profileimage || p.image || "https://via.placeholder.com/150"}
              alt={p.name}
              className="w-32 h-32 rounded-full mx-auto object-cover mb-4 border-4 border-blue-600"
            />
            <h3 className="text-xl font-semibold text-center">{p.name}</h3>
            <p className="text-center text-gray-600 mt-1">⭐ {p.rating}</p>
            <p className="text-center text-gray-700 text-sm mt-2"><strong>Subjects:</strong> {p.subjectName}</p>
            <p className="text-center text-gray-700 text-sm"><strong>Study Mode:</strong> {p.studyMode}</p>
            <p className="text-center text-gray-700 text-sm"><strong>Availability:</strong> {p.availability}</p>
            <p className="text-center text-gray-700 text-sm"><strong>Experience:</strong> {p.experience}</p>
            <p className="text-center text-gray-700 text-sm"><strong>Partner Count:</strong> {p.partnerCount}</p>

            <div className="text-center mt-4">
              <button
                onClick={() => handleViewProfile(p)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
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
