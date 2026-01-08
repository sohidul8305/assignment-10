import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import aboutImage from "../assets/about-study.jpg";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[40vh] mt-8">
      <span className="loading loading-spinner loading-xl"></span>
    </div>
  );
};

const About = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading delay (e.g., fetching data)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // 1.2s delay
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[500px] xl:h-[600px] overflow-hidden">
        <img
          src={aboutImage}
          alt="Study Partners"
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4 md:px-10 lg:px-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-lg mb-4 animate-slideIn">
            About StudyMate
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white opacity-90 drop-shadow-md max-w-3xl animate-fadeIn">
            Connect with like-minded peers, collaborate, and achieve your learning goals together.
          </p>
          <Link
            to="/findpartners"
            className="mt-6 inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105"
          >
            Find Your Partner
          </Link>
        </div>
      </div>

      {/* Info Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50">
            Why StudyMate?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            StudyMate is designed for students and learners who want to find the perfect study partner.
            Share knowledge, collaborate on subjects, and improve together. Our platform ensures you
            connect with peers who match your subjects, availability, and learning style.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            Whether you want to learn a new topic, prepare for exams, or just stay motivated, StudyMate
            makes studying social and effective.
          </p>
          <Link
            to="/login"
            className="inline-block mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105"
          >
            Create Your Profile
          </Link>
        </div>

        <div>
          <img
            src={aboutImage}
            alt="Students collaborating"
            className="rounded-xl shadow-2xl w-full object-cover"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-10 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-12">
            Key Features
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105">
              <h4 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">Find Partners</h4>
              <p className="text-gray-700 dark:text-gray-200">Search peers by subject, availability, and experience level.</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105">
              <h4 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">Collaborate</h4>
              <p className="text-gray-700 dark:text-gray-200">Send requests, schedule sessions, and learn together efficiently.</p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105">
              <h4 className="font-semibold text-xl text-gray-900 dark:text-white mb-2">Track Progress</h4>
              <p className="text-gray-700 dark:text-gray-200">Monitor your learning progress and maintain a network of active study partners.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-6">
          Ready to start learning together?
        </h3>
        <Link
          to="/register"
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105"
        >
          Join StudyMate Now
        </Link>
      </div>
    </div>
  );
};

export default About;
