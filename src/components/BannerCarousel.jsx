import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

// --- Asset Imports ---
import banner1 from "../assets/Banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/Banner3.jpg";
// ---------------------

const slides = [
  {
    id: 1,
    title: "Find Your Perfect Study Partner",
    subtitle: "Collaborate, learn, and succeed together.",
    image: banner2,
    buttonText: "Get Started",
    link: "/signup",
  },
  {
    id: 2,
    title: "Boost Your Skills",
    subtitle: "Learn new topics from top-rated peers.",
    image: banner3,
    buttonText: "Explore Partners",
    link: "/partners",
  },
  {
    id: 3,
    title: "Achieve Your Goals",
    subtitle: "Study smart, not alone.",
    image: banner1,
    buttonText: "Join Now",
    link: "/join",
  },
];

const BannerCarousel = () => {
  const [current, setCurrent] = useState(0);
  const slidesLength = slides.length;
  const intervalRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slidesLength);
  }, [slidesLength]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slidesLength) % slidesLength);
  }, [slidesLength]);

  // Auto-slide every 5s
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [nextSlide]);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(nextSlide, 5000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div
      className="relative w-full h-[60vh] md:h-[500px] xl:h-[600px] overflow-hidden rounded-xl shadow-2xl mx-auto"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white text-center p-4 md:p-10 lg:p-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-xl tracking-wide animate-slideIn max-w-4xl">
              {slide.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl font-light opacity-90 drop-shadow-md animate-fadeIn">
              {slide.subtitle}
            </p>

            <Link
              to={slide.link}
              className="group flex items-center space-x-2 text-xl md:text-2xl font-semibold
                         py-2 px-4 rounded-lg transition-all duration-300 transform
                         hover:bg-blue-600/20 hover:text-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <span className="relative pb-1">
                {slide.buttonText}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </span>
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between p-4 z-20">
        <button
          onClick={prevSlide}
          className="p-2 bg-black/30 text-white rounded-full hover:bg-black/50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <button
          onClick={nextSlide}
          className="p-2 bg-black/30 text-white rounded-full hover:bg-black/50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-white ring-2 ring-blue-500 w-4 h-4"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
