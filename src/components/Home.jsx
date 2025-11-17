import React, { useState, useEffect } from "react";
import TopStudy from "./TopStudy";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import BannerCarousel from "./BannerCarousel";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [studyData, setStudyData] = useState([]);

  useEffect(() => {
    fetch("https://assignment-10-server-zeta-gold.vercel.app/study")
      .then((res) => res.json())
      .then((data) => {
        setStudyData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <BannerCarousel />
      <TopStudy data={studyData} />
      <HowItWorks />
      <Testimonials />
    </div>
  );
};

export default Home;
