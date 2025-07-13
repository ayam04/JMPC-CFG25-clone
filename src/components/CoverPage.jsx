"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Users, BookOpen, Award, Sparkles, Zap, Globe } from "lucide-react";

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
        ease: [0.05, 0.7, 0.1, 1]
      }
    }
  };

  const statsData = [
    { icon: Users, number: "500+", label: "Students Impacted", color: "from-primary-60 to-primary-70" },
    { icon: BookOpen, number: "50+", label: "Volunteers", color: "from-secondary-60 to-secondary-70" },
    { icon: Award, number: "25+", label: "Schools", color: "from-tertiary-60 to-tertiary-70" },
  ];

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden md-surface-dim"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(var(--md-sys-color-primary), 0.1) 0%, rgba(var(--md-sys-color-tertiary), 0.05) 100%), url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Material 3 Surface Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-variant/80 via-surface/60 to-surface-container/90 backdrop-blur-sm"></div>
      
      {/* Material 3 Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 3 === 0 ? 'w-3 h-3 bg-gradient-to-r from-primary-60 to-primary-80' :
              i % 3 === 1 ? 'w-2 h-2 bg-gradient-to-r from-secondary-60 to-secondary-80' :
              'w-4 h-4 bg-gradient-to-r from-tertiary-60 to-tertiary-80'
            } opacity-20`}
            animate={{
              y: [-20, -120],
              x: [Math.random() * 50 - 25, Math.random() * 50 - 25],
              opacity: [0, 0.3, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Material 3 Geometric Background Shapes */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary-60/10 to-tertiary-60/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-secondary-60/10 to-primary-60/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center"
      >
        {/* Material 3 Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-6 py-3 md-surface-container-highest md-elevation-1 rounded-full mb-8 border border-outline-variant/20"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-4 h-4 md-text-primary" />
          </motion.div>
          <span className="md-typescale-label-large md-text-on-surface font-medium">
            🚀 Transforming Education Through Science
          </span>
        </motion.div>

        {/* Material 3 Hero Title */}
        <motion.h1
          variants={itemVariants}
          className="md-typescale-display-large font-bold mb-8 leading-tight"
        >
          <span className="md-text-on-surface">Empowering Rural Students</span>
          <motion.span 
            className="block bg-gradient-to-r from-primary-60 via-secondary-60 to-tertiary-60 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            style={{ backgroundSize: "200% 200%" }}
          >
            Through Science & Innovation
          </motion.span>
        </motion.h1>

        {/* Material 3 Description */}
        <motion.p
          variants={itemVariants}
          className="md-typescale-body-large md-text-on-surface-variant mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          We're on a mission to bring hands-on science education to rural areas.
          Our dedicated volunteers inspire curiosity, critical thinking, and a love for learning
          through innovative teaching methods and creative experiments.
        </motion.p>

        {/* Material 3 Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <motion.a
            href="#get-involved"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="md-filled-button md-elevation-2 px-8 py-4 group relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary-70 to-primary-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.05 }}
            />
            <span className="relative flex items-center md-typescale-label-large font-semibold">
              <Zap className="mr-2 w-5 h-5" />
              Become a Volunteer
              <motion.div
                className="ml-2"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </span>
          </motion.a>
          
          <motion.a
            href="#about"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="md-outlined-button px-8 py-4 md-ripple-surface group"
          >
            <span className="flex items-center md-typescale-label-large font-semibold">
              <Play className="mr-2 w-5 h-5" />
              Watch Our Story
            </span>
          </motion.a>
        </motion.div>

        {/* Material 3 Stats Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 1 + index * 0.15,
                duration: 0.6,
                ease: [0.05, 0.7, 0.1, 1]
              }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                boxShadow: "var(--elevation-3)"
              }}
              className="md-surface-container-high md-elevation-2 rounded-3xl p-8 border border-outline-variant/10 hover:border-primary-60/20 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Card Background Gradient */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                whileHover={{ scale: 1.1 }}
              />
              
              <div className="relative">
                {/* Icon Container */}
                <motion.div 
                  className="flex items-center justify-center mb-6"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`p-4 bg-gradient-to-br ${stat.color} rounded-2xl md-elevation-1`}>
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
                
                {/* Stats Number */}
                <motion.div 
                  className="md-typescale-display-medium font-bold md-text-primary mb-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5 + index * 0.1, type: "spring", stiffness: 200 }}
                >
                  {stat.number}
                </motion.div>
                
                {/* Stats Label */}
                <div className="md-typescale-title-medium md-text-on-surface font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Material 3 Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-12 border-2 border-outline/50 rounded-full flex justify-center md-surface-container-high backdrop-blur-sm"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-3 bg-primary-60 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CoverPage;
