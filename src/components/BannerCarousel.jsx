import React, { useState, useEffect } from "react";
import banner1 from "../assets/Banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/Banner3.jpg";

const slides = [
  {
    id: 1,
    title: "Find Your Perfect Study Partner",
    subtitle: "Collaborate, learn, and succeed together.",
    image: banner2,
    buttonText: "Get Started",
  },
  {
    id: 2,
    title: "Boost Your Skills",
    subtitle: "Learn new topics from top-rated peers.",
    image: banner3,
    buttonText: "Explore Partners",
  },
  {
    id: 3,
    title: "Achieve Your Goals",
    subtitle: "Study smart, not alone.",
    image: banner1,
    buttonText: "Join Now",
  },
];

const BannerCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[60vh] md:h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center px-4 md:px-10 lg:px-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 drop-shadow-lg">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-5 max-w-2xl">
              {slide.subtitle}
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base md:text-lg transition">
              {slide.buttonText}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BannerCarousel;
