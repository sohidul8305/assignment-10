import React, { useState, useEffect } from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[40vh]">
      <span className="loading loading-spinner loading-xl"></span>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1s delay
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      {/* Hero Section */}
      <section className="bg-blue-600 dark:bg-blue-800 text-white py-20 text-center mt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Get in Touch
        </h1>
        <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
          Have questions or suggestions? We'd love to hear from you. Connect with StudyMate today.
        </p>
      </section>

      {/* Contact Form Section */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800 dark:text-gray-100">
          Contact Us
        </h2>
        <div className="flex flex-col md:flex-row gap-10">
          {/* Contact Form */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-colors duration-300">
            {submitted && (
              <p className="mb-4 text-green-600 dark:text-green-400 font-semibold">
                Thank you! Your message has been sent.
              </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700 dark:text-gray-200">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex-1 flex flex-col justify-center gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
              <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
                Email
              </h3>
              <p className="text-gray-700 dark:text-gray-300">sohidul8305@gmail.com</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
              <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
                Phone
              </h3>
              <p className="text-gray-700 dark:text-gray-300">+880 1540659004</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
              <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
                Address
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Airport, Dhaka, Bangladesh
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
