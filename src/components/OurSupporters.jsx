"use client";
import React, { useState, useEffect, useRef } from "react";

// Add your brand images here
const brands = [
  { name: "Brand 1", image: "/brandImg/brand1.png" },
  { name: "Brand 2", image: "/brandImg/brand2.png" },
  { name: "Brand 3", image: "/brandImg/brand3.jpg" },
  { name: "Brand 4", image: "/brandImg/brand4.png" },
  { name: "Brand 5", image: "/brandImg/brand5.png" },
];

const AUTO_CHANGE_INTERVAL = 2500;

const OurSupporters = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef();

  const nextBrand = () => {
    setCurrent((prev) => (prev === brands.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      nextBrand();
    }, AUTO_CHANGE_INTERVAL);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  const goToBrand = (idx) => setCurrent(idx);

  return (
    <section className="w-full bg-white py-20 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-orange-600 mb-10 text-center">
        Our Supporters
      </h2>
      <div className="w-full max-w-xl flex flex-col items-center">
        <div className="relative w-full flex justify-center items-center min-h-[7rem]">
          <div className="flex flex-col items-center transition-all duration-700">
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg bg-orange-50 flex items-center justify-center border-2 border-orange-100">
              <img
                src={brands[current].image}
                alt={brands[current].name}
                className="w-full h-full object-contain"
                style={{ aspectRatio: "1 / 1" }}
              />
            </div>
            <span className="mt-3 text-base font-semibold text-orange-700">
              {brands[current].name}
            </span>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          {brands.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToBrand(idx)}
              className={`w-3 h-3 rounded-full ${
                current === idx ? "bg-orange-600" : "bg-orange-200"
              }`}
              aria-label={`Go to brand ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurSupporters;
