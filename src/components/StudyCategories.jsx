// file name: StudyCategories.jsx
import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { FaLaptop, FaBook, FaMicroscope, FaCalculator, FaGlobe } from "react-icons/fa";

const StudyCategories = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCategories([
        { id: 1, name: "Computer Science", icon: <FaLaptop className="w-10 h-10 text-blue-500 mb-3" /> },
        { id: 2, name: "Mathematics", icon: <FaCalculator className="w-10 h-10 text-green-500 mb-3" /> },
        { id: 3, name: "Physics", icon: <FaMicroscope className="w-10 h-10 text-purple-500 mb-3" /> },
        { id: 4, name: "Languages", icon: <FaBook className="w-10 h-10 text-red-500 mb-3" /> },
        { id: 5, name: "Social Studies", icon: <FaGlobe className="w-10 h-10 text-yellow-500 mb-3" /> },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-10 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-50 mb-12">
        Study Categories
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 text-center flex flex-col items-center"
          >
            {cat.icon}
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mt-2">
              {cat.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StudyCategories;
