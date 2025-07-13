"use client";
import React from "react";
import { motion } from "framer-motion";
import { Users, GraduationCap, TrendingUp, School, Heart, Award, Sparkles, Zap } from "lucide-react";

const stats = [
  {
    number: "500+",
    title: "Students Reached",
    desc: "Across rural communities",
    icon: Users,
    color: "from-primary-60 to-primary-80",
    bgColor: "md-primary-container"
  },
  {
    number: "50+",
    title: "Volunteer Teachers",
    desc: "Dedicated educators",
    icon: GraduationCap,
    color: "from-secondary-60 to-secondary-80",
    bgColor: "md-secondary-container"
  },
  {
    number: "95%",
    title: "Success Rate",
    desc: "Students advancing grades",
    icon: TrendingUp,
    color: "from-tertiary-60 to-tertiary-80",
    bgColor: "md-tertiary-container"
  },
  {
    number: "25+",
    title: "Rural Schools",
    desc: "Partner institutions",
    icon: School,
    color: "from-primary-70 to-secondary-70",
    bgColor: "md-primary-container"
  },
  {
    number: "3",
    title: "Years Impact",
    desc: "Building better futures",
    icon: Award,
    color: "from-secondary-70 to-tertiary-70",
    bgColor: "md-secondary-container"
  },
  {
    number: "1000+",
    title: "Lives Changed",
    desc: "Through education",
    icon: Heart,
    color: "from-tertiary-70 to-primary-70",
    bgColor: "md-tertiary-container"
  },
];

const ImpactSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.05, 0.7, 0.1, 1]
      }
    }
  };

  return (
    <section
      id="impact"
      className="min-h-screen flex items-center justify-center md-surface relative overflow-hidden px-6 py-20"
    >
      {/* Material 3 Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 left-10 w-80 h-80 bg-gradient-to-br from-primary-60/5 to-tertiary-60/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-tl from-secondary-60/5 to-primary-60/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -45, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto">
        {/* Material 3 Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.05, 0.7, 0.1, 1] }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div className="inline-flex items-center gap-2 px-6 py-3 md-surface-container-highest md-elevation-1 rounded-full mb-8">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 md-text-primary" />
            </motion.div>
            <span className="md-typescale-label-large md-text-on-surface font-medium">
              📊 Our Impact Story
            </span>
          </motion.div>
          
          <motion.h2 
            className="md-typescale-display-medium font-bold mb-8"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-primary-60 via-secondary-60 to-tertiary-60 bg-clip-text text-transparent">
              Our Impact in Numbers
            </span>
          </motion.h2>
          
          <motion.p 
            className="md-typescale-body-large md-text-on-surface-variant mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Every number represents a life transformed, a dream realized, and a
            community empowered through science education and innovation.
          </motion.p>
        </motion.div>

        {/* Material 3 Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              variants={itemVariants}
              whileHover={{ 
                y: -12,
                scale: 1.02,
                boxShadow: "var(--elevation-3)",
                transition: { duration: 0.3, ease: [0.05, 0.7, 0.1, 1] }
              }}
              className="group relative md-surface-container md-elevation-1 rounded-3xl overflow-hidden border border-outline-variant/10 hover:border-primary-60/20 transition-all duration-300"
            >
              {/* Material 3 Background Gradient */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                whileHover={{ scale: 1.05 }}
              />
              
              {/* Floating Icons */}
              <div className="absolute top-4 right-4 opacity-10">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  <stat.icon className="w-12 h-12 md-text-on-surface-variant" />
                </motion.div>
              </div>
              
              {/* Content */}
              <div className="relative p-8 text-center">
                {/* Material 3 Icon Container */}
                <motion.div 
                  className="flex items-center justify-center mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`p-4 rounded-3xl bg-gradient-to-br ${stat.color} md-elevation-2 relative`}>
                    <stat.icon className="w-8 h-8 text-white" />
                    <motion.div 
                      className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Zap className="w-2 h-2 text-primary-60" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Material 3 Number Animation */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    delay: index * 0.1 + 0.5,
                    duration: 0.8,
                    type: "spring",
                    bounce: 0.4
                  }}
                  viewport={{ once: true }}
                  className={`md-typescale-display-small font-bold mb-4 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                >
                  {stat.number}
                </motion.div>

                {/* Material 3 Typography */}
                <h3 className="md-typescale-title-large md-text-on-surface font-bold mb-3 group-hover:md-text-primary transition-colors duration-300">
                  {stat.title}
                </h3>

                <p className="md-typescale-body-medium md-text-on-surface-variant group-hover:md-text-on-surface transition-colors duration-300">
                  {stat.desc}
                </p>

                {/* Material 3 Progress Bar */}
                <motion.div 
                  className="mt-6 h-1 bg-outline-variant/20 rounded-full overflow-hidden"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ delay: index * 0.1 + 1, duration: 1 }}
                >
                  <motion.div 
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "0%" }}
                    transition={{ delay: index * 0.1 + 1.2, duration: 0.8 }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Material 3 Call-to-Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="md-primary-container md-elevation-2 rounded-4xl p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-white to-transparent rounded-full blur-2xl" />
              <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-tl from-white to-transparent rounded-full blur-xl" />
            </div>
            
            <div className="relative">
              <motion.h3 
                className="md-typescale-headline-large md-text-on-primary-container font-bold mb-6"
                whileHover={{ scale: 1.02 }}
              >
                Join Our Mission Today
              </motion.h3>
              <p className="md-typescale-body-large md-text-on-primary-container/80 mb-10 max-w-3xl mx-auto">
                Together, we can reach even more students and create lasting change in rural science education.
              </p>
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: "var(--elevation-3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="md-filled-button md-elevation-2 px-10 py-4 bg-white text-primary-60 relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-60 to-primary-70 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  whileHover={{ scale: 1.05 }}
                />
                <span className="relative flex items-center md-typescale-label-large font-semibold">
                  <Zap className="mr-2 w-5 h-5" />
                  Get Involved Today
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;
