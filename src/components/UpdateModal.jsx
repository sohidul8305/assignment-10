import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE = "https://assignmentserver-lovat.vercel.app/study";

const UpdateModal = ({ data, onClose, onUpdated, userEmail }) => {
  const [form, setForm] = useState({ ...data });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add userEmail for backend verification
    const payload = { ...form, userEmail };

    axios
      .put(`${API_BASE}/partnerRequests/${data._id}`, payload)
      .then((res) => {
        if (res.data?.success) {
          toast.success("Updated Successfully!");
          onUpdated({ ...form, _id: data._id });
          onClose();
        } else {
          toast.error(res.data?.message || "Update failed");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Update failed");
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-semibold mb-3">Update Request</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label>Subject</label>
            <input
              className="w-full border p-2 rounded"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
          </div>

          <div>
            <label>Study Mode</label>
            <select
              className="w-full border p-2 rounded"
              value={form.studyMode}
              onChange={(e) => setForm({ ...form, studyMode: e.target.value })}
            >
              <option>Online</option>
              <option>Offline</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Save Changes
          </button>

          <button
            type="button"
            className="w-full bg-gray-400 text-white py-2 rounded mt-2"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
