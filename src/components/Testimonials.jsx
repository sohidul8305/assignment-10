import React from "react";

const Testimonials = () => {
  const reviews = [
    {
      name: "Habibur Rahman",
      image: "https://i.ibb.co.com/RGXQr0GV/images-q-tbn-ANd9-Gc-RS41-Nx-Ujj-Zvz-B3-VDKups-Hb-Zt-UG7-F9-Xddg-s.jpg",
      paragraph:
        <p>This platform helped me find the perfect study partner! My grades have improved a lot,</p>,
      rating: 5,
    },
    {
      name: "Shadat Hossain",
      image: "https://i.ibb.co.com/Z1277DmY/premium-photo-1682091992663-2e4f4a5534ba-ixlib-rb-4-1.jpg",
       paragraph:
        <p>Very easy to use and helpful for group study sessions. Highly recommend it!</p>,
      rating: 4.8,
    },
    {
      name: "Maya Khan",
      image: "https://i.ibb.co.com/0yRPMP0p/images-q-tbn-ANd9-Gc-Tslg-Cu-D5q-Wrnf-LWGVjh0yu-PIQx-U6-G3g8-HV8-Q-s.jpg",
      paragraph:
        <p>Great way to connect with motivated students around the world.</p>,
      rating: 4.9,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        What Our Users Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
          >
            <img
              src={review.image}
              alt={review.name}
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold text-center">
              {review.name}
            </h3>
            <p className="text-gray-600 text-center italic mt-2">
              “{review.paragraph}”
            </p>
            <p className="text-yellow-500 text-center mt-2">
              ⭐ {review.rating}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
