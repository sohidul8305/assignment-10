import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSave = () => {
    console.log("Saved:", { name, email });
    alert("Profile saved (simulate backend save)");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow space-y-4">
      <h1 className="text-xl font-bold">My Profile</h1>
      <div>
        <label className="block font-semibold">Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full rounded"
        />
      </div>
      <div>
        <label className="block font-semibold">Email:</label>
        <input
          value={email}
          disabled
          className="border p-2 w-full rounded bg-gray-100"
        />
      </div>
      <button onClick={handleSave} className="btn btn-primary mt-2">Save</button>
    </div>
  );
};

export default Profile;
