import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";

const API_BASE = "https://assignment-10-server-zeta-gold.vercel.app";

const CreatePartnerProfile = ({ partnerId }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState({});

  // Fetch data if partnerId exists (update mode)
  useEffect(() => {
    if (!partnerId) return;

    setLoading(true);
    axios
      .get(`${API_BASE}/study/${partnerId}`)
      .then((res) => setInitialData(res.data))
      .catch(() => toast.error("Failed to load profile"))
      .finally(() => setLoading(false));
  }, [partnerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const data = {
      name: form.name.value,
      profileimage: form.profileimage.value,
      subject: form.subject.value,
      studyMode: form.studyMode.value,
      availabilityTime: form.availabilityTime.value,
      location: form.location.value,
      experienceLevel: form.experienceLevel.value,
      skills: form.skills.value,
      email: user?.email,
    };

    try {
      if (partnerId) {
        await axios.put(`${API_BASE}/study/${partnerId}`, data);
        toast.success("Profile updated!");
      } else {
        await axios.post(`${API_BASE}/study`, data);
        toast.success("Profile created!");
        form.reset();
      }
    } catch {
      toast.error("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-md mx-auto p-5 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {partnerId ? "Update Profile" : "Create Profile"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          defaultValue={initialData.name}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="url"
          name="profileimage"
          placeholder="Photo URL"
          defaultValue={initialData.profileimage}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          defaultValue={initialData.subject}
          className="w-full p-2 border rounded"
        />

        <select
          name="studyMode"
          defaultValue={initialData.studyMode || "Online"}
          className="w-full p-2 border rounded"
        >
          <option>Online</option>
          <option>Offline</option>
        </select>

        <input
          type="text"
          name="availabilityTime"
          placeholder="Availability Time"
          defaultValue={initialData.availabilityTime}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          defaultValue={initialData.location}
          className="w-full p-2 border rounded"
        />

        <select
          name="experienceLevel"
          defaultValue={initialData.experienceLevel || "Beginner"}
          className="w-full p-2 border rounded"
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Expert</option>
        </select>

        <input
          type="text"
          name="skills"
          placeholder="Skills"
          defaultValue={initialData.skills}
          className="w-full p-2 border rounded"
        />

        <input
          type="email"
          name="email"
          value={user?.email || ""}
          readOnly
          className="w-full p-2 border bg-gray-100 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          {partnerId ? "Save Changes" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreatePartnerProfile;
