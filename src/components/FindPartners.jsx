import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";

const FindPartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://assignmentserver-lovat.vercel.app/study")
      .then((res) => {
        const normalized = res.data.map((p) => ({
          ...p,
          subject: Array.isArray(p.subject) ? p.subject : p.subject ? [p.subject] : [],
        }));
        setPartners(normalized);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  const handleViewProfile = (id) => {
    if (!user) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }
    navigate(`/partnerdetails/${id}`);
  };

  const filteredPartners = partners
    .filter((p) => p.subject.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())))
    .sort((a, b) => {
      const levels = { Beginner: 1, Intermediate: 2, Expert: 3 };
      return sortOrder === "asc"
        ? (levels[a.experienceLevel] || 0) - (levels[b.experienceLevel] || 0)
        : (levels[b.experienceLevel] || 0) - (levels[a.experienceLevel] || 0);
    });

  const btnColors = [
    "bg-blue-600 hover:bg-blue-700",
    "bg-orange-500 hover:bg-orange-600",
    "bg-green-600 hover:bg-green-700",
    "bg-indigo-600 hover:bg-indigo-700",
    "bg-pink-500 hover:bg-pink-600",
    "bg-amber-400 hover:bg-amber-500",
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Find Your Study Partners</h2>

      {/* Search + Sort */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
        <select
          className="select select-bordered"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Experience: Low to High</option>
          <option value="desc">Experience: High to Low</option>
        </select>

        <input
          type="text"
          placeholder="Search by subject..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      {loading && (
        <div className="flex justify-center my-6">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {!loading && filteredPartners.length > 0 ? (
          filteredPartners.map((partner, idx) => (
            <div
              key={partner._id}
              className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition flex flex-col items-center"
            >
              <img
                src={partner.profileimage || partner.image || "https://via.placeholder.com/150"}
                alt={partner.name}
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-500"
              />
              <h3 className="text-xl font-semibold text-center">{partner.name}</h3>
              <p className="text-center text-gray-600">
                <strong>Subject:</strong> {partner.subject.join(", ")}
              </p>
              <p className="text-center text-gray-600">
                <strong>Study Mode:</strong> {partner.studyMode || "N/A"}
              </p>
              <p className="text-center text-gray-600">
                <strong>Experience Level:</strong> {partner.experienceLevel || "N/A"}
              </p>
              <p className="text-center text-gray-600">
                <strong>Partners:</strong> {partner.partnerCount || 0}
              </p>

              <div className="text-center mt-4 w-full">
                <button
                  onClick={() => handleViewProfile(partner._id)}
                  className={`block w-full px-4 py-2 text-white rounded-lg transition ${btnColors[idx % btnColors.length]}`}
                >
                  View Profile
                </button>
              </div>
            </div>
          ))
        ) : (
          !loading && <p className="col-span-full text-center text-gray-500">No partners found.</p>
        )}
      </div>
    </div>
  );
};

export default FindPartners;
