import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const TopStudyDetails = () => {
  const { id } = useParams();
  const [partner, setPartner] = useState(null);

  useEffect(() => {
    fetch(`https://assignment-10-server-zeta-gold.vercel.app/study/${id}`)
      .then((res) => res.json())
      .then((data) => setPartner(data));
  }, [id]);

  if (!partner) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-5 border rounded-xl shadow">
      <img src={partner.image} className="w-full rounded-xl" />

      <h2 className="text-2xl font-bold mt-3">{partner.name}</h2>

      <p>⭐ Rating: {partner.rating}</p>
      <p>Subject: {partner.subject}</p>
      <p>Study Mode: {partner.studyMode}</p>
      <p>Availability: {partner.availability}</p>
      <p>Experience: {partner.experience}</p>
      <p>Location: {partner.location}</p>
      <p>Partner Count: {partner.partnerCount}</p>
    </div>
  );
};

export default TopStudyDetails;
