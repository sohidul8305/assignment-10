import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE = "https://assignment-10-server-zeta-gold.vercel.app";

const TopStudyDetails = () => {
  const { id } = useParams();
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE}/study/${id}`)
      .then((res) => {
        if (res.data) setPartner(res.data);
        else toast.error("Partner not found");
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load partner details");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!partner) return <p className="text-center mt-10">Partner not found</p>;

  const name = partner.name || partner.fullName || "N/A";
  const image = partner.profileimage || partner.image || "https://via.placeholder.com/150";
  const rating = partner.rating || partner.rate || "N/A";
  const subjectsArray = partner.subject || partner.subjects || partner.skills || partner.skill || [];
  const subjects = Array.isArray(subjectsArray) ? subjectsArray.join(", ") : subjectsArray || "N/A";

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <img
        src={image}
        alt={name}
        className="w-40 h-40 mx-auto rounded-full border-4 border-blue-500 object-cover"
      />
      <h1 className="text-3xl font-bold text-center mt-4">{name}</h1>
      <p className="text-center text-gray-600 mt-2">⭐ {rating}</p>
      <p className="mt-4 text-center text-gray-700">
        <strong>Subjects:</strong> {subjects}
      </p>
    </div>
  );
};

export default TopStudyDetails;
