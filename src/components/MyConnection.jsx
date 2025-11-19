import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

const API_BASE = "http://localhost:3000"; // development local server

export default function MyCollection() {
  const { user, loading } = useContext(AuthContext);
  const [connections, setConnections] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [busy, setBusy] = useState(false);

  // fetch user's study profiles
  useEffect(() => {
    if (loading || !user?.email) return;
    setBusy(true);

    fetch(`${API_BASE}/study`)
      .then(res => res.json())
      .then(data => {
        const userConnections = data
          .filter(item => item.email === user.email)
          .map(item => ({
            ...item,
            subject: Array.isArray(item.subject)
              ? item.subject
              : item.subject
              ? [item.subject]
              : [],
          }));
        setConnections(userConnections);
      })
      .catch(() => toast.error("Failed to load connections"))
      .finally(() => setBusy(false));
  }, [user, loading]);

  if (loading || busy) return <LoadingSpinner />;

  const handleUpdate = (connection) => {
    setSelectedConnection(connection);
    setIsUpdateModalOpen(true);
  };

  const confirmDelete = (connection) => {
    setDeleteTarget(connection);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setBusy(true);
    try {
      const res = await fetch(`${API_BASE}/study/${deleteTarget._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Deleted successfully");
        setConnections(prev => prev.filter(i => i._id !== deleteTarget._id));
      } else toast.error(data.message || "Delete failed");
    } catch {
      toast.error("Delete failed");
    }
    setBusy(false);
    setIsDeleteModalOpen(false);
    setDeleteTarget(null);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!selectedConnection) return;

    const form = e.target;
    const updatedData = {
      subject: form.subject.value.split(",").map(s => s.trim()).filter(Boolean),
      studyMode: form.studyMode.value,
      availabilityTime: form.availabilityTime.value,
      location: form.location.value,
      experienceLevel: form.experienceLevel.value,
      email: selectedConnection.email
    };

    setBusy(true);
    try {
      const res = await fetch(`${API_BASE}/study/${selectedConnection._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Updated successfully!");
        setConnections(prev =>
          prev.map(item => item._id === selectedConnection._id ? { ...item, ...updatedData } : item)
        );
        setIsUpdateModalOpen(false);
        setSelectedConnection(null);
      } else toast.error(data.message || "No changes made");
    } catch {
      toast.error("Update failed");
    }
    setBusy(false);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">My Collection</h2>

      {connections.length ? (
        <div className="overflow-x-auto">
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
              {connections.map(item => (
                <tr key={item._id} className="text-center">
                  <td className="p-2 border">
                    <img
                      src={item.profileimage || item.image || "https://via.placeholder.com/100"}
                      alt={item.name || "Partner"}
                      className="w-12 h-12 rounded-full mx-auto border object-cover"
                    />
                  </td>
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border">{item.subject.length ? item.subject.join(", ") : "N/A"}</td>
                  <td className="p-2 border">{item.studyMode || "N/A"}</td>
                  <td className="p-2 border">
                    <button onClick={() => handleUpdate(item)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Update</button>
                    <button onClick={() => confirmDelete(item)} className="bg-red-500 text-white px-3 py-1 rounded" disabled={busy}>
                      {busy ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No connections found.</p>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-3">Confirm Delete</h3>
            <p>Are you sure you want to delete <strong>{deleteTarget.name}</strong>?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={() => { setIsDeleteModalOpen(false); setDeleteTarget(null); }}>Cancel</button>
              <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={handleDelete} disabled={busy}>
                {busy ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {isUpdateModalOpen && selectedConnection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-center">Update Partner Request</h3>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-3">
                <label>Subject</label>
                <input type="text" name="subject" defaultValue={selectedConnection.subject.join(", ")} className="w-full border p-2 rounded" />
              </div>
              <div className="mb-3">
                <label>Study Mode</label>
                <select name="studyMode" defaultValue={selectedConnection.studyMode || "Online"} className="w-full border p-2 rounded">
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
              <div className="mb-3">
                <label>Availability Time</label>
                <input type="text" name="availabilityTime" defaultValue={selectedConnection.availabilityTime || ""} className="w-full border p-2 rounded" />
              </div>
              <div className="mb-3">
                <label>Location</label>
                <input type="text" name="location" defaultValue={selectedConnection.location || ""} className="w-full border p-2 rounded" />
              </div>
              <div className="mb-3">
                <label>Experience Level</label>
                <input type="text" name="experienceLevel" defaultValue={selectedConnection.experienceLevel || ""} className="w-full border p-2 rounded" />
              </div>
              <div className="flex justify-between">
                <button type="button" onClick={() => { setIsUpdateModalOpen(false); setSelectedConnection(null); }} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded" disabled={busy}>
                  {busy ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
