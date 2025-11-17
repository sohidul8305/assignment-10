import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";

const FindPartners = () => {
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // asc / desc

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/study")
      .then((res) => {
        setPartners(res.data);
        setFilteredPartners(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch partners");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleViewProfile = (id) => {
    if (!user) {
      toast.error("Please login first!");
      navigate("/login");
    } else {
      navigate(`/partnerdetails/${id}`);
    }
  };

  const handleSendRequest = (id) => {
    if (!user) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }

    axios
      .put(`http://localhost:3000/study/${id}`)
      .then((res) => {
        if (res.data.success) {
          toast.success("Partner request sent!");
          setPartners((prev) =>
            prev.map((p) =>
              p._id === id ? { ...p, requestCount: (p.requestCount || 0) + 1 } : p
            )
          );
          setFilteredPartners((prev) =>
            prev.map((p) =>
              p._id === id ? { ...p, requestCount: (p.requestCount || 0) + 1 } : p
            )
          );
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to send request");
      });
  };

  // Format rating
  const formatRating = (rating) => (rating == null ? "⭐ N/A" : `⭐ ${rating}`);

  // Search + Filter + Sort
  const handleSearch = (event) => {
    event.preventDefault();
    let filtered = partners;

    // Search by skill / subject
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((p) =>
        Array.isArray(p.skills)
          ? p.skills.some((s) => s.toLowerCase().includes(term))
          : (p.skills || "").toLowerCase().includes(term)
      );
    }

    // Sort by experience
    filtered.sort((a, b) => {
      const expA = a.experience || 0;
      const expB = b.experience || 0;
      return sortOrder === "asc" ? expA - expB : expB - expA;
    });

    setFilteredPartners(filtered);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Find Your Study Partners
      </h2>

      {/* Search + Sort */}
      <div className="flex justify-center gap-2 mb-6 flex-wrap">
        <form onSubmit={handleSearch} className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search by skills / subject"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-full px-3 py-1 border border-gray-300 outline-none"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="rounded-full px-3 py-1 border border-gray-300"
          >
            <option value="asc">Experience: Low to High</option>
            <option value="desc">Experience: High to Low</option>
          </select>
          <button type="submit" className="btn btn-primary rounded-full px-4">
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {(filteredPartners.length > 0 ? filteredPartners : partners).map((partner) => (
          <div
            key={partner._id}
            className="relative bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition-all group"
          >
            <img
              src={partner.image || partner.profileimage || "https://via.placeholder.com/150"}
              alt={partner.name || "Partner"}
              className="w-32 h-32 rounded-full mx-auto object-cover mb-4 border-4 border-blue-500"
            />
            <h3 className="text-xl font-semibold text-center">{partner.name || "Unnamed"}</h3>

            {/* Rating */}
            <p className="text-center mt-2 text-gray-600">{formatRating(partner.rating)}</p>

            {/* Skills */}
            <p className="text-sm text-gray-500 text-center mt-1">
              {Array.isArray(partner.skills) ? partner.skills.join(", ") : partner.skills || "No skills"}
            </p>

            {/* Experience */}
            <p className="text-sm text-gray-500 text-center mt-1">
              Experience: {partner.experience || 0} years
            </p>

            <p className="absolute inset-x-0 bottom-14 text-center text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition">
              ID: {partner._id}
            </p>

            <div className="text-center mt-4 flex flex-col gap-2">
              <button
                onClick={() => handleViewProfile(partner._id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                View Profile
              </button>

              <button
                onClick={() => handleSendRequest(partner._id)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Send Partner Request ({partner.requestCount || 0})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindPartners;