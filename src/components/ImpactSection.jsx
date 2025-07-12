import React from "react";

const stats = [
  {
    number: "500+",
    title: "Students Reached",
    desc: "Across rural communities",
  },
  {
    number: "50+",
    title: "Volunteer Teachers",
    desc: "Dedicated educators",
  },
  {
    number: "95%",
    title: "Success Rate",
    desc: "Students advancing grades",
  },
  {
    number: "25+",
    title: "Rural Schools",
    desc: "Partner institutions",
  },
  {
    number: "3",
    title: "Years Impact",
    desc: "Building better futures",
  },
  {
    number: "1000+",
    title: "Lives Changed",
    desc: "Through education",
  },
];

const ImpactSection = () => {
  return (
    <section
      id="impact"
      className="min-h-screen flex items-center justify-center bg-orange-100 px-4"
    >
      <div className="w-full max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-orange-600 mb-4 text-center">
          Our Impact in Numbers
        </h2>
        <p className="text-lg text-gray-700 mb-10 text-center max-w-2xl mx-auto">
          Every number represents a life transformed, a dream realized, and a
          community empowered through education.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white rounded-lg shadow p-8 flex flex-col items-center cursor-pointer transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-orange-50"
            >
              <p className="text-4xl text-orange-600 font-bold mb-2 transition-colors duration-300 group-hover:text-orange-700">
                {stat.number}
              </p>
              <span className="text-orange-700 text-xl font-semibold mb-1">
                {stat.title}
              </span>
              <span className="text-gray-500 text-base">{stat.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
