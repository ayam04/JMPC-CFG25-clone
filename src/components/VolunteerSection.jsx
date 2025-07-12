"use client";

import React from "react";
import Link from "next/link";

const VolunteersSection = () => {
  const backgroundImg = "/collage.jpg"; // Ensure this path is correct

  return (
    <section
      id="get-involved"
      className="min-h-screen flex items-center justify-center bg-white px-4"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <div className="text-center max-w-3xl">
        <h2 className="text-8xl font-extrabold text-white mb-4">
          Get Involved
        </h2>
        {/* <p className="text-gray-200 text-3xl mb-6">
          Whether you're a student, teacher, or a science enthusiast, your time
          and effort can shape the future of rural kids. Join us as a volunteer
          or contribute in any way you can.
        </p> */}
        <Link href="/new-volunteer">
          <button className="bg-orange-600 text-white px-6 py-3 rounded hover:bg-orange-700 transition">
            Join the Movement
          </button>
        </Link>
      </div>
    </section>
  );
};

export default VolunteersSection;
