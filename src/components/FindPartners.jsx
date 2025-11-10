import React from 'react';
import { useLoaderData } from 'react-router';
import StudyCards from './StudyCards';


const FindPartners = () => {
        const data = useLoaderData()
    console.log(data)
    return (
          <div>
          <p className='text-center mb-10 font-bold'>Study find Partners</p>
          <div className='grid grid-cols-3 lg:grid-cols-3 gap-3'>
     {data.map(study => <StudyCards key={study._id} study={study}></StudyCards>)}
          </div>
        </div>
    );
};

export default FindPartners;