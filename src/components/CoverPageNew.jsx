"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Users, BookOpen, Award } from "lucide-react";

const CoverPage = () => {
  const backgroundImg = "/frontBg.jpg";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const statsData = [
    { icon: Users, number: "500+", label: "Students" },
    { icon: BookOpen, number: "50+", label: "Volunteers" },
    { icon: Award, number: "25+", label: "Schools" },
  ];

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent"></div>
      
      {/* Floating particles animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary-400 rounded-full opacity-30"
            animate={{
              y: [-20, -100],
              x: [Math.random() * 100, Math.random() * 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-6xl mx-auto px-4 text-center"
      >
        {/* Main content */}
        <div className="mb-16">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white mb-6 border border-white/20"
          >
            <span className="text-sm font-medium">🚀 Transforming Education</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight"
          >
            Empowering Rural Students
            <span className="block bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Through Science
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            We're on a mission to bring hands-on science education to rural areas.
            Our dedicated volunteers inspire curiosity, critical thinking, and a love for learning.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <motion.a
              href="#get-involved"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Become a Volunteer
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.a>
            
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold border border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Our Story
            </motion.a>
          </motion.div>
        </div>

        {/* Stats section */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-primary-500 rounded-full">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-gray-200 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-white/50 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CoverPage;
