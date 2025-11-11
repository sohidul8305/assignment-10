import { useLoaderData, Link } from "react-router";

const TopStudy = () => {
  const data = useLoaderData();

  const topRated = [...data].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">
        🌟 Top Study Partners
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topRated.map((study) => (
          <div
            key={study._id}
            className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-2xl overflow-hidden flex flex-col"
          >
            <figure className="h-48 w-full overflow-hidden">
              <img
                src={study.image}
                alt={study.name}
                className="object-cover w-full h-full"
              />
            </figure>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                  {study.name}
                </h3>

                <p className="text-sm sm:text-base mb-1">
                  <span className="font-semibold">Skills:</span>{" "}
                  {Array.isArray(study.skills)
                    ? study.skills.join(", ")
                    : "No skills listed"}
                </p>

                <p className="text-sm sm:text-base">
                  <span className="font-semibold">Rating:</span> ⭐{" "}
                  {study.rating || "N/A"}
                </p>
              </div>

              <div className="mt-4 text-right">
                <Link
                  to={`/details/${study._id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base transition"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopStudy;
