'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Users, TrendingUp, MapPin, Info, GraduationCap, X, Calendar } from 'lucide-react';

const FocusMap = ({ data }) => {
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [showLegend, setShowLegend] = useState(true);

  const processData = (data, gradeFilter = 'all') => {
    const schoolData = [];
    
    Object.keys(data).forEach((schoolName) => {
      const school = data[schoolName];
      const classes = Object.keys(school);
      
      classes.forEach((className) => {
        // Skip if grade filter is applied and doesn't match
        if (gradeFilter !== 'all' && className !== gradeFilter) {
          return;
        }
        
        const students = school[className];
        let totalPretestMarks = 0;
        let totalPosttestMarks = 0;
        let totalStudents = students.length;

        students.forEach((student) => {
          totalPretestMarks += student.pretestMarks;
          totalPosttestMarks += student.posttestMarks;
        });

        const avgPretestMarks = totalPretestMarks / totalStudents;
        const avgPosttestMarks = totalPosttestMarks / totalStudents;
        const improvement = avgPosttestMarks - avgPretestMarks;
        const improvementPercentage = (improvement / avgPretestMarks) * 100;

        // Determine urgency based on criteria
        let urgency, priority, description, needsVolunteers;
        
        if (avgPosttestMarks < 75 && improvementPercentage < 40) {
          urgency = 'critical';
          priority = 'High';
          description = 'Low performance & poor improvement';
          needsVolunteers = true;
        } else if (avgPosttestMarks < 75 && improvementPercentage >= 40) {
          urgency = 'moderate';
          priority = 'Medium';
          description = 'Low performance but good improvement';
          needsVolunteers = true;
        } else if (avgPosttestMarks >= 75 && improvementPercentage < 40) {
          urgency = 'low';
          priority = 'Low';
          description = 'Good performance, slow improvement';
          needsVolunteers = false;
        } else {
          urgency = 'excellent';
          priority = 'Monitor';
          description = 'Good performance & improvement';
          needsVolunteers = false;
        }

        schoolData.push({
          school: schoolName,
          grade: className,
          avgPretestMarks: parseFloat(avgPretestMarks.toFixed(1)),
          avgPosttestMarks: parseFloat(avgPosttestMarks.toFixed(1)),
          improvement: parseFloat(improvement.toFixed(1)),
          improvementPercentage: parseFloat(improvementPercentage.toFixed(1)),
          totalStudents,
          urgency,
          priority,
          description,
          needsVolunteers,
          id: `${schoolName}-${className}`.replace(/\s+/g, '-')
        });
      });
    });
    
    return schoolData;
  };

  const processedData = processData(data, selectedGrade);
  const grades = ['all', 'Class 6', 'Class 7', 'Class 8'];

  // Color mapping for urgency levels
  const urgencyConfig = {
    critical: {
      color: 'bg-red-500',
      borderColor: 'border-red-600',
      textColor: 'text-red-700',
      bgLight: 'bg-red-50',
      icon: AlertTriangle,
      label: 'Critical Need'
    },
    moderate: {
      color: 'bg-orange-400',
      borderColor: 'border-orange-500',
      textColor: 'text-orange-700',
      bgLight: 'bg-orange-50',
      icon: Users,
      label: 'Moderate Need'
    },
    low: {
      color: 'bg-yellow-400',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-700',
      bgLight: 'bg-yellow-50',
      icon: TrendingUp,
      label: 'Low Priority'
    },
    excellent: {
      color: 'bg-green-500',
      borderColor: 'border-green-600',
      textColor: 'text-green-700',
      bgLight: 'bg-green-50',
      icon: GraduationCap,
      label: 'Performing Well'
    }
  };

  const getGridPosition = (index, totalItems) => {
    const cols = Math.ceil(Math.sqrt(totalItems));
    const row = Math.floor(index / cols);
    const col = index % cols;
    return { row, col, cols };
  };

  const handleSchoolClick = (school) => {
    setSelectedSchool(selectedSchool?.id === school.id ? null : school);
  };

  // Statistics
  const stats = {
    critical: processedData.filter(s => s.urgency === 'critical').length,
    moderate: processedData.filter(s => s.urgency === 'moderate').length,
    low: processedData.filter(s => s.urgency === 'low').length,
    excellent: processedData.filter(s => s.urgency === 'excellent').length,
    needingVolunteers: processedData.filter(s => s.needsVolunteers).length
  };

  return (
    <div className="w-full bg-gradient-to-br from-white via-blue-50 to-indigo-50 rounded-2xl shadow-2xl p-8 border border-blue-100">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <motion.h2 
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <MapPin className="text-blue-600" />
            </motion.div>
            Focus Map - School Performance Heatmap
          </motion.h2>
          <motion.button
            onClick={() => setShowLegend(!showLegend)}
            className="p-3 bg-blue-100 hover:bg-blue-200 rounded-xl transition-colors shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Info size={20} className="text-blue-600" />
          </motion.button>
        </div>
        
        {/* Grade Filter */}
        <motion.div 
          className="flex flex-wrap gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-sm font-medium text-gray-700 flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
            <GraduationCap size={16} />
            Filter by Grade:
          </span>
          {grades.map(grade => (
            <motion.button
              key={grade}
              onClick={() => setSelectedGrade(grade)}
              className={`px-4 py-2 text-sm rounded-xl font-medium transition-all duration-300 ${
                selectedGrade === grade
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200 hover:border-blue-300'
              }`}
              whileHover={{ scale: selectedGrade === grade ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {grade === 'all' ? 'All Grades' : grade}
            </motion.button>
          ))}
        </motion.div>

        {/* Stats Summary */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { key: 'critical', label: 'Critical Need', color: 'red', value: stats.critical },
            { key: 'moderate', label: 'Moderate Need', color: 'orange', value: stats.moderate },
            { key: 'low', label: 'Low Priority', color: 'yellow', value: stats.low },
            { key: 'excellent', label: 'Performing Well', color: 'green', value: stats.excellent },
            { key: 'volunteers', label: 'Need Volunteers', color: 'blue', value: stats.needingVolunteers }
          ].map((stat, index) => (
            <motion.div 
              key={stat.key}
              className={`bg-${stat.color}-50 p-4 rounded-xl border border-${stat.color}-200 hover:shadow-lg transition-all duration-300`}
              whileHover={{ scale: 1.05, y: -2 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 * index, type: "spring", stiffness: 400 }}
            >
              <motion.div 
                className={`text-${stat.color}-600 text-2xl font-bold`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + 0.1 * index, type: "spring", stiffness: 400 }}
              >
                {stat.value}
              </motion.div>
              <div className={`text-${stat.color}-700 text-sm font-medium`}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Legend */}
      <AnimatePresence>
        {showLegend && (
          <motion.div 
            className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-bold text-gray-800 mb-4 text-lg">Legend & Performance Criteria</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(urgencyConfig).map(([key, config]) => {
                const Icon = config.icon;
                return (
                  <motion.div 
                    key={key} 
                    className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * Object.keys(urgencyConfig).indexOf(key) }}
                  >
                    <div className={`w-6 h-6 rounded-full ${config.color} flex items-center justify-center`}>
                      <Icon size={14} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-gray-800">{config.label}</div>
                      <div className="text-xs text-gray-600">
                        {key === 'critical' && 'Avg < 75% & Improvement < 40%'}
                        {key === 'moderate' && 'Avg < 75% & Improvement ≥ 40%'}
                        {key === 'low' && 'Avg ≥ 75% & Improvement < 40%'}
                        {key === 'excellent' && 'Avg ≥ 75% & Improvement ≥ 40%'}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heatmap Grid */}
      <div className="relative mb-8">
        <motion.div 
          className="grid gap-4" 
          style={{
            gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(processedData.length))}, 1fr)`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {processedData.map((school, index) => {
            const config = urgencyConfig[school.urgency];
            const Icon = config.icon;
            const isSelected = selectedSchool?.id === school.id;
            
            return (
              <motion.div
                key={school.id}
                className={`relative p-5 rounded-xl cursor-pointer transition-all duration-300 border-2 group overflow-hidden ${
                  isSelected 
                    ? `${config.borderColor} ${config.bgLight} shadow-2xl z-20` 
                    : `${config.color} hover:shadow-xl border-transparent hover:scale-105`
                }`}
                onClick={() => handleSchoolClick(school)}
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
                whileHover={{ scale: isSelected ? 1.02 : 1.05 }}
                whileTap={{ scale: 0.98 }}
                layout
              >
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Priority indicator pulse */}
                {school.needsVolunteers && (
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full border-3 border-white flex items-center justify-center z-10"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.span 
                      className="text-white text-xs font-bold"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                    >
                      !
                    </motion.span>
                  </motion.div>
                )}

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Icon size={20} className={isSelected ? config.textColor : 'text-white'} />
                    </motion.div>
                    <div className={`text-xs font-bold px-2 py-1 rounded-full ${
                      isSelected 
                        ? `${config.color} text-white` 
                        : 'bg-white/20 text-white'
                    }`}>
                      {school.priority}
                    </div>
                  </div>
                  
                  <div className={`font-bold text-sm mb-2 leading-tight ${isSelected ? config.textColor : 'text-white'}`}>
                    {school.school.replace('Vidyalaya', 'V.')}
                  </div>
                  
                  <div className={`text-xs mb-3 font-medium ${isSelected ? config.textColor : 'text-white/90'}`}>
                    {school.grade}
                  </div>
                  
                  <div className={`text-xs space-y-1 ${isSelected ? config.textColor : 'text-white/80'}`}>
                    <div className="flex justify-between">
                      <span>Average:</span>
                      <span className="font-semibold">{school.avgPosttestMarks}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Growth:</span>
                      <span className="font-semibold">+{school.improvementPercentage}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Students:</span>
                      <span className="font-semibold">{school.totalStudents}</span>
                    </div>
                  </div>

                  {/* Progress bar for improvement */}
                  <div className="mt-3 pt-3 border-t border-white/20">
                    <div className="text-xs mb-1 opacity-80">Improvement Progress</div>
                    <div className="w-full bg-white/20 rounded-full h-1.5">
                      <motion.div
                        className="h-1.5 bg-white rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(school.improvementPercentage, 100)}%` }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Selected School Details */}
      <AnimatePresence>
        {selectedSchool && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-gradient-to-r from-blue-50 via-white to-purple-50 rounded-2xl p-8 border-2 border-blue-200 shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <motion.h3 
                className="text-2xl font-bold text-blue-800 flex items-center gap-3"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Info size={24} className="text-blue-600" />
                </motion.div>
                {selectedSchool.school} - {selectedSchool.grade} Analytics
              </motion.h3>
              <motion.button
                onClick={() => setSelectedSchool(null)}
                className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-blue-600" />
              </motion.button>
            </div>
            
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, staggerChildren: 0.1 }}
            >
              {[
                { label: 'Pre-test Average', value: `${selectedSchool.avgPretestMarks}%`, color: 'text-orange-600', bg: 'bg-orange-50' },
                { label: 'Post-test Average', value: `${selectedSchool.avgPosttestMarks}%`, color: 'text-green-600', bg: 'bg-green-50' },
                { label: 'Improvement', value: `+${selectedSchool.improvement} (${selectedSchool.improvementPercentage}%)`, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Total Students', value: selectedSchool.totalStudents, color: 'text-purple-600', bg: 'bg-purple-50' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className={`${stat.bg} p-4 rounded-xl text-center`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-xs text-gray-600 mb-1">{stat.label}</div>
                  <div className={`font-bold text-lg ${stat.color}`}>{stat.value}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Performance Status</div>
                  <div className="font-semibold text-gray-800 text-lg">{selectedSchool.description}</div>
                </div>
                {selectedSchool.needsVolunteers && (
                  <motion.div 
                    className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    Urgent: Volunteer Support Needed
                  </motion.div>
                )}
              </div>
              
              {selectedSchool.needsVolunteers && (
                <motion.div 
                  className="flex gap-3 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.button
                    className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-pink-700 transition-all duration-300 flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Users className="w-4 h-4" />
                    Assign Volunteers
                  </motion.button>
                  <motion.button
                    className="bg-white text-gray-700 px-6 py-3 rounded-xl font-semibold border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule Visit
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Note */}
      <motion.div 
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-sm text-gray-500 bg-gray-50 rounded-lg px-4 py-2 inline-block">
          💡 Click on any school tile to view detailed performance analytics. Red indicators show schools requiring immediate volunteer support.
        </p>
      </motion.div>
    </div>
  );
};

export default FocusMap;