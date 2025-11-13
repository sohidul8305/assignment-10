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

  // 🔹 Fetch all partners
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/study")
      .then((res) => {
        setPartners(res.data);
        setFilteredPartners(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // 🔹 View Profile
  const handleViewProfile = (id) => {
    if (!user) {
      navigate("/login");
      toast.error("Please login first!");
    } else {
      navigate(`/partnerdetails/${id}`);
    }
  };

  // 🔹 Send Partner Request
  const handleSendRequest = (id) => {
    if (!user) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }

    axios
      .put(`http://localhost:3000/partner-request/${id}`)
      .then((res) => {
        if (res.data.success) {
          toast.success("Partner request sent!");
          // UI update locally
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

  // 🔹 Search
  const handleSearch = (event) => {
    event.preventDefault();
    const search_text = event.target.search.value.trim();
    setLoading(true);

    if (!search_text) {
      setFilteredPartners(partners);
      setLoading(false);
      return;
    }

    const encodedText = encodeURIComponent(search_text);

    fetch(`http://localhost:3000/search?search=${encodedText}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setFilteredPartners(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Find Your Study Partners
      </h2>

      {/* 🔹 Search Form */}
      <div className="flex justify-center gap-2">
        <form onSubmit={handleSearch} className="mb-10 flex">
          <label className="input rounded-full mt-5 flex items-center px-3 border">
            <svg
              className="h-[1em] opacity-50 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              name="search"
              type="search"
              required
              placeholder="Search by skills"
              className="outline-none bg-transparent"
            />
          </label>
          <button className="btn btn-primary rounded-full mt-5 ml-2">
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {/* 🔹 Partners Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {(filteredPartners.length > 0 ? filteredPartners : partners).map(
          (partner) => (
            <div
              key={partner._id}
              className="relative bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition-all group"
            >
              <img
                src={partner.image || "https://via.placeholder.com/150"}
                alt={partner.name || "Partner"}
                className="w-32 h-32 rounded-full mx-auto object-cover mb-4 border-4 border-blue-500"
              />
              <h3 className="text-xl font-semibold text-center">
                {partner.name || "Unnamed"}
              </h3>
              <p className="text-gray-600 text-center mt-2">
                ⭐ {partner.rating ?? "N/A"}
              </p>
              <p className="text-sm text-gray-500 text-center mt-1">
                {Array.isArray(partner.skills) && partner.skills.length > 0
                  ? partner.skills.join(", ")
                  : "No skills"}
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
          )
        )}
      </div>
    </div>
  );
};

export default FindPartners;
