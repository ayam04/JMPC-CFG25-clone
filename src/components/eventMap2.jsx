"use client";
import React, { useState, useEffect } from "react";
import { MapPin, Calendar, Clock, Users } from "lucide-react";

const EventsSection = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 17.0536, lng: 74.2642 }); // Centered in rural Maharashtra

  // Sample events data for rural Maharashtra
  const events = [
    {
      id: 1,
      title: "Science Day at Abdullat",
      date: "2025-07-15",
      time: "10:30 AM",
      location: "Zilla Parishad School, Abdullat",
      address:
        "Abdullat village, Tal. Shirol, Dist. Kolhapur, Maharashtra 416115",
      coordinates: { lat: 16.8256, lng: 74.6015 },
      attendees: 45,
      description:
        "A hands-on science event for rural students to spark curiosity and learning.",
      category: "Education",
    },
    {
      id: 2,
      title: "Maths Fun Day",
      date: "2025-08-20",
      time: "11:00 AM",
      location: "Primary School, Shirol",
      address: "Shirol, Kolhapur, Maharashtra",
      coordinates: { lat: 16.83, lng: 74.6 },
      attendees: 30,
      description:
        "Interactive maths games and activities for village students.",
      category: "Education",
    },
    {
      id: 3,
      title: "Career Guidance Workshop",
      date: "2025-09-10",
      time: "09:00 AM",
      location: "Community Hall, Nandani",
      address: "Nandani, Tal. Shirol, Kolhapur, Maharashtra",
      coordinates: { lat: 16.9, lng: 74.6 },
      attendees: 25,
      description:
        "Guidance and mentoring for rural students about future opportunities.",
      category: "Workshop",
    },
  ];

  const categoryColors = {
    Education: "bg-green-500",
    Workshop: "bg-blue-500",
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setMapCenter(event.coordinates);
  };

  // Simple map component (in a real Next.js app, you'd use Google Maps or Mapbox)
  const SimpleMap = ({ center, events, selectedEvent }) => {
    return (
      <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
          {/* Map background pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="1"
                />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Event markers */}
          {events.map((event, index) => (
            <div
              key={event.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                selectedEvent?.id === event.id
                  ? "scale-125 z-20"
                  : "hover:scale-110 z-10"
              }`}
              style={{
                left: `${30 + index * 30}%`,
                top: `${40 + (index % 2) * 30}%`,
              }}
              onClick={() => handleEventSelect(event)}
            >
              <div
                className={`w-4 h-4 rounded-full ${
                  categoryColors[event.category]
                } shadow-lg border-2 border-white`}
              >
                <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-current opacity-30 animate-ping"></div>
              </div>
              {selectedEvent?.id === event.id && (
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-lg shadow-lg border min-w-48 z-30">
                  <h4 className="font-semibold text-sm">{event.title}</h4>
                  <p className="text-xs text-gray-600">{event.location}</p>
                </div>
              )}
            </div>
          ))}

          {/* Center indicator */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-2 h-2 bg-red-500 rounded-full shadow-lg"></div>
          </div>
        </div>

        {/* Map controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="bg-white p-2 rounded shadow hover:bg-gray-50 transition-colors">
            <span className="text-lg">+</span>
          </button>
          <button className="bg-white p-2 rounded shadow hover:bg-gray-50 transition-colors">
            <span className="text-lg">−</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Upcoming Rural Events
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore educational and career events for students in rural
          Maharashtra. Click on any event to see its location on the map.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Events List */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Event Listings
          </h3>

          {events.map((event) => (
            <div
              key={event.id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                selectedEvent?.id === event.id
                  ? "border-green-500 shadow-xl"
                  : "border-transparent"
              }`}
              onClick={() => handleEventSelect(event)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                          categoryColors[event.category]
                        }`}
                      >
                        {event.category}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {event.title}
                    </h4>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-green-500" />
                    <span>
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span>{event.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-500" />
                    <span>{event.attendees} students</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">{event.address}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Event Locations
          </h3>
          <div className="sticky top-8">
            <SimpleMap
              center={mapCenter}
              events={events}
              selectedEvent={selectedEvent}
            />

            {/* Map Legend */}
            <div className="mt-4 bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold mb-3">Event Categories</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(categoryColors).map(([category, color]) => (
                  <div key={category} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${color}`}></div>
                    <span className="text-sm text-gray-600">{category}</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedEvent && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">
                  Selected Event
                </h4>
                <p className="text-green-800 font-medium">
                  {selectedEvent.title}
                </p>
                <p className="text-green-600 text-sm">
                  {selectedEvent.location}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsSection;
