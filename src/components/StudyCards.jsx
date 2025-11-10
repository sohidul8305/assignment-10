import React from 'react';
import { Link } from 'react-router'; 

const StudyCards = ({ study }) => {
  
  const { _id, name, image, skills, rating } = study;

  return (
    <div className="card bg-white shadow-md hover:shadow-lg transition-shadow rounded-2xl overflow-hidden">
      <figure>
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-48"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{name}</h2>

        <p>
          <strong>Skills:</strong>{" "}
          {Array.isArray(skills) ? skills.join(", ") : "No skills listed"}
        </p>

        <p>
          <strong>Rating:</strong> ⭐ {rating}
        </p>

        <div className="card-actions justify-end">
          <Link to={`/study-partnerdetails/${_id}`}>
            <button className="btn btn-primary">View Profile</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudyCards;
