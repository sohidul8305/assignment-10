import React from "react";
import { useQuery } from "@tanstack/react-query";

const ManageItems = () => {
  const {
    data: items = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/items");
      return res.json();
    },
  });

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this item?");
    if (!confirm) return;

    await fetch(`http://localhost:3000/items/${id}`, {
      method: "DELETE",
    });

    refetch();
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading items...</div>;
  }

  return (
    <div className="bg-white shadow rounded-xl p-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Manage Items</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Added By</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item._id} className="border-t hover:bg-gray-50">
              <td className="p-3">{item.name}</td>
              <td className="p-3">{item.category}</td>
              <td className="p-3">{item.quantity}</td>
              <td className="p-3">{item.email || "N/A"}</td>
              <td className="p-3">
                <button
                  onClick={() => handleDelete(item._id)}
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

export default ManageItems;
