import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";

const API_BASE = "http://localhost:3000";

const PartnerDetails = () => {
  const { id } = useParams();
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch partner details
  useEffect(() => {
    axios
      .get(`${API_BASE}/study/${id}`)
      .then((res) => {
        setPartner(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load partner details");
        setLoading(false);
      });
  }, [id]);

  // Send Partner Request
  const handleSendRequest = () => {
    if (!user) {
      toast.error("Please login first!");
      navigate("/login");
      return;
    }

    axios
      .post(`${API_BASE}/partnerRequests`, {
        senderId: user.uid,
        receiverId: partner._id,
        status: "pending",
        createdAt: new Date(),
      })
      .then(() => {
        toast.success("Partner request sent!");
        // UI update: partnerCount +1
        setPartner((prev) => ({
          ...prev,
          partnerCount: (prev.partnerCount || 0) + 1,
        }));
      })
      .catch(() => toast.error("Failed to send request"));
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!partner) return <p className="text-center mt-10">Partner not found</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      {/* Profile Image */}
      <img
        src={partner.image || partner.profileimage || "https://via.placeholder.com/150"}
        alt={partner.name}
        className="w-40 h-40 mx-auto rounded-full border-4 border-blue-500 object-cover"
      />

      {/* Name & Rating */}
      <h1 className="text-3xl font-bold text-center mt-4">{partner.name}</h1>
      <p className="text-center text-gray-600 mt-2">⭐ {partner.rating || "N/A"}</p>

      {/* Partner Info */}
      <div className="mt-4 space-y-2 text-gray-700">
        <p><strong>Subject:</strong> {partner.subject || "N/A"}</p>
        <p><strong>Study Mode:</strong> {partner.studyMode || "N/A"}</p>
        <p><strong>Availability:</strong> {partner.availability || "N/A"}</p>
        <p><strong>Location:</strong> {partner.location || "N/A"}</p>
        <p><strong>Experience Level:</strong> {partner.experienceLevel || "N/A"}</p>
        <p><strong>Partner Count:</strong> {partner.partnerCount || 0}</p>
      </div>

      {/* Send Partner Request Button */}
      <button
        onClick={handleSendRequest}
        className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
      >
        Send Partner Request
      </button>
    </div>
  );
};

export default PartnerDetails;
