import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

const API_BASE = "https://assignmentserver-lovat.vercel.app";

export default function MyCollection() {
  const { user, loading } = useContext(AuthContext);
  const [connections, setConnections] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [busy, setBusy] = useState(false);

  // ==============================
  // FETCH USER COLLECTION
  // ==============================
  useEffect(() => {
    if (!user?.email) return;

    setBusy(true);

    fetch(`${API_BASE}/study?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        const fixedData = data.map(item => ({
          ...item,
          subject: Array.isArray(item.subject)
            ? item.subject
            : item.subject
            ? [item.subject]
            : [],
        }));

        setConnections(fixedData);
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to load collection");
      })
      .finally(() => setBusy(false));
  }, [user?.email]);

  if (loading || busy) return <LoadingSpinner />;

  // ==============================
  // DELETE
  // ==============================
  const handleDelete = async () => {
    if (!deleteTarget) return;

    setBusy(true);
    try {
      const res = await fetch(`${API_BASE}/study/${deleteTarget._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Deleted successfully");
        setConnections(prev =>
          prev.filter(item => item._id !== deleteTarget._id)
        );
      }
    } catch {
      toast.error("Delete failed");
    }

    setBusy(false);
    setIsDeleteModalOpen(false);
    setDeleteTarget(null);
  };

  // ==============================
  // UPDATE
  // ==============================
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const updatedData = {
      subject: form.subject.value.split(",").map(s => s.trim()),
      studyMode: form.studyMode.value,
      availabilityTime: form.availabilityTime.value,
      location: form.location.value,
      experienceLevel: form.experienceLevel.value,
    };

    setBusy(true);
    try {
      const res = await fetch(`${API_BASE}/study/${selectedConnection._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Updated successfully");
        setConnections(prev =>
          prev.map(item =>
            item._id === selectedConnection._id
              ? { ...item, ...updatedData }
              : item
          )
        );
        setIsUpdateModalOpen(false);
        setSelectedConnection(null);
      }
    } catch {
      toast.error("Update failed");
    }
    setBusy(false);
  };

  // ==============================
  // UI
  // ==============================
  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        My Collection
      </h2>

      {connections.length ? (
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Photo</th>
              <th className="p-2 border">Name</th>
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
                    src={item.profileimage || "https://via.placeholder.com/100"}
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                </td>
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">
                  {item.subject.join(", ")}
                </td>
                <td className="p-2 border">{item.studyMode}</td>
                <td className="p-2 border">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 mr-2 rounded"
                    onClick={() => {
                      setSelectedConnection(item);
                      setIsUpdateModalOpen(true);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => {
                      setDeleteTarget(item);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">
          No connections found
        </p>
      )}
    </div>
  );
}
