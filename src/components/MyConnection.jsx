import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";

const API_BASE = "https://assignmentserver-lovat.vercel.app";

// --- Placeholder Components for Modals ---
// In a real application, you would define these in separate files.

// 1. Update Modal (to show initial values)
const UpdateModal = ({ isOpen, onClose, connection, onSubmit, isBusy }) => {
  if (!isOpen || !connection) return null;

  // Function to format subjects for the input field
  const formatSubjects = Array.isArray(connection.subject) 
    ? connection.subject.join(", ") 
    : connection.subject || "";

  // The modal needs a way to handle the form submission.
  // The 'onSubmit' prop is the 'handleUpdateSubmit' function from the parent.
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-xl font-bold mb-4">Update Connection for {connection.name}</h3>
        <form onSubmit={onSubmit}>
          {/* Subject Field - Pre-filled */}
          <div className="mb-4">
            <label className="block text-gray-700">Subject (comma separated):</label>
            <input 
              name="subject" 
              type="text" 
              defaultValue={formatSubjects} // Initial Value
              className="mt-1 w-full p-2 border rounded" 
              required
            />
          </div>

          {/* Study Mode Field - Pre-filled (Example Select) */}
          <div className="mb-4">
            <label className="block text-gray-700">Study Mode:</label>
            <select 
              name="studyMode" 
              defaultValue={connection.studyMode} // Initial Value
              className="mt-1 w-full p-2 border rounded" 
              required
            >
              <option value="Online">Online</option>
              <option value="Online">Offline</option>
            </select>
          </div>

          {/* Availability Time Field - Pre-filled */}
          <div className="mb-4">
            <label className="block text-gray-700">Availability Time:</label>
            <input 
              name="availabilityTime" 
              type="text" 
              defaultValue={connection.availabilityTime} // Initial Value
              className="mt-1 w-full p-2 border rounded" 
              required
            />
          </div>

          {/* Location Field - Pre-filled */}
          <div className="mb-4">
            <label className="block text-gray-700">Location:</label>
            <input 
              name="location" 
              type="text" 
              defaultValue={connection.location} // Initial Value
              className="mt-1 w-full p-2 border rounded" 
              required
            />
          </div>

          {/* Experience Level Field - Pre-filled */}
          <div className="mb-4">
            <label className="block text-gray-700">Experience Level:</label>
            <input 
              name="experienceLevel" 
              type="text" 
              defaultValue={connection.experienceLevel} // Initial Value
              className="mt-1 w-full p-2 border rounded" 
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              disabled={isBusy}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
              disabled={isBusy}
            >
              {isBusy ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 2. Delete Confirmation Modal
const DeleteModal = ({ isOpen, onClose, connection, onConfirm, isBusy }) => {
  if (!isOpen || !connection) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-80">
        <h3 className="text-xl font-bold mb-4 text-red-600">Confirm Deletion</h3>
        <p className="mb-6">
          Are you sure you want to delete the connection with **{connection.name}**? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-2">
          <button 
            type="button" 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            disabled={isBusy}
          >
            Cancel
          </button>
          <button 
            type="button" 
            onClick={onConfirm} 
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-red-300"
            disabled={isBusy}
          >
            {isBusy ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};
// --- End Placeholder Components ---


export default function MyCollection() {
  const { user, loading } = useContext(AuthContext);
  const [connections, setConnections] = useState([]);
  const [selectedConnection, setSelectedConnection] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [busy, setBusy] = useState(false);

  // Helper functions to open/close modals
  const openUpdateModal = (item) => {
    setSelectedConnection(item);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedConnection(null);
  };

  const openDeleteModal = (item) => {
    setDeleteTarget(item);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteTarget(null);
  };


  // ==============================
  // FETCH USER COLLECTION (UNCHANGED)
  // ==============================
  useEffect(() => {
    if (!user?.email) return;

    setBusy(true);

    fetch(`${API_BASE}/study?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        // Fix for 'subject' being a string instead of an array
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
  // DELETE Logic (UNCHANGED)
  // This is triggered by the onConfirm in the DeleteModal
  // ==============================
const handleDelete = async () => {
    // ... (busy check and validation)
    try {
      const res = await fetch(`${API_BASE}/study/${deleteTarget._id}`, {
        method: "DELETE", // <--- Method is correct
      });

      // Crucial: Check for failed HTTP status codes (400, 404, 500)
      if (!res.ok) {
          throw new Error(`Server returned status: ${res.status}`);
      }
      
      const data = await res.json();

      if (data.deletedCount > 0) { // <--- Checks if MongoDB deleted anything
        toast.success("Deleted successfully");
        // ... (state update logic)
      } else {
         toast.error("Delete failed. Item not found or already deleted.");
      }
    } catch (error) {
       toast.error(`Delete failed: ${error.message || "Network or parsing error"}`);
    }
    // ... (close modal)
  };

  // ==============================
  // UPDATE Logic (UNCHANGED)
  // This is triggered by the onSubmit in the UpdateModal
  // ==============================
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    // Data extraction from form fields
    const updatedData = {
      subject: form.subject.value.split(",").map(s => s.trim()).filter(s => s.length > 0), // Clean up subjects
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
        // Update the local state with the new data
        setConnections(prev =>
          prev.map(item =>
            item._id === selectedConnection._id
              ? { ...item, ...updatedData }
              : item
          )
        );
      } else {
        toast('No changes were made.', { icon: 'ℹ️' });
      }
    } catch {
      toast.error("Update failed");
    }
    setBusy(false);
    closeUpdateModal(); // Close modal using new function
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
                    alt={item.name}
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
                    className="bg-blue-500 text-white px-3 py-1 mr-2 rounded hover:bg-blue-600"
                    onClick={() => openUpdateModal(item)} // Use helper function
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => openDeleteModal(item)} // Use helper function
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

      {/* RENDER MODALS */}
      <UpdateModal
        isOpen={isUpdateModalOpen}
        onClose={closeUpdateModal}
        connection={selectedConnection}
        onSubmit={handleUpdateSubmit} // Pass the main handler function
        isBusy={busy}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        connection={deleteTarget}
        onConfirm={handleDelete} // Pass the main handler function
        isBusy={busy}
      />
    </div>
  );
}