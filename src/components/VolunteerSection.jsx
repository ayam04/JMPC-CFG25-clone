"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Users, BookOpen, Sparkles, ArrowRight, Zap, Globe, Star } from "lucide-react";

const VolunteersSection = () => {
  const backgroundImg = "/collage.jpg";

  const features = [
    {
      icon: Heart,
      title: "Make a Difference",
      description: "Transform lives through science education",
      color: "from-primary-60 to-primary-80"
    },
    {
      icon: Users,
      title: "Join Our Community",
      description: "Connect with passionate educators",
      color: "from-secondary-60 to-secondary-80"
    },
    {
      icon: BookOpen,
      title: "Share Knowledge",
      description: "Inspire the next generation",
      color: "from-tertiary-60 to-tertiary-80"
    }
  ];

  return (
    <section
      id="get-involved"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(var(--md-sys-color-surface), 0.9) 0%, rgba(var(--md-sys-color-surface-variant), 0.8) 100%), url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Material 3 Background Elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 left-10 w-80 h-80 bg-gradient-to-br from-primary-60/10 to-tertiary-60/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], rotate: [0, 60, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-tl from-secondary-60/10 to-primary-60/10 rounded-full blur-3xl"
          animate={{ scale: [1.3, 1, 1.3], rotate: [0, -60, 0] }}
          transition={{ duration: 30, repeat: Infinity }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              i % 4 === 0 ? 'w-2 h-2 bg-gradient-to-r from-primary-60 to-primary-80' :
              i % 4 === 1 ? 'w-3 h-3 bg-gradient-to-r from-secondary-60 to-secondary-80' :
              i % 4 === 2 ? 'w-1.5 h-1.5 bg-gradient-to-r from-tertiary-60 to-tertiary-80' :
              'w-2.5 h-2.5 bg-gradient-to-r from-primary-70 to-secondary-70'
            } opacity-30`}
            animate={{
              y: [-20, -150],
              x: [Math.random() * 30 - 15, Math.random() * 30 - 15],
              opacity: [0, 0.5, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 5 + 4,
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.05, 0.7, 0.1, 1] }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            {/* Material 3 Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-6 py-3 md-surface-container-highest md-elevation-1 rounded-full mb-8"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 md-text-primary" />
              </motion.div>
              <span className="md-typescale-label-large md-text-on-surface font-medium">
                🚀 Join Our Mission
              </span>
            </motion.div>

            {/* Material 3 Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md-typescale-display-large font-bold mb-8 leading-tight"
            >
              <span className="md-text-on-surface">Get</span>
              <motion.span 
                className="block bg-gradient-to-r from-primary-60 via-secondary-60 to-tertiary-60 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Involved
              </motion.span>
            </motion.h2>

            {/* Material 3 Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="md-typescale-body-large md-text-on-surface-variant mb-10 leading-relaxed max-w-2xl"
            >
              Whether you're a student, teacher, or science enthusiast, your time
              and effort can shape the future of rural kids. Join us as a volunteer
              or contribute in any way you can to make science accessible to all.
            </motion.p>

            {/* Material 3 CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/new-volunteer">
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    y: -3,
                    boxShadow: "var(--elevation-3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="md-filled-button md-elevation-2 px-10 py-5 group relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-70 to-primary-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.05 }}
                  />
                  <span className="relative flex items-center md-typescale-label-large font-bold">
                    <Zap className="mr-3 w-6 h-6" />
                    Join the Movement
                    <motion.div
                      className="ml-3"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-6 h-6" />
                    </motion.div>
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Features Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.05, 0.7, 0.1, 1] }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.8 + index * 0.15,
                  ease: [0.05, 0.7, 0.1, 1]
                }}
                whileHover={{ 
                  x: 8, 
                  scale: 1.02,
                  boxShadow: "var(--elevation-2)"
                }}
                className="md-surface-container md-elevation-1 rounded-3xl p-8 border border-outline-variant/10 hover:border-primary-60/20 transition-all duration-300 group"
              >
                <div className="flex items-start gap-6">
                  {/* Material 3 Icon */}
                  <motion.div 
                    className={`p-4 rounded-2xl bg-gradient-to-br ${feature.color} md-elevation-1 flex-shrink-0`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="md-typescale-title-large md-text-on-surface font-bold mb-3 group-hover:md-text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="md-typescale-body-medium md-text-on-surface-variant leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Arrow Indicator */}
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ x: 4 }}
                  >
                    <ArrowRight className="w-5 h-5 md-text-primary" />
                  </motion.div>
                </div>
              </motion.div>
            ))}

            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="md-primary-container md-elevation-2 rounded-3xl p-8 text-center"
            >
              <div className="flex items-center justify-center gap-8">
                <div>
                  <motion.div 
                    className="md-typescale-headline-large md-text-on-primary-container font-bold"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
                  >
                    50+
                  </motion.div>
                  <p className="md-typescale-body-medium md-text-on-primary-container/80">
                    Active Volunteers
                  </p>
                </div>
                <div className="w-px h-12 bg-outline-variant/30" />
                <div>
                  <motion.div 
                    className="md-typescale-headline-large md-text-on-primary-container font-bold"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 1.7, type: "spring", stiffness: 200 }}
                  >
                    500+
                  </motion.div>
                  <p className="md-typescale-body-medium md-text-on-primary-container/80">
                    Students Reached
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VolunteersSection;
