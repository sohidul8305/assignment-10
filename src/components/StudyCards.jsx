import React from 'react';
import { Link } from 'react-router';

const StudyCards = ({study}) => {
    return (
       <div className="card bg-white shadow-md hover:shadow-lg transition-shadow rounded-2xl overflow-hidden">
     <figure>
            <img
              src={study.image}
              alt={study.name}
              className="object-cover w-full h-48"
            />
          </figure>
  <div className="card-body">
    <h2 className="card-title">{study.name}</h2>
    <p className='gap-3'>{study.skills}</p>
    <p className='text-left'>{study.rating}</p>
    <div className="card-actions justify-end">

        <Link to="studydetails"><button className="btn btn-primary">View Profile</button></Link>
    </div>
  </div>
</div>
    );
};

export default StudyCards;