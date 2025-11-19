import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

const MyConnection = () => {
  const { user, loading } = useContext(AuthContext);
  const [connections, setConnections] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch logged in user's partner requests
  useEffect(() => {
    if (loading) return;
    if (!user?.email) return;

    fetch(
      `https://assignment-10-server-zeta-gold.vercel.app/partnerRequests?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setConnections(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [user, loading]);

  if (loading) return <LoadingSpinner />;

  // OPEN UPDATE MODAL
  const handleUpdate = (con) => {
    setSelectedConnection(con);
    setIsModalOpen(true);
  };

  // DELETE PARTNER REQUEST
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;

    fetch(`https://assignment-10-server-zeta-gold.vercel.app/partnerRequests/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Request deleted!");
          setConnections((prev) => prev.filter((item) => item._id !== id));
        }
      });
  };

  // UPDATE REQUEST SUBMIT
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      subject: form.subject.value,
      studyMode: form.studyMode.value,
      availabilityTime: form.availabilityTime.value,
      location: form.location.value,
      experienceLevel: form.experienceLevel.value,
    };

    fetch(
      `https://assignment-10-server-zeta-gold.vercel.app/partnerRequests/${selectedConnection._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Updated successfully!");

          // update UI instantly
          setConnections((prev) =>
            prev.map((item) =>
              item._id === selectedConnection._id
                ? { ...item, ...updatedData }
                : item
            )
          );

          setIsModalOpen(false);
          setSelectedConnection(null);
        }
      });
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">My Connections</h2>

      {connections.length ? (
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Partner Name</th>
              <th className="p-2 border">Subject</th>
              <th className="p-2 border">Study Mode</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {connections.map((item) => (
              <tr key={item._id} className="text-center">
                <td className="p-2 border">
                  <img
                    src={item.partnerImage || "https://via.placeholder.com/100"}
                    className="w-12 h-12 rounded-full mx-auto border"
                  />
                </td>

                <td className="p-2 border">{item.partnerName}</td>
                <td className="p-2 border">{item.subject}</td>
                <td className="p-2 border">{item.studyMode}</td>

                <td className="p-2 border">
                  <button
                    onClick={() => handleUpdate(item)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No partner requests found.</p>
      )}

      {/* UPDATE MODAL */}
      {isModalOpen && selectedConnection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-full max-w-md shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Update Partner Request
            </h3>

            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-3">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  defaultValue={selectedConnection.subject}
                  className="w-full border rounded p-2"
                  required
                />
              </div>

              <div className="mb-3">
                <label>Study Mode</label>
                <select
                  name="studyMode"
                  defaultValue={selectedConnection.studyMode}
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
                  defaultValue={selectedConnection.availabilityTime}
                  className="w-full border rounded p-2"
                />
              </div>

              <div className="mb-3">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  defaultValue={selectedConnection.location}
                  className="w-full border rounded p-2"
                />
              </div>

              <div className="mb-3">
                <label>Experience Level</label>
                <input
                  type="text"
                  name="experienceLevel"
                  defaultValue={selectedConnection.experienceLevel}
                  className="w-full border rounded p-2"
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setIsModalOpen(false)}
                  type="button"
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyConnection;
