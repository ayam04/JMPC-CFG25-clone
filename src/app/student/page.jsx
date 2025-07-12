"use client";
import React, { useState } from 'react';
import { generateGeminiResponse } from '../../../configs/AImodel'; // Adjust path as needed
import Header from '@/components/navbar/header';

const Page = () => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [geminiResponse, setGeminiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Dummy student data
  const studentsData = [
    {
      id: 1,
      name: "Arjun Sharma",
      class: "7th Grade",
      age: 13,
      assessments: {
        mathematics: {
          divisibility: 45,
          fractions: 78,
          geometry: 62,
          algebra: 38
        },
        science: {
          physics: 55,
          chemistry: 42,
          biology: 71,
          environmental: 68
        },
        english: {
          grammar: 82,
          vocabulary: 76,
          comprehension: 69,
          writing: 58
        },
        social_studies: {
          history: 64,
          geography: 57,
          civics: 73,
          economics: 41
        }
      },
      strengths: ["Biology", "Grammar", "Civics"],
      weaknesses: ["Algebra", "Chemistry", "Economics"],
      learning_style: "Visual learner"
    },
    {
      id: 2,
      name: "Priya Patel",
      class: "8th Grade",
      age: 14,
      assessments: {
        mathematics: {
          divisibility: 89,
          fractions: 92,
          geometry: 85,
          algebra: 78
        },
        science: {
          physics: 81,
          chemistry: 77,
          biology: 83,
          environmental: 79
        },
        english: {
          grammar: 74,
          vocabulary: 68,
          comprehension: 71,
          writing: 65
        },
        social_studies: {
          history: 76,
          geography: 82,
          civics: 69,
          economics: 73
        }
      },
      strengths: ["Mathematics", "Science", "Geography"],
      weaknesses: ["Vocabulary", "Writing", "Civics"],
      learning_style: "Analytical learner"
    },
    {
      id: 3,
      name: "Karan Singh",
      class: "6th Grade",
      age: 12,
      assessments: {
        mathematics: {
          divisibility: 34,
          fractions: 41,
          geometry: 52,
          algebra: 28
        },
        science: {
          physics: 38,
          chemistry: 33,
          biology: 59,
          environmental: 67
        },
        english: {
          grammar: 56,
          vocabulary: 63,
          comprehension: 48,
          writing: 44
        },
        social_studies: {
          history: 61,
          geography: 45,
          civics: 52,
          economics: 39
        }
      },
      strengths: ["Environmental Science", "Vocabulary", "History"],
      weaknesses: ["Algebra", "Chemistry", "Comprehension"],
      learning_style: "Kinesthetic learner"
    }
  ];

  const handleStudentSelect = (e) => {
    setSelectedStudent(e.target.value);
    setGeminiResponse(''); // Clear previous response
  };

  const formatStudentDataForGemini = (student) => {
    return `
Student Assessment Report:

Name: ${student.name}
Class: ${student.class}
Age: ${student.age}
Learning Style: ${student.learning_style}

Academic Performance Scores (out of 100):

MATHEMATICS:
- Divisibility: ${student.assessments.mathematics.divisibility}/100
- Fractions: ${student.assessments.mathematics.fractions}/100
- Geometry: ${student.assessments.mathematics.geometry}/100
- Algebra: ${student.assessments.mathematics.algebra}/100

SCIENCE:
- Physics: ${student.assessments.science.physics}/100
- Chemistry: ${student.assessments.science.chemistry}/100
- Biology: ${student.assessments.science.biology}/100
- Environmental Science: ${student.assessments.science.environmental}/100

ENGLISH:
- Grammar: ${student.assessments.english.grammar}/100
- Vocabulary: ${student.assessments.english.vocabulary}/100
- Reading Comprehension: ${student.assessments.english.comprehension}/100
- Writing: ${student.assessments.english.writing}/100

SOCIAL STUDIES:
- History: ${student.assessments.social_studies.history}/100
- Geography: ${student.assessments.social_studies.geography}/100
- Civics: ${student.assessments.social_studies.civics}/100
- Economics: ${student.assessments.social_studies.economics}/100

Identified Strengths: ${student.strengths.join(', ')}
Areas for Improvement: ${student.weaknesses.join(', ')}


Please provide:
1. Feedback on the student's academic performance in 100 words.
2. For each topic listed in "Areas for Improvement", provide a personalized learning roadmap. For each weak topic, list all subtopics to cover, suggest all the theory to cover in the topic .
3. Recommendations for parents/teachers to support the student's growth.

Do not write any additional text, just the response in markdown format.
Do not include any code blocks or HTML tags.
Do not write anything in bold or italics.
`;
  };

  const handleGetFeedback = async () => {
    if (!selectedStudent) {
      alert('Please select a student first');
      return;
    }

    const student = studentsData.find(s => s.id === parseInt(selectedStudent));
    const formattedData = formatStudentDataForGemini(student);

    setIsLoading(true);
    try {
      const response = await generateGeminiResponse(formattedData);
      setGeminiResponse(response);
    } catch (error) {
      console.error('Error getting Gemini response:', error);
      setGeminiResponse('Error: Unable to get AI feedback. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedStudentData = studentsData.find(s => s.id === parseInt(selectedStudent));

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    if (score >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Assessment Dashboard</h1>
          <p className="text-gray-600 mb-6">Select a student to view their academic performance and get AI-powered feedback</p>
          
          {/* Student Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Student:
            </label>
            <select
              value={selectedStudent}
              onChange={handleStudentSelect}
              className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Choose a student --</option>
              {studentsData.map(student => (
                <option key={student.id} value={student.id}>
                  {student.name} ({student.class})
                </option>
              ))}
            </select>
          </div>

          {/* Student Data Display */}
          {selectedStudentData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Student Information</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {selectedStudentData.name}</p>
                  <p><span className="font-medium">Class:</span> {selectedStudentData.class}</p>
                  <p><span className="font-medium">Age:</span> {selectedStudentData.age} years</p>
                  <p><span className="font-medium">Learning Style:</span> {selectedStudentData.learning_style}</p>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-medium text-green-600 mb-2">Strengths:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudentData.strengths.map((strength, index) => (
                      <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-medium text-red-600 mb-2">Areas for Improvement:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudentData.weaknesses.map((weakness, index) => (
                      <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                        {weakness}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Academic Performance</h2>
                
                {Object.entries(selectedStudentData.assessments).map(([subject, topics]) => (
                  <div key={subject} className="mb-4">
                    <h3 className="font-medium text-gray-700 mb-2 capitalize">
                      {subject.replace('_', ' ')}
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(topics).map(([topic, score]) => (
                        <div key={topic} className="flex justify-between items-center">
                          <span className="text-sm capitalize">{topic}:</span>
                          <span className={`px-2 py-1 rounded text-sm font-medium ${getScoreColor(score)}`}>
                            {score}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Get AI Feedback Button */}
          {selectedStudentData && (
            <div className="text-center mb-6">
              <button
                onClick={handleGetFeedback}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                {isLoading ? 'Getting AI Feedback...' : 'Get Personalized AI Feedback & Resources'}
              </button>
            </div>
          )}

          {/* AI Response Display */}
          {geminiResponse && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border-l-4 border-purple-500">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">🤖 AI-Generated Feedback & Resources</h2>
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap text-gray-700 font-sans leading-relaxed">
                  {geminiResponse}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Page;