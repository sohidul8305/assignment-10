import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";
import { useNavigate } from "react-router";

const MyConnection = () => {
  const { user, loading } = useContext(AuthContext);
  const [connections, setConnections] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = (connection) => {
    navigate(`/update/${connection._id}`);
  };

  useEffect(() => {
    if (loading) return;
    if (!user?.email) return;

    fetch(`http://localhost:3000/connections?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setConnections(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [user, loading]);

  if (loading) return <LoadingSpinner />;

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this connection?"))
      return;

    fetch(`http://localhost:3000/connections/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Deleted successfully!");
          setConnections((prev) => prev.filter((item) => item._id !== id));
        } else toast.error("Delete failed");
      });
  };



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

     axios
    .put(`http://localhost:3000/connections/${selectedConnection._id}`, updatedData)
    .then((res) => {
      if (res.data.modifiedCount > 0) {
        toast.success("Updated successfully!");

    
        setConnections((prev) =>
          prev.map((item) =>
            item._id === selectedConnection._id
              ? { ...item, ...updatedData }
              : item
          )
        );

     
        setIsModalOpen(false);
      } else {
        toast.error("Update failed");
      }
    })
    .catch((err) => {
      console.error(err);
      toast.error("Update failed");
    });
};

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedConnection(null);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 md:p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        My Connections
      </h2>

      {connections.length === 0 ? (
        <p className="text-center text-gray-500">No connections found.</p>
      ) : (
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Profile</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Subject</th>
              <th className="p-2 border">Study Mode</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {connections.map((conn) => (
              <tr key={conn._id} className="text-center">
                <td className="p-2 border">
                  <img
                    src={conn.profileimage || conn.image}
                    alt={conn.name}
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                </td>
                <td className="p-2 border">{conn.name}</td>
                <td className="p-2 border">{conn.subject}</td>
                <td className="p-2 border">{conn.studyMode}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleUpdate(conn)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(conn._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && selectedConnection && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Update Connection
            </h3>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-3">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  defaultValue={selectedConnection.subject || ""}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div className="mb-3">
                <label>Study Mode</label>
                <select
                  name="studyMode"
                  defaultValue={selectedConnection.studyMode || "Online"}
                  className="w-full border rounded p-2"
                  required
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
                  defaultValue={selectedConnection.availabilityTime || ""}
                  className="w-full border rounded p-2"
                />
              </div>
              <div className="mb-3">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  defaultValue={selectedConnection.location || ""}
                  className="w-full border rounded p-2"
                />
              </div>
              <div className="mb-3">
                <label>Experience Level</label>
                <input
                  type="text"
                  name="experienceLevel"
                  defaultValue={selectedConnection.experienceLevel || ""}
                  className="w-full border rounded p-2"
                />
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={closeModal}
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
        </div>
      )}
    </div>
  );
};

export default MyConnection;
