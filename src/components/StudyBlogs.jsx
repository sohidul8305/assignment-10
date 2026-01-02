// file: StudyBlogs.jsx
import React, { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router";

const StudyBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setLoading(true);
    // Simulate API fetch
    setTimeout(() => {
      setBlogs([
        {
          id: 1,
          title: "Top 5 Tips for Effective Study Sessions",
          snippet: "Discover strategies to maximize your learning in minimal time.",
          image: "https://i.ibb.co.com/q3kvss35/photo-1456513080510-7bf3a84b82f8-fm-jpg-q-60-w-3000-ixlib-rb-4-1.jpg",
          link: "/blogs/1",
        },
        {
          id: 2,
          title: "How to Find the Perfect Study Partner",
          snippet: "Learn how to connect with like-minded peers and achieve your goals together.",
          image: "https://i.ibb.co.com/391sMYcg/images-q-tbn-ANd9-Gc-QUhw-Sy-KKYQHxro-Qec2l5-K26n-ovaw-Tmh-Ibnw-s.jpg",
          link: "/blogs/2",
        },
        {
          id: 3,
          title: "Time Management for Students",
          snippet: "Manage your study hours efficiently and stay on top of your schedule.",
          image: "https://i.ibb.co.com/rKwHfB1n/book-laptop-pencil-clock-wooden-table-library-education-learning-concept-1150-16629.jpg",
          link: "/blogs/3",
        },
        {
          id: 4,
          title: "Boost Your Memory with Simple Techniques",
          snippet: "Techniques to retain more information while studying effectively.",
          image: "https://i.ibb.co.com/MkypjZKz/images-q-tbn-ANd9-Gc-RCPNm3a-Czkzixs-Dj-Fc-GBHtfcm-TKHj-Eo-Jfybw-s.jpg",
          link: "/blogs/4",
        },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-10 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-50 mb-12">
        Latest Blogs
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform transition duration-300 hover:scale-105 flex flex-col"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {blog.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 flex-1">{blog.snippet}</p>
             <Link
  to={`/blogs/${blog.id}`} // <-- dynamic route
  className="mt-4 inline-block text-blue-600 dark:text-blue-400 font-semibold hover:underline"
>
  Read More
</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StudyBlogs;
