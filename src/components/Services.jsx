import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { FaUserFriends, FaChalkboardTeacher, FaLaptopCode, FaBookOpen } from "react-icons/fa";

const Services = () => {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);

  // Simulate fetching services from API
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setServices([
        {
          id: 1,
          icon: <FaUserFriends className="w-10 h-10 text-blue-600 mb-4" />,
          title: "Find Partners",
          description: "Connect with peers based on subjects, schedules, and learning goals.",
        },
        {
          id: 2,
          icon: <FaChalkboardTeacher className="w-10 h-10 text-green-600 mb-4" />,
          title: "Collaborative Learning",
          description: "Learn together, share knowledge, and solve problems efficiently.",
        },
        {
          id: 3,
          icon: <FaLaptopCode className="w-10 h-10 text-purple-600 mb-4" />,
          title: "Online Resources",
          description: "Access curated study materials, tutorials, and learning guides.",
        },
        {
          id: 4,
          icon: <FaBookOpen className="w-10 h-10 text-red-600 mb-4" />,
          title: "Track Progress",
          description: "Monitor your learning progress and stay motivated with your peers.",
        },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-10 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-50 mb-12">
        Our Services
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 text-center"
          >
            <div className="flex justify-center">{service.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {service.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-200 text-sm md:text-base">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
