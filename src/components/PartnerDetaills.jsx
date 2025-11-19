import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";

const API_BASE = "https://assignment-10-server-zeta-gold.vercel.app";

const PartnerDetails = () => {
  const { id } = useParams();
  const [study, setStudy] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Load Single Study Partner
  useEffect(() => {
    axios
      .get(`${API_BASE}/study/${id}`)
      .then((res) => {
        setStudy(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load details");
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
        receiverId: study._id,
      })
      .then(() => {
        toast.success("Partner Request Sent!");

        setStudy((prev) => ({
          ...prev,
          partnerCount: (prev.partnerCount || 0) + 1,
        }));
      })
      .catch(() => toast.error("Failed to send request"));
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!study) return <p className="text-center mt-10">Partner not found</p>;

  // UNIVERSAL SAFE FIELDS (MAIN FIX)
  const name = study.name || study.fullName || "Unknown";
  const image =
    study.profileimage || study.image || "https://via.placeholder.com/150";
  const rating = study.rating || study.rate || "N/A";

  const subjects =
    study.subject ||
    study.subjects ||
    study.skills ||
    study.skill ||
    "N/A";

  const studyMode = study.studyMode || study.mode || "N/A";

  const availability =
    study.availability ||
    study.availabilityTime ||
    study.time ||
    "N/A";

  const experience =
    study.experienceLevel ||
    study.experience ||
    study.level ||
    "N/A";

  const partnerCount =
    study.partnerCount || study.count || study.totalPartners || 0;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <img
        src={image}
        alt={name}
        className="w-40 h-40 mx-auto rounded-full border-4 border-blue-500 object-cover"
      />

      <h1 className="text-3xl font-bold text-center mt-4">{name}</h1>
      <p className="text-center text-gray-600 mt-2">⭐ {rating}</p>

      <div className="mt-4 space-y-2 text-gray-700">
        <p><strong>Subject:</strong> {subjects}</p>
        <p><strong>Study Mode:</strong> {studyMode}</p>
        <p><strong>Availability:</strong> {availability}</p>
        <p><strong>Location:</strong> {study.location || "N/A"}</p>
        <p><strong>Experience Level:</strong> {experience}</p>
        <p><strong>Partner Count:</strong> {partnerCount}</p>
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
