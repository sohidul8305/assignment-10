import React from 'react';
import BannerCarousel from './BannerCarousel';
import TopStudy from './TopStudy';
import { data } from 'react-router';
import HowItWorks from './HowItWorks';
import Testimonials from './Testimonials';

const Home = () => {
  return (
    <div>
      <BannerCarousel></BannerCarousel>
      <TopStudy data={data}></TopStudy>
      <HowItWorks></HowItWorks>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;