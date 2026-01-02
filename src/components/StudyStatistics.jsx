// file: StudyStatistics.jsx
import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { FaUserGraduate, FaBook, FaClock, FaUsers } from "react-icons/fa";

const StudyStatistics = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    setLoading(true);
    // Simulate API fetch
    setTimeout(() => {
      setStats([
        { id: 1, label: "Active Students", value: 1250, icon: <FaUsers className="w-12 h-12 text-blue-500 mb-2" /> },
        { id: 2, label: "Courses Completed", value: 860, icon: <FaBook className="w-12 h-12 text-green-500 mb-2" /> },
        { id: 3, label: "Study Hours", value: 4520, icon: <FaClock className="w-12 h-12 text-purple-500 mb-2" /> },
        { id: 4, label: "Successful Graduates", value: 320, icon: <FaUserGraduate className="w-12 h-12 text-yellow-500 mb-2" /> },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-10 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-50 mb-12">
        Our Statistics
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform transition-all hover:scale-105 hover:shadow-2xl"
          >
            {stat.icon}
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              {stat.value.toLocaleString()}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mt-2 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StudyStatistics;
