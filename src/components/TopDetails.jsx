import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE = "https://assignmentserver-lovat.vercel.app/study";

const TopStudyDetails = () => {
  const { id } = useParams();
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE}/${id}`)
      .then((res) => {
        setPartner(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load partner details");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10 font-semibold">Loading...</p>;
  if (!partner) return <p className="text-center mt-10 text-red-500">Partner not found!</p>;

  // Name, Image, Rating
  const name = partner.name || partner.fullName || "N/A";
  const image = partner.profileimage || partner.image || "https://via.placeholder.com/150";
  const rating = partner.rating || partner.rate || 0;

  // Subject & Skills logic
  const subjectsArray = partner.subject || [];
  let subject = [];
  let skills = [];

  if (Array.isArray(subjectsArray) && subjectsArray.length > 0) {
    subject.push(subjectsArray[0]);       // প্রথমটি subject
    if (subjectsArray[1]) skills.push(subjectsArray[1]); // দ্বিতীয়টি skills
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800">
      <img
        src={image}
        alt={name}
        className="w-40 h-40 mx-auto rounded-full object-cover shadow"
      />

      <h2 className="text-3xl font-bold text-center mt-4 dark:text-white">{name}</h2>
      <p className="text-lg text-center mt-2 dark:text-gray-200">⭐ Rating: {rating}</p>

      <div className="mt-4 space-y-2 text-center">
        <p className="text-lg dark:text-gray-200">
          <strong>Subject:</strong> {subject.join(", ") || "No subject listed"}
        </p>
        <p className="text-lg dark:text-gray-200">
          <strong>Skills:</strong> {skills.join(", ") || "No skills listed"}
        </p>
      </div>
    </div>
  );
};

export default TopStudyDetails;
