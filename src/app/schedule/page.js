"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Filter, Search, ChevronLeft, ChevronRight, Plus, GraduationCap, BookOpen, Phone, Building2 } from 'lucide-react';
import Header from '@/components/navbar/header';
import Head from 'next/head';

const SchedulePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('month'); // 'month', 'week', 'day'
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Mock volunteer data - replace with actual volunteer ID from your auth system
  const volunteer = {
    name: "Harshita Ranka",
    id: "volunteer_001",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    totalHours: 156,
    upcomingEvents: 8
  };

  // Mock events data - replace with actual Google Calendar API calls
  const mockEvents = [
    {
      id: '1',
      title: 'Educational Session - Mathematics',
      start: new Date(2025, 5, 8, 10, 0),
      end: new Date(2025, 5, 8, 12, 0),
      location: 'St. Xavier\'s High School, Fort',
      type: 'education',
      grade: '8th Standard',
      students: 45,
      subject: 'Mathematics',
      description: 'Interactive math session covering algebra and geometry basics',
      schoolDetails: {
        name: 'St. Xavier\'s High School',
        address: 'Fort, Mumbai - 400001',
        principalName: 'Mrs. Priya Sharma',
        contactNumber: '+91 22 2266 1234',
        medium: 'English',
        board: 'ICSE'
      }
    },
    {
      id: '2',
      title: 'Science Workshop - Physics',
      start: new Date(2025, 5, 10, 14, 0),
      end: new Date(2025, 5, 10, 16, 0),
      location: 'Mumbai Public School, Bandra',
      type: 'education',
      grade: '10th Standard',
      students: 38,
      subject: 'Physics',
      description: 'Hands-on experiments with light and sound concepts',
      schoolDetails: {
        name: 'Mumbai Public School',
        address: 'Bandra West, Mumbai - 400050',
        principalName: 'Mr. Rajesh Patel',
        contactNumber: '+91 22 2640 5678',
        medium: 'English',
        board: 'CBSE'
      }
    },
    {
      id: '3',
      title: 'Career Guidance Session',
      start: new Date(2025, 5, 12, 9, 30),
      end: new Date(2025, 5, 12, 11, 30),
      location: 'Balmohan Vidyamandir, Dadar',
      type: 'career-guidance',
      grade: '12th Standard',
      students: 52,
      subject: 'Career Counselling',
      description: 'Guidance on engineering and medical entrance exams',
      schoolDetails: {
        name: 'Balmohan Vidyamandir',
        address: 'Dadar East, Mumbai - 400014',
        principalName: 'Dr. Meera Joshi',
        contactNumber: '+91 22 2414 9876',
        medium: 'Marathi & English',
        board: 'Maharashtra State Board'
      }
    },
    {
      id: '4',
      title: 'English Literature Session',
      start: new Date(2025, 5, 15, 11, 0),
      end: new Date(2025, 5, 15, 13, 0),
      location: 'Campion School, Cooperage',
      type: 'education',
      grade: '9th Standard',
      students: 42,
      subject: 'English Literature',
      description: 'Interactive discussion on Shakespeare\'s plays and poetry',
      schoolDetails: {
        name: 'Campion School',
        address: 'Cooperage, Mumbai - 400039',
        principalName: 'Fr. Anthony D\'Souza',
        contactNumber: '+91 22 2202 3456',
        medium: 'English',
        board: 'ICSE'
      }
    },
    {
      id: '5',
      title: 'Computer Programming Workshop',
      start: new Date(2025, 5, 18, 13, 30),
      end: new Date(2025, 5, 18, 15, 30),
      location: 'Sardar Dastur Hoshang Boys High School, Fort',
      type: 'technology',
      grade: '11th Standard',
      students: 35,
      subject: 'Computer Science',
      description: 'Introduction to Python programming and basic algorithms',
      schoolDetails: {
        name: 'Sardar Dastur Hoshang Boys High School',
        address: 'Fort, Mumbai - 400001',
        principalName: 'Mr. Cyrus Mistry',
        contactNumber: '+91 22 2267 8901',
        medium: 'English',
        board: 'ICSE'
      }
    },
    {
      id: '6',
      title: 'Environmental Science Activity',
      start: new Date(2025, 5, 20, 10, 30),
      end: new Date(2025, 5, 20, 12, 30),
      location: 'Rustomjee Cambridge International School, Dahisar',
      type: 'environment',
      grade: '7th Standard',
      students: 48,
      subject: 'Environmental Science',
      description: 'Sustainability project and waste management awareness',
      schoolDetails: {
        name: 'Rustomjee Cambridge International School',
        address: 'Dahisar West, Mumbai - 400068',
        principalName: 'Ms. Kavita Nair',
        contactNumber: '+91 22 2895 4321',
        medium: 'English',
        board: 'Cambridge International'
      }
    }
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setEvents(mockEvents);
      setLoading(false);
    }, 1000);
  }, [selectedDate, view]);

  const getEventTypeColor = (type) => {
    const colors = {
      'education': 'bg-blue-500',
      'career-guidance': 'bg-green-500',
      'technology': 'bg-purple-500',
      'environment': 'bg-emerald-500',
      'default': 'bg-orange-500'
    };
    return colors[type] || colors.default;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const navigateDate = (direction) => {
    const newDate = new Date(selectedDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + direction);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + (direction * 7));
    } else {
      newDate.setDate(newDate.getDate() + direction);
    }
    setSelectedDate(newDate);
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.schoolDetails.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || event.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-orange-100">
      {/* Header */}
      <Header />
      <div className="bg-white/90 backdrop-blur-md border-b border-orange-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{volunteer.name}</h1>
                <p className="text-orange-600">Volunteer Schedule</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{volunteer.totalHours}</div>
                <div className="text-sm text-gray-600">Total Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{volunteer.upcomingEvents}</div>
                <div className="text-sm text-gray-600">Upcoming Events</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 mb-8 border border-orange-200 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Date Navigation */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigateDate(-1)}
                className="p-2 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-600 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="text-xl font-semibold text-gray-800 min-w-[200px] text-center">
                {selectedDate.toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </div>
              <button 
                onClick={() => navigateDate(1)}
                className="p-2 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-600 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* View Selector */}
            <div className="flex bg-orange-50 rounded-xl p-1 border border-orange-200">
              {['month', 'week', 'day'].map((viewType) => (
                <button
                  key={viewType}
                  onClick={() => setView(viewType)}
                  className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                    view === viewType 
                      ? 'bg-orange-500 text-white shadow-md' 
                      : 'text-gray-600 hover:text-orange-600 hover:bg-orange-100'
                  }`}
                >
                  {viewType}
                </button>
              ))}
            </div>

            {/* Search and Filter */}
            <div className="flex space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white border border-orange-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 bg-white border border-orange-200 rounded-xl text-gray-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              >
                <option value="all">All Types</option>
                <option value="education">Education</option>
                <option value="career-guidance">Career Guidance</option>
                <option value="technology">Technology</option>
                <option value="environment">Environment</option>
              </select>
            </div>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            </div>
          ) : filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div 
                key={event.id}
                className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-orange-200 hover:border-orange-400 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-4 h-4 rounded-full ${getEventTypeColor(event.type)}`}></div>
                      <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                        {event.subject}
                      </span>
                    </div>

                    {/* School Information Card */}
                    <div className="bg-orange-50 rounded-xl p-4 mb-4 border-l-4 border-orange-500">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-800 text-lg flex items-center">
                            <Building2 className="w-5 h-5 text-orange-500 mr-2" />
                            {event.schoolDetails.name}
                          </h4>
                          <p className="text-gray-600 text-sm">{event.schoolDetails.address}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Board: <span className="font-medium">{event.schoolDetails.board}</span></div>
                          <div className="text-sm text-gray-600">Medium: <span className="font-medium">{event.schoolDetails.medium}</span></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <GraduationCap className="w-4 h-4 text-orange-500" />
                          <span className="font-medium">{event.grade}</span>
                          <span className="text-gray-400">•</span>
                          <span className="font-medium text-orange-600">{event.students} students</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Phone className="w-4 h-4 text-orange-500" />
                          <span className="text-sm">{event.schoolDetails.contactNumber}</span>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="font-medium">Principal:</span> {event.schoolDetails.principalName}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span>{formatDate(event.start)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span>{formatTime(event.start)} - {formatTime(event.end)}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{event.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <MapPin className="w-4 h-4 text-orange-500" />
                          <span className="font-medium">{event.location}</span>
                        </div>
                        <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          Duration: {((event.end - event.start) / (1000 * 60 * 60)).toFixed(1)}h
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Events Found</h3>
              <p className="text-gray-600">No events match your current filters.</p>
            </div>
          )}
        </div>

        {/* Add Event Button */}
      </div>
    </div>
  );
};

export default SchedulePage;