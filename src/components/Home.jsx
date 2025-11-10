import React from 'react';
import BannerCarousel from './BannerCarousel';
import TopStudy from './TopStudy';
import { data } from 'react-router';

const Home = () => {
  return (
    <div>
      <BannerCarousel></BannerCarousel>
      <TopStudy data={data}></TopStudy>
    </div>
  );
};

export default Home;