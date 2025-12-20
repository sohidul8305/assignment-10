import React, { useEffect, useState } from "react";
import { Link } from "react-router"; // ঠিক করা: react-router
import Swal from "sweetalert2";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner"; // spinner import

const MyCollection = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://assignmentserver-lovat.vercel.app/study")
      .then((res) => {
        const normalized = res.data.map((p) => ({
          ...p,
          subject: Array.isArray(p.subject) ? p.subject : [p.subject],
        }));
        setPartners(normalized);
      })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "ডিলিট করলে আর ফেরত আসবে না!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setPartners(partners.filter((p) => p._id !== id));
        Swal.fire("Deleted!", "Partner removed", "success");
      }
    });
  };

  if (loading) return <LoadingSpinner />; // spinner ব্যবহার

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        My Collection ({partners.length})
      </h2>

      {partners.length === 0 ? (
        <p className="text-center text-gray-500">No partners found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Partner</th>
                <th>Subject</th>
                <th>Study Mode</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {partners.map((p, index) => (
                <tr key={p._id}>
                  <td>{index + 1}</td>
                  <td className="flex items-center gap-3">
                    <img
                      src={p.profileimage || p.image || "https://via.placeholder.com/40"}
                      alt={p.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="font-medium">{p.name}</span>
                  </td>
                  <td>{p.subject.join(", ")}</td>
                  <td>{p.studyMode}</td>
                  <td className="flex gap-2 justify-center">
                    <Link
                      to={`/update/${p._id}`}
                      className="btn btn-sm btn-info"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyCollection;
