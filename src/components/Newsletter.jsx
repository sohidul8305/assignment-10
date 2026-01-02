import React, { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Subscribed email:", email);
      setSubmitted(true);
      setEmail("");
      setLoading(false);
    }, 1500);
  };

  return (
    <section className="bg-blue-50 dark:bg-gray-900 py-20 transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
          Get the latest study tips, updates, and partner recommendations delivered directly to your inbox.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            className="w-full sm:w-auto flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
          >
            {loading ? <LoadingSpinner /> : "Subscribe"}
          </button>
        </form>

        {submitted && (
          <p className="mt-4 text-green-600 dark:text-green-400 font-semibold">
            Thank you for subscribing!
          </p>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
