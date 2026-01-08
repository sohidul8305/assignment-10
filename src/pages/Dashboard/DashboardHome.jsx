import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const DashboardHome = () => {
  // ===============================
  // FETCH STUDY DATA FROM BACKEND
  // ===============================
  const { data: studies = [], isLoading } = useQuery({
    queryKey: ["studies"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/study");
      return res.json();
    },
  });

  if (isLoading) {
    return <div className="text-center mt-10">Loading Dashboard...</div>;
  }

  // ===============================
  // OVERVIEW DATA
  // ===============================
  const totalUsers = studies.length;
  const totalPartners = studies.reduce((sum, s) => sum + (s.partnerCount || 0), 0);
  const totalRequests = studies.reduce((sum, s) => sum + (s.requestCount || 0), 0);

  // ===============================
  // CHART DATA (Top 5 by partnerCount)
  // ===============================
  const chartData = [...studies]
    .sort((a, b) => b.partnerCount - a.partnerCount)
    .slice(0, 5)
    .map((s) => ({
      name: s.name,
      partners: s.partnerCount,
    }));

  return (
    <div className="space-y-6">
      {/* ================= OVERVIEW CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-white rounded-xl shadow">
          <h3 className="text-gray-500">Total Study Profiles</h3>
          <p className="text-3xl font-bold">{totalUsers}</p>
        </div>

        <div className="p-5 bg-white rounded-xl shadow">
          <h3 className="text-gray-500">Total Partners</h3>
          <p className="text-3xl font-bold">{totalPartners}</p>
        </div>

        <div className="p-5 bg-white rounded-xl shadow">
          <h3 className="text-gray-500">Total Requests</h3>
          <p className="text-3xl font-bold">{totalRequests}</p>
        </div>
      </div>

      {/* ================= CHART ================= */}
      <div className="p-5 bg-white rounded-xl shadow">
        <h2 className="font-semibold mb-4">Top Study Partners</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="partners" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ================= DATA TABLE ================= */}
      <div className="p-5 bg-white rounded-xl shadow overflow-x-auto">
        <h2 className="font-semibold mb-4">Study Profiles</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Mode</th>
              <th className="p-3">Location</th>
              <th className="p-3">Level</th>
              <th className="p-3">Partners</th>
              <th className="p-3">Rating</th>
            </tr>
          </thead>

          <tbody>
            {studies.map((s) => (
              <tr key={s._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{s.name}</td>
                <td className="p-3">
                  {Array.isArray(s.subject) ? s.subject.join(", ") : s.subject}
                </td>
                <td className="p-3">{s.studyMode}</td>
                <td className="p-3">{s.location}</td>
                <td className="p-3">{s.experienceLevel}</td>
                <td className="p-3">{s.partnerCount}</td>
                <td className="p-3">{s.rating ?? "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardHome;
