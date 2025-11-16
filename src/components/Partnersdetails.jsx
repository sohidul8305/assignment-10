import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const PartnerDetails = () => {
  const { id } = useParams(); 
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://assignment-10-server-zeta-gold.vercel.app/study`)
      .then((res) => res.json())
      .then((data) => {
        const selectedPartner = data.find((p) => p._id === id);
        setPartner(selectedPartner || null);
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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <img
        src={partner.image || "https://via.placeholder.com/150"}
        alt={partner.name}
        className="w-40 h-40 rounded-full mx-auto object-cover border-4 border-blue-500"
      />
      <h2 className="text-2xl font-bold text-center mt-4">{partner.name}</h2>
      <p className="text-center mt-2">⭐ {partner.rating || "N/A"}</p>
      <p className="text-center mt-2">
        {Array.isArray(partner.skills)
          ? partner.skills.join(", ")
          : partner.skills || "No skills listed"}
      </p>
    </div>
  );
};

export default PartnerDetails;
