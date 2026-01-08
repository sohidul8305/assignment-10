import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Reports = () => {
  // Fetch items data
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["report-items"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/items");
      return res.json();
    },
  });

  if (isLoading) {
    return <div className="text-center mt-10">Loading reports...</div>;
  }

  // Overview calculations
  const totalItems = items.length;
  const totalQuantity = items.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  // Chart data
  const chartData = items.map((item) => ({
    name: item.name,
    quantity: Number(item.quantity),
  }));

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* ================= OVERVIEW CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Total Items</h3>
          <p className="text-3xl font-bold mt-2">{totalItems}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Total Quantity</h3>
          <p className="text-3xl font-bold mt-2">{totalQuantity}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">Average Quantity</h3>
          <p className="text-3xl font-bold mt-2">
            {totalItems ? Math.round(totalQuantity / totalItems) : 0}
          </p>
        </div>
      </div>

      {/* ================= BAR CHART ================= */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Item Quantity Report
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantity" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ================= DATA TABLE ================= */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Item Details
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Added By</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">{item.quantity}</td>
                <td className="p-3">{item.email || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
