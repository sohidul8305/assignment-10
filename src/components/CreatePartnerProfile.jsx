import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";

const API_BASE = "https://assignmentserver-lovat.vercel.app/study";

const CreatePartnerProfile = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const data = {
      name: form.name.value,
      profileimage: form.profileimage.value,
      subject: form.subject.value.split(",").map((s) => s.trim()),
      studyMode: form.studyMode.value,
      availabilityTime: form.availabilityTime.value,
      location: form.location.value,
      experienceLevel: form.experienceLevel.value,
      rating: Number(form.rating.value),
      partnerCount: 0,
      email: user?.email,
    };

    try {
      // FIXED — no more /study/study
      const res = await axios.post(API_BASE, data);

      if (res.data.insertedId) {
        toast.success("Profile created successfully!");
        form.reset();
      } else {
        toast.error("Failed to create profile");
      }
    } catch (err) {
      console.error("Submit Error:", err);
      toast.error("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <p className="text-center text-red-500 text-xl mt-10">
        Please login first to create a profile.
      </p>
    );
  }

  return (
    <div className="max-w-md mx-auto p-5 bg-white shadow rounded my-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Create Partner Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input type="text" name="name" placeholder="Full Name" className="w-full p-2 border rounded" required />

        <input type="url" name="profileimage" placeholder="Profile Photo URL" className="w-full p-2 border rounded" />

        <input type="text" name="subject" placeholder="Subjects (comma separated)" className="w-full p-2 border rounded" required />

        <select name="studyMode" className="w-full p-2 border rounded">
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>

        <input type="text" name="availabilityTime" placeholder="Availability Time (e.g. 6–9 PM)" className="w-full p-2 border rounded" required />

        <input type="text" name="location" placeholder="Location" className="w-full p-2 border rounded" required />

        <select name="experienceLevel" className="w-full p-2 border rounded">
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Expert</option>
        </select>

        <input type="number" name="rating" placeholder="Rating (0–5)" min="0" max="5" step="0.1" className="w-full p-2 border rounded" required />

        <input type="email" value={user.email} readOnly className="w-full p-2 border bg-gray-100 rounded" />

        <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
          {loading ? "Saving..." : "Create Profile"}
        </button>
      </form>
    </div>
  );
};

export default CreatePartnerProfile;
