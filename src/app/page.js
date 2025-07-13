"use client";

import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import CoverPage from "../components/CoverPage";
import EventsSection from "../components/eventMap2";
import ImpactSection from "../components/ImpactSection";
import VolunteersSection from "../components/VolunteerSection";
import ReviewsPage from "../components/ReviewsPage";
import OurSupporters from "../components/OurSupporters";
import Footer from "../components/Footer";
import FloatingChatWidget from "../components/FloatingChatWidget";
import EventNotifier from "../components/EventNotifier";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const sectionVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export default function Home() {
  return (
    <div className="md-surface min-h-screen">
      {/* Material 3 Header with Sticky Positioning */}
      <div className="sticky top-0 z-50 md-surface-container-low md-elevation-2">
        <Header />
      </div>

      {/* Main Content with Material 3 Layout */}
      <motion.main 
        className="relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.section 
          variants={sectionVariants}
          className="md-surface"
        >
          <CoverPage />
        </motion.section>

        {/* Events Section with Material 3 Spacing */}
        <motion.section 
          variants={sectionVariants}
          className="md-surface-container-lowest py-16"
        >
          <EventsSection />
        </motion.section>

        {/* Impact Section */}
        <motion.section 
          variants={sectionVariants}
          className="md-surface py-16"
        >
          <ImpactSection />
        </motion.section>

        {/* Volunteers Section */}
        <motion.section 
          variants={sectionVariants}
          className="md-surface-container-low py-16"
        >
          <VolunteersSection />
        </motion.section>

        {/* Reviews Section */}
        <motion.section 
          variants={sectionVariants}
          className="md-surface py-16"
        >
          <ReviewsPage />
        </motion.section>

        {/* Supporters Section */}
        <motion.section 
          variants={sectionVariants}
          className="md-surface-container-lowest py-16"
        >
          <OurSupporters />
        </motion.section>
      </motion.main>

      {/* Material 3 Footer */}
      <Footer />

      {/* Floating Elements */}
      <FloatingChatWidget />
      <EventNotifier />
    </div>
  );
}