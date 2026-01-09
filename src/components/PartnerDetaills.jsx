import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";

const API_BASE = "https://assignmentserver-lovat.vercel.app/study"; // backend URL

const PartnerDetails = () => {
  const { id } = useParams();
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const res = await axios.get(`${API_BASE}/${id}`);
        setPartner(res.data);
      } catch (err) {
        console.error("Load partner error:", err.response?.data || err.message);
        toast.error("Failed to load partner");
      } finally {
        setLoading(false);
      }
    };
    fetchPartner();
  }, [id]);

  const handleSendRequest = async () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    if (!partner?._id) {
      toast.error("Partner ID not found");
      return;
    }
    if (sending) return;

    setSending(true);

    try {
      const res = await axios.post(`${API_BASE}/${partner._id}/incrementCount`);

      console.log("API response:", res.data);

      if (res.data?.success && res.data.partner) {
        setPartner(res.data.partner); // Update UI instantly
        toast.success("Partner request sent! Count updated.");
      } else {
        toast.error(res.data?.message || "Failed to send request");
      }
    } catch (err) {
      console.error("Send request error:", err.response?.data || err.message);
      toast.error("Failed to send request. Check console.");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!partner) return <p className="text-center mt-10">Partner Not Found</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <img
        src={partner.profileimage || "https://via.placeholder.com/150"}
        alt={partner.name || "Partner"}
        className="w-40 h-40 mx-auto rounded-full border-4 border-blue-500 object-cover"
      />
      <h1 className="text-3xl font-bold text-center mt-4">{partner.name}</h1>
      <p className="text-center text-gray-600 mt-2">⭐ {partner.rating || "N/A"}</p>

      <div className="mt-4 space-y-2 text-gray-700">
        <p><strong>Subject:</strong> {partner.subject?.join(", ") || partner.subject || "N/A"}</p>
        <p><strong>Study Mode:</strong> {partner.studyMode || "N/A"}</p>
        <p><strong>Availability:</strong> {partner.availabilityTime || "N/A"}</p>
        <p><strong>Location:</strong> {partner.location || "N/A"}</p>
        <p><strong>Experience Level:</strong> {partner.experienceLevel || "N/A"}</p>
        <p><strong>Partner Count:</strong> {partner.partnerCount || 0}</p>
      </div>

      <button
        onClick={handleSendRequest}
        disabled={sending}
        className={`w-full mt-6 ${sending ? "bg-green-400" : "bg-green-600 hover:bg-green-700"} text-white py-2 rounded-lg transition`}
      >
        {sending ? "Sending..." : "Send Partner Request"}
      </button>
    </div>
  );
};

export default PartnerDetails;
