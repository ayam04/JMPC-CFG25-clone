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
    <div className="w-72 h-72 min-w-[18rem] min-h-[18rem] max-w-[18rem] max-h-[18rem] md-shape-corner-extra-large overflow-hidden md-elevation-2 md-surface-container group">
      <img
        src={review.image}
        alt={review.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        style={{ aspectRatio: "1 / 1" }}
      />
    </div>
    <div className="md-surface-container md-elevation-1 md-shape-corner-large p-10 flex-1 relative">
      <div className="absolute top-0 left-0 w-8 h-8 md-primary-container md-shape-corner-full flex items-center justify-center text-xl transform -translate-x-4 -translate-y-4">
        💬
      </div>
      
      <p className="md-typescale-body-large md-text-on-surface mb-6 font-medium leading-relaxed">
        "{review.text}"
      </p>
      
      <div className="flex items-center gap-4">
        <div className="flex text-primary-60">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-lg">⭐</span>
          ))}
        </div>
        <span className="md-typescale-title-medium md-text-primary font-bold">{review.name}</span>
      </div>
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
    <section className="min-h-screen md-surface flex flex-col items-center justify-center px-4 py-24 relative overflow-hidden">
      {/* Material 3 Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-80 h-80 bg-gradient-to-br from-primary-60/5 to-tertiary-60/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-tl from-secondary-60/5 to-primary-60/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        {/* Material 3 Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 md-surface-container-highest md-elevation-1 rounded-full mb-8">
            <span className="text-2xl">🗣️</span>
            <span className="md-typescale-label-large md-text-on-surface font-medium">
              Student Voices
            </span>
          </div>
          
          <h2 className="md-typescale-display-medium md-text-on-surface font-bold text-center">
            <span className="bg-gradient-to-r from-primary-60 via-secondary-60 to-tertiary-60 bg-clip-text text-transparent">
              What Our Students Say
            </span>
          </h2>
        </div>

        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
          <div className="relative w-full min-h-[22rem]">
            <ReviewCard review={reviews[current]} animate={animate} />
            <button
              onClick={prevReview}
              className="absolute left-0 top-1/2 -translate-y-1/2 md-fab md-fab-small md-primary-container md-ripple-surface flex items-center justify-center text-2xl"
            aria-label="Previous Review"
          >
            &#8592;
          </button>
          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 -translate-y-1/2 md-fab md-fab-small md-primary-container md-ripple-surface flex items-center justify-center text-2xl"
            aria-label="Next Review"
          >
            &#8594;
          </button>
        </div>
        
        {/* Material 3 Dot Navigation */}
        <div className="flex gap-3 mt-6 justify-center">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToReview(idx)}
              className={`w-4 h-4 md-shape-corner-full transition-all duration-300 ${
                current === idx 
                  ? "md-primary-container md-elevation-1 scale-125" 
                  : "md-outline hover:md-surface-container-high"
              }`}
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
    </section>
  );
};

export default ReviewsPage;
