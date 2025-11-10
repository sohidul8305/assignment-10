import React from "react";
import { useLoaderData, Link } from "react-router";

const TopStudy = () => {
  const data = useLoaderData();

  const topRated = [...data]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        🌟 Top Study Partners
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topRated.map((study) => (
          <div
            key={study._id}
            className="card bg-white shadow-md hover:shadow-lg transition-shadow rounded-2xl overflow-hidden"
          >
            <figure>
              <img
                src={study.image}
                alt={study.name}
                className="object-cover w-full h-48"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{study.name}</h2>

              <p>
                Skills:{" "}
                {Array.isArray(study.skills)
                  ? study.skills.join(", ")
                  : "No skills listed"}
              </p>

              <p>Rating: ⭐ {study.rating || "N/A"}</p>

              <div className="card-actions justify-end">
                <Link
                  to={`/details/${study._id}`}
                  className="btn btn-primary"
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
