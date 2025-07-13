"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Navigation,
  Zap,
  Star,
  ArrowRight,
  Filter,
  Search,
  Eye,
  Heart,
  Share2
} from "lucide-react";

const EventsSection = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 17.0536, lng: 74.2642 });
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [hoveredEvent, setHoveredEvent] = useState(null);

  // Enhanced events data for rural Maharashtra
  const events = [
    {
      id: 1,
      title: "Science Discovery Workshop",
      date: "2025-07-15",
      time: "10:30 AM",
      duration: "3 hours",
      location: "Zilla Parishad School, Abdullat",
      address: "Abdullat village, Tal. Shirol, Dist. Kolhapur, Maharashtra 416115",
      coordinates: { lat: 16.8256, lng: 74.6015 },
      attendees: 45,
      maxAttendees: 60,
      description: "A hands-on science event for rural students to spark curiosity and learning through interactive experiments.",
      category: "Education",
      priority: "high",
      image: "/api/placeholder/400/200",
      tags: ["Science", "Hands-on", "Interactive"],
      volunteersNeeded: 3,
      impact: "Expected to reach 45+ students with STEM education"
    },
    {
      id: 2,
      title: "Mathematics Fun Challenge",
      date: "2025-08-20",
      time: "11:00 AM", 
      duration: "2.5 hours",
      location: "Primary School, Shirol",
      address: "Shirol, Kolhapur, Maharashtra",
      coordinates: { lat: 16.83, lng: 74.6 },
      attendees: 30,
      maxAttendees: 50,
      description: "Interactive maths games and activities designed to make learning fun for village students.",
      category: "Education",
      priority: "medium",
      image: "/api/placeholder/400/200",
      tags: ["Mathematics", "Games", "Problem Solving"],
      volunteersNeeded: 2,
      impact: "Improving numeracy skills for 30+ students"
    },
    {
      id: 3,
      title: "Career Guidance Summit",
      date: "2025-09-10",
      time: "09:00 AM",
      duration: "4 hours",
      location: "Community Hall, Nandani",
      address: "Nandani, Tal. Shirol, Kolhapur, Maharashtra",
      coordinates: { lat: 16.9, lng: 74.6 },
      attendees: 25,
      maxAttendees: 40,
      description: "Comprehensive guidance and mentoring session for rural students about future opportunities and career paths.",
      category: "Workshop",
      priority: "high",
      image: "/api/placeholder/400/200",
      tags: ["Career", "Guidance", "Future Planning"],
      volunteersNeeded: 4,
      impact: "Shaping career paths for 25+ rural students"
    },
    {
      id: 4,
      title: "Digital Literacy Drive",
      date: "2025-07-25",
      time: "02:00 PM",
      duration: "3 hours",
      location: "Govt High School, Kagal",
      address: "Kagal, Kolhapur, Maharashtra",
      coordinates: { lat: 16.5847, lng: 74.3142 },
      attendees: 40,
      maxAttendees: 55,
      description: "Introduction to computers and digital tools for students in rural areas.",
      category: "Technology",
      priority: "high",
      image: "/api/placeholder/400/200",
      tags: ["Digital", "Technology", "Computer Skills"],
      volunteersNeeded: 3,
      impact: "Digital empowerment for 40+ students"
    }
  ];

  const categoryColors = {
    Education: "from-emerald-500 to-teal-600",
    Workshop: "from-blue-500 to-indigo-600",
    Technology: "from-purple-500 to-pink-600",
  };

  const priorityColors = {
    high: "border-red-400 bg-red-50 text-red-700",
    medium: "border-yellow-400 bg-yellow-50 text-yellow-700",
    low: "border-green-400 bg-green-50 text-green-700"
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEventSelect = (event) => {
    setSelectedEvent(selectedEvent?.id === event.id ? null : event);
    setMapCenter(event.coordinates);
  };

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Enhanced Interactive Map Component
  const InteractiveMap = ({ center, events, selectedEvent, hoveredEvent }) => {
    return (
      <div className="relative w-full h-[500px] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl overflow-hidden border border-gray-200 shadow-inner">
        {/* Map background with animated grid */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute inset-0 opacity-20"
            animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px"
            }}
          />
          
          {/* Animated background elements */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-blue-200/30 to-purple-200/30"
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Event markers */}
        <AnimatePresence>
          {events.map((event, index) => {
            const isSelected = selectedEvent?.id === event.id;
            const isHovered = hoveredEvent?.id === event.id;
            const basePosition = {
              left: `${25 + (index % 3) * 25}%`,
              top: `${30 + Math.floor(index / 3) * 25}%`,
            };

            return (
              <motion.div
                key={event.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                style={basePosition}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: isSelected || isHovered ? 1.3 : 1,
                  opacity: 1,
                  zIndex: isSelected ? 30 : isHovered ? 20 : 10
                }}
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={() => handleEventSelect(event)}
                onMouseEnter={() => setHoveredEvent(event)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                {/* Pulse animation */}
                <motion.div
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${categoryColors[event.category]} opacity-30`}
                  animate={{ scale: [1, 2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Main marker */}
                <motion.div
                  className={`relative w-12 h-12 rounded-full bg-gradient-to-r ${categoryColors[event.category]} shadow-lg border-4 border-white flex items-center justify-center`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <MapPin className="w-6 h-6 text-white" />
                </motion.div>

                {/* Priority indicator */}
                {event.priority === 'high' && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <span className="text-white text-xs">!</span>
                  </motion.div>
                )}

                {/* Hover tooltip */}
                <AnimatePresence>
                  {(isHovered || isSelected) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: -60, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      className="absolute left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl border border-gray-200 p-3 min-w-56 z-40"
                    >
                      <div className="text-sm font-semibold text-gray-900 mb-1">
                        {event.title}
                      </div>
                      <div className="text-xs text-gray-600 mb-2">
                        📍 {event.location}
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                        <span className={`px-2 py-1 rounded-full ${priorityColors[event.priority]}`}>
                          {event.priority}
                        </span>
                      </div>
                      
                      {/* Arrow pointer */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Map controls */}
        <motion.div 
          className="absolute top-4 right-4 flex flex-col gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button 
            className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg hover:bg-white transition-colors border border-gray-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Navigation className="w-5 h-5 text-gray-700" />
          </motion.button>
          <motion.button 
            className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg hover:bg-white transition-colors border border-gray-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Search className="w-5 h-5 text-gray-700" />
          </motion.button>
        </motion.div>

        {/* Map legend */}
        <motion.div 
          className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="text-xs font-semibold text-gray-800 mb-2">Event Types</div>
          <div className="space-y-1">
            {Object.entries(categoryColors).map(([category, gradient]) => (
              <div key={category} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${gradient}`} />
                <span className="text-xs text-gray-600">{category}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="w-4 h-4" />
            Upcoming Events
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Educational Events Hub
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover and join transformative educational events across rural Maharashtra. 
            Every event is an opportunity to make a difference.
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex flex-1 gap-4 w-full md:w-auto">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events, locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer shadow-sm"
                >
                  <option value="all">All Categories</option>
                  <option value="Education">Education</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Technology">Technology</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <motion.button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Grid View
              </motion.button>
              <motion.button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  viewMode === 'map' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Map View
              </motion.button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {/* Events Grid */}
              {filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border-2 overflow-hidden ${
                    selectedEvent?.id === event.id
                      ? "border-blue-500 shadow-2xl scale-105"
                      : "border-transparent hover:border-blue-200"
                  }`}
                  onClick={() => handleEventSelect(event)}
                  whileHover={{ y: -5 }}
                  layout
                >
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${categoryColors[event.category]}`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    
                    {/* Priority badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${priorityColors[event.priority]}`}>
                      {event.priority} priority
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                      {event.category}
                    </div>

                    {/* Floating action buttons */}
                    <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.button
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className="w-4 h-4 text-gray-600" />
                      </motion.button>
                      <motion.button
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Share2 className="w-4 h-4 text-gray-600" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          {event.description}
                        </p>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <Calendar className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {new Date(event.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                          <div className="text-xs text-gray-500">{event.duration}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="p-2 bg-green-50 rounded-lg">
                          <Clock className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="font-medium text-gray-900">{event.time}</span>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="p-2 bg-purple-50 rounded-lg">
                          <MapPin className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{event.location}</div>
                          <div className="text-xs text-gray-500 truncate">{event.address}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="p-2 bg-orange-50 rounded-lg">
                          <Users className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {event.attendees}/{event.maxAttendees} students
                          </div>
                          <div className="text-xs text-gray-500">
                            {event.volunteersNeeded} volunteers needed
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {event.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Progress bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-xs text-gray-600 mb-2">
                        <span>Registration Progress</span>
                        <span>{Math.round((event.attendees / event.maxAttendees) * 100)}% full</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full bg-gradient-to-r ${categoryColors[event.category]}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <motion.button
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Join Event
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="map"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {/* Events List - Sidebar */}
              <div className="lg:col-span-1 space-y-4 max-h-[600px] overflow-y-auto pr-2">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 sticky top-0 bg-gray-50 py-2">
                  Event Locations ({filteredEvents.length})
                </h3>
                {filteredEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    className={`p-4 bg-white rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      selectedEvent?.id === event.id
                        ? "border-blue-500 shadow-lg"
                        : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                    }`}
                    onClick={() => handleEventSelect(event)}
                    onMouseEnter={() => setHoveredEvent(event)}
                    onMouseLeave={() => setHoveredEvent(null)}
                    whileHover={{ scale: 1.02 }}
                    layout
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {event.title}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs ${priorityColors[event.priority]}`}>
                        {event.priority}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3" />
                        <span>{event.attendees} students</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className={`inline-block px-2 py-1 bg-gradient-to-r ${categoryColors[event.category]} text-white rounded-full text-xs font-medium`}>
                          {event.category}
                        </span>
                        <motion.button
                          className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                          whileHover={{ scale: 1.05 }}
                        >
                          View Details →
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map */}
              <div className="lg:col-span-2">
                <InteractiveMap
                  center={mapCenter}
                  events={filteredEvents}
                  selectedEvent={selectedEvent}
                  hoveredEvent={hoveredEvent}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected Event Details */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Star className="w-6 h-6 text-yellow-500" />
                  {selectedEvent.title} - Detailed View
                </h3>
                <motion.button
                  onClick={() => setSelectedEvent(null)}
                  className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 text-gray-600" />
                </motion.button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Event Information</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date & Time:</span>
                      <span className="font-medium text-gray-900">
                        {new Date(selectedEvent.date).toLocaleDateString()} at {selectedEvent.time}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium text-gray-900">{selectedEvent.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium text-gray-900">{selectedEvent.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Students:</span>
                      <span className="font-medium text-gray-900">
                        {selectedEvent.attendees}/{selectedEvent.maxAttendees}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Impact & Requirements</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-600">Expected Impact:</span>
                      <p className="font-medium text-gray-900 mt-1">{selectedEvent.impact}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Volunteers Needed:</span>
                      <span className="font-medium text-gray-900 ml-2">{selectedEvent.volunteersNeeded}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-700 mb-4">{selectedEvent.description}</p>
                <div className="flex gap-4">
                  <motion.button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Register Now
                  </motion.button>
                  <motion.button
                    className="bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold border border-gray-300 hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Volunteer
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default EventsSection;
