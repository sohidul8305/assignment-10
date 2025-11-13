import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateConnection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/connections/${id}`)
      .then(res => setConnection(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      subject: form.subject.value,
      studyMode: form.studyMode.value,
      availabilityTime: form.availabilityTime.value,
      location: form.location.value,
      experienceLevel: form.experienceLevel.value,
    };

  axios
  .put(`http://localhost:3000/connections/${id}`, updatedData)
  .then((res) => {
    if (res.data.modifiedCount > 0) {
      toast.success("Updated successfully!");
      // ✅ Redirect করবে না
      // শুধু Success দেখাবে, পেজ এখানেই থাকবে
    } else {
      toast.error("Update failed!");
    }
  })
  .catch((err) => {
    console.error(err);
    toast.error("Something went wrong!");
  });

  };

  if (!connection) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4 text-center">Update Connection</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Subject</label>
          <input
            type="text"
            name="subject"
            defaultValue={connection.subject}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-3">
          <label>Study Mode</label>
          <select
            name="studyMode"
            defaultValue={connection.studyMode}
            className="w-full border rounded p-2"
          >
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Availability Time</label>
          <input
            type="text"
            name="availabilityTime"
            defaultValue={connection.availabilityTime}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-3">
          <label>Location</label>
          <input
            type="text"
            name="location"
            defaultValue={connection.location}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-3">
          <label>Experience Level</label>
          <input
            type="text"
            name="experienceLevel"
            defaultValue={connection.experienceLevel}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/myconnection")}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateConnection;
