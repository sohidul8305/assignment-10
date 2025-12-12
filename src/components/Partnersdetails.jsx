import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";

const API_BASE = "http://localhost:3000"; // backend URL

const PartnerDetails = () => {
  const { id } = useParams();
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // ======================
  // LOAD PARTNER DETAILS
  // ======================
  useEffect(() => {
    axios
      .get(`${API_BASE}/study/${id}`)
      .then((res) => {
        setPartner(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load partner");
        setLoading(false);
      });
  }, [id]);

  // ======================
  // SEND REQUEST + COUNT +1
  // ======================
  const handleSendRequest = async () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    if (sending) return;

    setSending(true);

    try {
      // Increment partnerCount
      const res = await axios.post(`${API_BASE}/study/${partner._id}/incrementCount`);
      if (res.data.success) {
        // UI-তে count update
        setPartner((prev) => ({ ...prev, partnerCount: prev.partnerCount + 1 }));
        toast.success("Partner request sent!");
      } else {
        toast.error("Failed to send request");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send request");
    } finally {
      setSending(false);
    }
  };

  // ======================
  // UI
  // ======================
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!partner) return <p className="text-center mt-10">Partner Not Found</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <img
        src={partner.profileimage || partner.image || "https://via.placeholder.com/150"}
        alt={partner.name || "Partner"}
        className="w-40 h-40 mx-auto rounded-full border-4 border-blue-500 object-cover"
      />
      <h1 className="text-3xl font-bold text-center mt-4">{partner.name}</h1>
      <p className="text-center text-gray-600 mt-2">⭐ {partner.rating || "N/A"}</p>

      <div className="mt-4 space-y-2 text-gray-700">
        <p>
          <strong>Subject:</strong>{" "}
          {Array.isArray(partner.subject) ? partner.subject.join(", ") : partner.subject || "N/A"}
        </p>
        <p>
          <strong>Study Mode:</strong> {partner.studyMode || partner.mode || "N/A"}
        </p>
        <p>
          <strong>Availability:</strong> {partner.availabilityTime || partner.time || "N/A"}
        </p>
        <p>
          <strong>Location:</strong> {partner.location || "N/A"}
        </p>
        <p>
          <strong>Experience Level:</strong> {partner.experienceLevel || partner.level || "N/A"}
        </p>
        <p>
          <strong>Partner Count:</strong> {partner.partnerCount || 0}
        </p>
      </div>

      <button
        onClick={handleSendRequest}
        disabled={sending}
        className={`w-full mt-6 ${
          sending ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
        } text-white py-2 rounded-lg transition`}
      >
        {sending ? "Sending..." : "Send Partner Request"}
      </button>
    </div>
  );
};

export default PartnerDetails;
