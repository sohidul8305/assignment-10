// file: StudyHighlights.jsx
import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { FaUserGraduate, FaBookOpen, FaAward, FaUsers } from "react-icons/fa";

const StudyHighlights = () => {
  const [loading, setLoading] = useState(true);
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setHighlights([
        { id: 1, title: "Active Students", value: "1,250+", icon: <FaUsers className="w-10 h-10 text-blue-500 mb-2" /> },
        { id: 2, title: "Courses Available", value: "85+", icon: <FaBookOpen className="w-10 h-10 text-green-500 mb-2" /> },
        { id: 3, title: "Successful Graduates", value: "320+", icon: <FaUserGraduate className="w-10 h-10 text-purple-500 mb-2" /> },
        { id: 4, title: "Awards & Recognition", value: "12+", icon: <FaAward className="w-10 h-10 text-yellow-500 mb-2" /> },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-10 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-50 mb-12">
        Our Highlights
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        {highlights.map((highlight) => (
          <div
            key={highlight.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 p-6 flex flex-col items-center text-center"
          >
            {highlight.icon}
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{highlight.value}</h3>
            <p className="text-gray-700 dark:text-gray-300 mt-2 font-medium">{highlight.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StudyHighlights;
