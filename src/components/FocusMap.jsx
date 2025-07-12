'use client';

import React, { useState } from 'react';
import { AlertTriangle, Users, TrendingUp, MapPin, Info, GraduationCap } from 'lucide-react';

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
    <div className="w-full bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <MapPin className="text-blue-600" />
            Focus Map - School Performance Heatmap
          </h2>
          <button
            onClick={() => setShowLegend(!showLegend)}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Info size={20} />
          </button>
        </div>
        
        {/* Grade Filter */}
        <div className="flex gap-2 mb-4">
          <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
            <GraduationCap size={16} />
            Filter by Grade:
          </span>
          {grades.map(grade => (
            <button
              key={grade}
              onClick={() => setSelectedGrade(grade)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                selectedGrade === grade
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {grade === 'all' ? 'All Grades' : grade}
            </button>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
          <div className="bg-red-50 p-3 rounded-lg border border-red-200">
            <div className="text-red-600 text-xl font-bold">{stats.critical}</div>
            <div className="text-red-700 text-sm">Critical Need</div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
            <div className="text-orange-600 text-xl font-bold">{stats.moderate}</div>
            <div className="text-orange-700 text-sm">Moderate Need</div>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <div className="text-yellow-600 text-xl font-bold">{stats.low}</div>
            <div className="text-yellow-700 text-sm">Low Priority</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="text-green-600 text-xl font-bold">{stats.excellent}</div>
            <div className="text-green-700 text-sm">Performing Well</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="text-blue-600 text-xl font-bold">{stats.needingVolunteers}</div>
            <div className="text-blue-700 text-sm">Need Volunteers</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3">Legend & Criteria</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(urgencyConfig).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <div key={key} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded ${config.color}`}></div>
                  <Icon size={16} className={config.textColor} />
                  <div>
                    <div className="font-medium text-sm">{config.label}</div>
                    <div className="text-xs text-gray-600">
                      {key === 'critical' && 'Avg < 75% & Improvement < 40%'}
                      {key === 'moderate' && 'Avg < 75% & Improvement ≥ 40%'}
                      {key === 'low' && 'Avg ≥ 75% & Improvement < 40%'}
                      {key === 'excellent' && 'Avg ≥ 75% & Improvement ≥ 40%'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Heatmap Grid */}
      <div className="relative">
        <div className="grid gap-3" style={{
          gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(processedData.length))}, 1fr)`
        }}>
          {processedData.map((school, index) => {
            const config = urgencyConfig[school.urgency];
            const Icon = config.icon;
            const isSelected = selectedSchool?.id === school.id;
            
            return (
              <div
                key={school.id}
                className={`relative p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                  isSelected 
                    ? `${config.borderColor} ${config.bgLight} transform scale-105 shadow-lg` 
                    : `${config.color} hover:scale-102 hover:shadow-md border-transparent`
                }`}
                onClick={() => handleSchoolClick(school)}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon size={16} className={isSelected ? config.textColor : 'text-white'} />
                  <div className={`text-xs font-bold ${isSelected ? config.textColor : 'text-white'}`}>
                    {school.priority}
                  </div>
                </div>
                
                <div className={`font-semibold text-sm mb-1 ${isSelected ? config.textColor : 'text-white'}`}>
                  {school.school.replace('Vidyalaya', 'V.')}
                </div>
                
                <div className={`text-xs mb-2 ${isSelected ? config.textColor : 'text-white/90'}`}>
                  {school.grade}
                </div>
                
                <div className={`text-xs ${isSelected ? config.textColor : 'text-white/80'}`}>
                  <div>Avg: {school.avgPosttestMarks}%</div>
                  <div>Improvement: {school.improvementPercentage}%</div>
                  <div>Students: {school.totalStudents}</div>
                </div>

                {school.needsVolunteers && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                    !
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected School Details */}
      {selectedSchool && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
            <Info size={16} />
            {selectedSchool.school} - {selectedSchool.grade} Details
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-blue-600">Pre-test Average</div>
              <div className="font-bold text-blue-800">{selectedSchool.avgPretestMarks}%</div>
            </div>
            <div>
              <div className="text-sm text-blue-600">Post-test Average</div>
              <div className="font-bold text-blue-800">{selectedSchool.avgPosttestMarks}%</div>
            </div>
            <div>
              <div className="text-sm text-blue-600">Improvement</div>
              <div className="font-bold text-blue-800">
                +{selectedSchool.improvement} ({selectedSchool.improvementPercentage}%)
              </div>
            </div>
            <div>
              <div className="text-sm text-blue-600">Total Students</div>
              <div className="font-bold text-blue-800">{selectedSchool.totalStudents}</div>
            </div>
          </div>

          <div className="mt-3 p-3 bg-white rounded border">
            <div className="text-sm text-gray-600">Status</div>
            <div className="font-medium text-gray-800">{selectedSchool.description}</div>
            {selectedSchool.needsVolunteers && (
              <div className="text-sm text-red-600 mt-1 font-medium">
                🚨 This class needs volunteer support
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer Note */}
      <div className="mt-6 text-xs text-gray-500 text-center">
        Click on any school tile to view detailed information. Red indicators show urgent need for volunteer support.
      </div>
    </div>
  );
};

export default FocusMap;