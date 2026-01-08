import React from "react";
import { useQuery } from "@tanstack/react-query";

const ManageUsers = () => {
  // ============================
  // FETCH USERS FROM STUDY API
  // ============================
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["studyUsers"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/study");
      return res.json();
    },
  });

  // ============================
  // DELETE USER
  // ============================
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    await fetch(`http://localhost:3000/study/${id}`, {
      method: "DELETE",
    });

    refetch();
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading users...</div>;
  }

  return (
    <div className="bg-white shadow rounded-xl p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Manage Users</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Subjects</th>
            <th className="p-3">Study Mode</th>
            <th className="p-3">Role</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-t hover:bg-gray-50">
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">
                {Array.isArray(user.subject)
                  ? user.subject.join(", ")
                  : user.subject}
              </td>
              <td className="p-3">{user.studyMode}</td>
              <td className="p-3">
                {user.role || "User"}
              </td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
