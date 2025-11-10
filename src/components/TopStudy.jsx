import React from 'react';
import { useLoaderData } from 'react-router';

const TopStudy = () => {
    const data = useLoaderData()
    console.log(data)
    return (
      <div></div>
    );
};

export default TopStudy;