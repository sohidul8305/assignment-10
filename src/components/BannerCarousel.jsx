
import React from "react";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";

const slides = [
  {
    id: 1,
    title: "Find Your Perfect Study Partner",
    subtitle: "Collaborate, learn, and succeed together.",
    image: banner1, 
    buttonText: "Get Started",
  },
  {
    id: 2,
    title: "Boost Your Skills",
    subtitle: "Learn new topics from top-rated peers.",
    image: banner2,
    buttonText: "Explore Partners",
  },
  {
    id: 3,
    title: "Achieve Your Goals",
    subtitle: "Study smart, not alone.",
    image: banner3,
    buttonText: "Join Now",
  },
];

const BannerCarousel = () => {
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          } bg-cover bg-center`}
          style={{
            backgroundImage: `url(${slide.image})`,
          }}
        >
          {/* Overlay + Text */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-4">
            <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
            <p className="mb-4">{slide.subtitle}</p>
            <button className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-700 transition">
              {slide.buttonText}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BannerCarousel;
