import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";

const API_BASE = "https://assignmentserver-lovat.vercel.app/study";

const PartnerDetails = () => {
  const { id } = useParams();
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_BASE}/study/${id}`)
      .then((res) => {
        // Normalize fields
        const p = res.data;
        setPartner({
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
          location: p.location || "N/A",
          email: p.email || "N/A",
          requestCount: p.requestCount || 0
        });
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load partner details");
        setLoading(false);
      });
  }, [id]);

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
      })
      .then(() => {
        toast.success("Partner Request Sent!");
        setPartner((prev) => ({
          ...prev,
          partnerCount: (prev.partnerCount || 0) + 1
        }));
      })
      .catch(() => toast.error("Failed to send request"));
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!partner) return <p className="text-center mt-10">Partner not found</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <img
        src={partner.profileimage || partner.image || "https://via.placeholder.com/150"}
        alt={partner.name}
        className="w-40 h-40 mx-auto rounded-full border-4 border-blue-500 object-cover"
      />
      <h1 className="text-3xl font-bold text-center mt-4">{partner.name}</h1>
      <p className="text-center text-gray-600 mt-2">⭐ {partner.rating}</p>

      <div className="mt-4 space-y-2 text-gray-700">
        <p><strong>Subject:</strong> {partner.subjectName}</p>
        <p><strong>Study Mode:</strong> {partner.studyMode}</p>
        <p><strong>Availability:</strong> {partner.availability}</p>
        <p><strong>Location:</strong> {partner.location}</p>
        <p><strong>Experience Level:</strong> {partner.experience}</p>
        <p><strong>Partner Count:</strong> {partner.partnerCount}</p>
      </div>

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
