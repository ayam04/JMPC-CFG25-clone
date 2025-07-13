"use client";
import { motion } from "framer-motion";
import {
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Heart,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { Icon: Facebook, href: "#", label: "Facebook" },
    { Icon: Twitter, href: "#", label: "Twitter" },
    { Icon: Instagram, href: "#", label: "Instagram" },
    { Icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const quickLinks = [
    { href: "#about", label: "About Us" },
    { href: "#impact", label: "Our Impact" },
    { href: "#events", label: "Events" },
    { href: "#get-involved", label: "Get Involved" },
  ];

  const contactInfo = [
    {
      Icon: Mail,
      content: ["contactvidyoday@gmail.com", "vinayakmali90@gmail.com"],
      type: "email"
    },
    {
      Icon: Phone,
      content: ["+91 9420608084"],
      type: "phone"
    },
    {
      Icon: MapPin,
      content: ["Abdullat village, Tal. Shirol, Dist. Kolhapur, Maharashtra 416115"],
      type: "address"
    },
  ];

  return (
    <footer className="md-surface-container-low relative overflow-hidden">
      {/* Material 3 Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-primary-60 to-tertiary-60 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-gradient-to-tl from-secondary-60 to-primary-60 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Section - Material 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-1 lg:col-span-5"
          >
            <div className="flex items-center mb-6">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 md-primary-container md-elevation-2 rounded-3xl flex items-center justify-center">
                  <motion.span 
                    className="text-3xl"
                    animate={{ 
                      rotate: [0, 10, -10, 0] 
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    🔬
                  </motion.span>
                </div>
                <motion.div 
                  className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-primary-60 to-tertiary-60 rounded-full md-elevation-1 flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-3 h-3 text-white" />
                </motion.div>
              </motion.div>
              <div className="ml-4">
                <h2 className="md-typescale-headline-small md-text-primary font-bold">
                  VigyanSaathi
                </h2>
                <p className="md-typescale-body-medium md-text-on-surface-variant">
                  Science for All
                </p>
              </div>
            </div>
            
            <p className="md-typescale-body-large md-text-on-surface-variant mb-8 max-w-md leading-relaxed">
              Creating positive change around the world through community-driven 
              initiatives and sustainable science education solutions.
            </p>

            {/* Material 3 Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ Icon, href, label }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ 
                    scale: 1.1, 
                    y: -2,
                    boxShadow: "var(--elevation-2)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 md-surface-container-highest md-ripple-surface rounded-2xl flex items-center justify-center transition-all duration-200 hover:md-primary-container group"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 md-text-on-surface-variant group-hover:md-text-primary transition-colors duration-200" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links - Material 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-1 lg:col-span-3"
          >
            <h3 className="md-typescale-title-large md-text-on-surface font-bold mb-6">
              Quick Links
            </h3>
            <nav className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="group flex items-center py-2 md-text-on-surface-variant hover:md-text-primary transition-all duration-200"
                >
                  <span className="md-typescale-body-large">
                    {link.label}
                  </span>
                  <ArrowUpRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info - Material 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="col-span-1 lg:col-span-4"
          >
            <h3 className="md-typescale-title-large md-text-on-surface font-bold mb-6">
              Contact Info
            </h3>
            <div className="space-y-6">
              {contactInfo.map(({ Icon, content, type }, index) => (
                <motion.div
                  key={type}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start group"
                >
                  <div className="w-12 h-12 md-surface-container-highest rounded-2xl flex items-center justify-center mr-4 group-hover:md-primary-container transition-all duration-200">
                    <Icon className="w-5 h-5 md-text-on-surface-variant group-hover:md-text-primary transition-colors duration-200" />
                  </div>
                  <div className="flex-1">
                    {content.map((item, i) => (
                      <p key={i} className="md-typescale-body-medium md-text-on-surface-variant break-words">
                        {item}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Material 3 Copyright Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-outline-variant/20 mt-16 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="md-typescale-body-medium md-text-on-surface-variant">
              Copyright © 2025 Vidyoday Muktangan Parivar Foundation
            </p>
            <motion.div 
              className="flex items-center gap-2 md-text-primary"
              whileHover={{ scale: 1.02 }}
            >
              <span className="md-typescale-body-medium">Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 fill-current" />
              </motion.div>
              <span className="md-typescale-body-medium">for education</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
