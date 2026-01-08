import React, { useState } from "react";
import toast from "react-hot-toast";

const AddItem = () => {
  const [item, setItem] = useState({
    name: "",
    category: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Item added successfully");
        setItem({ name: "", category: "", quantity: "" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add item");
    }
  };

  return (
    <div className="bg-white shadow rounded-xl p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Add New Item</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-500 mb-1">Item Name</label>
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block text-gray-500 mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={item.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <div>
          <label className="block text-gray-500 mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={item.quantity}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
        </div>

        <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;
