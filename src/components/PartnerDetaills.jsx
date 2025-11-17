import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const API_BASE = "http://localhost:3000";

const PartnerDetails = () => {
  const { id } = useParams();
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/study/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPartner(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!partner) return <p className="text-center mt-10">Partner not found</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <img
        src={partner.image || partner.profileimage || "https://via.placeholder.com/150"}
        alt={partner.name}
        className="w-40 h-40 mx-auto rounded-full border-4 border-blue-500 object-cover"
      />
      <h1 className="text-3xl font-bold text-center mt-4">{partner.name}</h1>
      <p className="text-center text-gray-600 mt-2">⭐ Rating: {partner.rating || "N/A"}</p>
      <p className="mt-4">
        <strong>Skills:</strong> {Array.isArray(partner.skills) ? partner.skills.join(", ") : partner.skills}
      </p>
      <p className="mt-2"><strong>Email:</strong> {partner.email || "Not Available"}</p>
      <p className="mt-2"><strong>Location:</strong> {partner.location || "Unknown"}</p>
      <p className="mt-4"><strong>About:</strong> {partner.about || "No description available"}</p>
    </div>
  );
};

export default PartnerDetails;
