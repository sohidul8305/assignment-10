import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";

const CreatePartnerProfile = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); 

    const form = event.target;

    const formData = {
      name: form.name.value,
      profileimage: form.profileimage.value,
      subject: form.subject.value,
      studyMode: form.studyMode.value,
      availabilityTime: form.availabilityTime.value,
      location: form.location.value,
      experienceLevel: form.experienceLevel.value,
      skills: form.skills.value,
      email: form.email.value,
      rating: 0,
      partnerCount: 0,
    };

    axios.post("https://assignment-10-server-zeta-gold.vercel.app/study", {
    
      body: JSON.stringify(formData),
    })
axios.post("https://assignment-10-server-zeta-gold.vercel.app/study", formData)
  .then((res) => {
    console.log("Success:", res.data);
    toast.success("Profile created successfully!");
    form.reset();
  })
  .catch((err) => {
    console.error(err);
    toast.error("Failed to create profile");
  })
  .finally(() => setLoading(false));
}

  if (loading) return <LoadingSpinner />; 
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Create Partner Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
     
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

       
        <div>
          <label className="block text-sm font-medium">Profile Image URL</label>
          <input
            type="url"
            name="profileimage"
            placeholder="https://example.com/photo.jpg"
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Subject</label>
          <input
            type="text"
            name="subject"
            placeholder="e.g. Mathematics"
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

     
        <div>
          <label className="block text-sm font-medium">Study Mode</label>
          <select
            name="studyMode"
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option>Online</option>
            <option>Offline</option>
          </select>
        </div>

    
        <div>
          <label className="block text-sm font-medium">Availability Time</label>
          <input
            type="text"
            name="availabilityTime"
            placeholder="e.g. Evening 6–9 PM"
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

       
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            name="location"
            placeholder="City/Area"
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

     
        <div>
          <label className="block text-sm font-medium">Experience Level</label>
          <select
            name="experienceLevel"
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Expert</option>
          </select>
        </div>

       
        <div>
          <label className="block text-sm font-medium">Skills</label>
          <input
            type="text"
            name="skills"
            placeholder="e.g. Math, English, Programming"
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

       
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={user?.email || ""}
            readOnly
            className="w-full mt-1 p-2 border rounded-md bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default CreatePartnerProfile;
