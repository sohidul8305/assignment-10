import React from "react";

const Testimonials = () => {
  const reviews = [
    {
      name: "Habibur Rahman",
      image:
        "https://i.ibb.co/RGXQr0GV/images-q-tbn-ANd9-Gc-RS41-Nx-Ujj-Zvz-B3-VDKups-Hb-Zt-UG7-F9-Xddg-s.jpg",
      paragraph:
        "This platform helped me find the perfect study partner! My grades have improved a lot.",
      rating: 5,
    },
    {
      name: "Shadat Hossain",
      image:
        "https://i.ibb.co/Z1277DmY/premium-photo-1682091992663-2e4f4a5534ba-ixlib-rb-4-1.jpg",
      paragraph:
        "Very easy to use and helpful for group study sessions. Highly recommend it!",
      rating: 4.8,
    },
    {
      name: "Maya Khan",
      image:
        "https://i.ibb.co/0yRPMP0p/images-q-tbn-ANd9-Gc-Tslg-Cu-D5q-Wrnf-LWGVjh0yu-PIQx-U6-G3g8-HV8-Q-s.jpg",
      paragraph:
        "Great way to connect with motivated students around the world.",
      rating: 4.9,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        What Our Users Say
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all flex flex-col items-center text-center"
          >
            <img
              src={review.image}
              alt={review.name}
              className="w-20 h-20 rounded-full object-cover mb-4"
            />
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              {review.name}
            </h3>
            <p className="text-gray-600 text-sm sm:text-base italic">
              “{review.paragraph}”
            </p>
            <p className="text-yellow-500 text-lg mt-3">⭐ {review.rating}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
