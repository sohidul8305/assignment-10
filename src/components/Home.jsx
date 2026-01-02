import React, { useState, useEffect } from "react";
import TopStudy from "./TopStudy";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import BannerCarousel from "./BannerCarousel";
import LoadingSpinner from "../components/LoadingSpinner";
import Services from "./Services";
import StudyCategories from "./StudyCategories";
import StudyHighlights from "./StudyHighlights";
import StudyStatistics from "./StudyStatistics";
import StudyBlogs from "./StudyBlogs";
import Newsletter from "./Newsletter";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [studyData, setStudyData] = useState([]);

  useEffect(() => {
    fetch("https://assignmentserver-lovat.vercel.app/study")
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
    <div className="space-y-10">
      <BannerCarousel />
      <TopStudy />
      <HowItWorks />
      <Testimonials />
      <Services></Services>
      <StudyCategories></StudyCategories>
      <StudyHighlights></StudyHighlights>
      <StudyStatistics></StudyStatistics>
      <StudyBlogs></StudyBlogs>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
