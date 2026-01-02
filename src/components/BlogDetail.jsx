import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import LoadingSpinner from "./LoadingSpinner";

// --- Sample Blog Data (Replace with API if available) ---
const blogData = [
  {
    id: 1,
    title: "Top 5 Tips for Effective Study Sessions",
    snippet: "Discover strategies to maximize your learning in minimal time.",
    content: "Full content for blog 1 goes here...",
    image:
      "https://i.ibb.co/q3kvss35/photo-1456513080510-7bf3a84b82f8-fm-jpg-q-60-w-3000-ixlib-rb-4-1.jpg",
  },
  {
    id: 2,
    title: "How to Find the Perfect Study Partner",
    snippet: "Learn how to connect with like-minded peers and achieve your goals together.",
    content: "Full content for blog 2 goes here...",
    image:
      "https://i.ibb.co/391sMYcg/images-q-tbn-ANd9-Gc-QUhw-Sy-KKYQHxro-Qec2l5-K26n-ovaw-Tmh-Ibnw-s.jpg",
  },
  {
    id: 3,
    title: "Time Management for Students",
    snippet: "Manage your study hours efficiently and stay on top of your schedule.",
    content: "Full content for blog 3 goes here...",
    image:
      "https://i.ibb.co/rKwHfB1n/book-laptop-pencil-clock-wooden-table-library-education-learning-concept-1150-16629.jpg",
  },
  {
    id: 4,
    title: "Boost Your Memory with Simple Techniques",
    snippet: "Techniques to retain more information while studying effectively.",
    content: "Full content for blog 4 goes here...",
    image:
      "https://i.ibb.co/MkypjZKz/images-q-tbn-ANd9-Gc-RCPNm3a-Czkzixs-Dj-Fc-GBHtfcm-TKHj-Eo-Jfybw-s.jpg",
  },
];

const BlogDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    setLoading(true);

    // Simulate API fetch with timeout
    setTimeout(() => {
      const foundBlog = blogData.find((b) => b.id === Number(id));
      setBlog(foundBlog || null);
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (!blog)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-50">
        <h2 className="text-3xl font-bold mb-4">Blog Not Found</h2>
        <Link
          to="/blogs"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition transform hover:scale-105"
        >
          Go Back to Blogs
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      {/* Hero Image */}
      <div className="w-full h-[50vh] md:h-[60vh] relative overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center px-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            {blog.title}
          </h1>
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-16 space-y-6">
        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
          {blog.snippet}
        </p>
        <p className="text-gray-800 dark:text-gray-100 text-lg md:text-xl leading-relaxed">
          {blog.content}
        </p>

        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105"
        >
          Back to Blogs
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;
