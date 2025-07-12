"use client";
import React, { useState, useEffect, useRef } from "react";

const reviews = [
  {
    name: "Aarav Sharma",
    text: "VigyanSaathi changed my outlook on science. The volunteers made learning fun and practical!",
    image: "/review1.jpg",
  },
  {
    name: "Priya Patel",
    text: "Thanks to the mentorship, I now dream of becoming a teacher myself. The support was incredible.",
    image: "/review2.jpg",
  },
  {
    name: "Rohit Singh",
    text: "Our school feels alive with curiosity. The experiments and activities inspired all of us.",
    image: "/review3.jpeg",
  },
];

const ReviewCard = ({ review, animate }) => (
  <div
    className={`flex flex-col sm:flex-row items-center gap-12 mb-16 transition-all duration-700 ease-in-out ${
      animate
        ? "opacity-100 translate-y-0 scale-100"
        : "opacity-0 translate-y-8 scale-95"
    }`}
  >
    <div className="w-72 h-72 min-w-[18rem] min-h-[18rem] max-w-[18rem] max-h-[18rem] rounded-2xl overflow-hidden shadow-2xl border-4 border-orange-200 bg-white">
      <img
        src={review.image}
        alt={review.name}
        className="w-full h-full object-cover"
        style={{ aspectRatio: "1 / 1" }}
      />
    </div>
    <div className="bg-white rounded-2xl shadow-2xl p-10 flex-1 border-2 border-orange-100">
      <p className="text-gray-700 text-2xl mb-4 font-medium leading-relaxed">
        "{review.text}"
      </p>
      <span className="text-orange-600 font-bold text-xl">{review.name}</span>
    </div>
  </div>
);

const AUTO_CHANGE_INTERVAL = 2000;

const ReviewsPage = () => {
  const [current, setCurrent] = useState(0);
  const [animate, setAnimate] = useState(true);
  const timeoutRef = useRef();

  const prevReview = () => {
    setAnimate(false);
    setTimeout(() => {
      setCurrent((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
      setAnimate(true);
    }, 300);
  };

  const nextReview = () => {
    setAnimate(false);
    setTimeout(() => {
      setCurrent((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
      setAnimate(true);
    }, 300);
  };

  // Auto change reviews
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      nextReview();
    }, AUTO_CHANGE_INTERVAL);
    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line
  }, [current]);

  // For dot navigation
  const goToReview = (idx) => {
    setAnimate(false);
    setTimeout(() => {
      setCurrent(idx);
      setAnimate(true);
    }, 300);
  };

  return (
    <section className="min-h-screen bg-orange-50 flex flex-col items-center justify-center px-4 py-24">
      <h2 className="text-4xl font-bold text-orange-600 mb-14 text-center">
        What Our Students Say
      </h2>
      <div className="w-full max-w-4xl flex flex-col items-center">
        <div className="relative w-full min-h-[22rem]">
          <ReviewCard review={reviews[current]} animate={animate} />
          <button
            onClick={prevReview}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-orange-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl hover:bg-orange-600 transition text-2xl"
            aria-label="Previous Review"
          >
            &#8592;
          </button>
          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-orange-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl hover:bg-orange-600 transition text-2xl"
            aria-label="Next Review"
          >
            &#8594;
          </button>
        </div>
        <div className="flex gap-3 mt-6">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToReview(idx)}
              className={`w-4 h-4 rounded-full border-2 border-orange-400 ${
                current === idx ? "bg-orange-600" : "bg-orange-200"
              } transition`}
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsPage;
