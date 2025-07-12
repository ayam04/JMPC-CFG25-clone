import React from "react";

const CoverPage = () => {
  const backgroundImg = "/frontBg.jpg"; // Ensure this path is correct
  return (
    <section
      className="w-full min-h-screen flex items-end justify-center px-4"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <div className="w-full max-w-2xl mx-auto text-center mb-12">
        <h1 className="sm:text-5xl font-bold mb-2 text-black text-8xl bg-amber-50 rounded-2xl p-2">
          Empowering Rural Students Through Science
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          We’re on a mission to bring hands-on science education to rural areas.
          Our dedicated volunteers inspire curiosity and critical thinking.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#get-involved"
            className="bg-orange-600 text-white px-6 py-3 rounded hover:bg-orange-700 transition"
          >
            Become a Volunteer
          </a>
          <a
            href="#about"
            className="border border-orange-600 text-orange-600 px-6 py-3 rounded bg-orange-100 transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default CoverPage;
