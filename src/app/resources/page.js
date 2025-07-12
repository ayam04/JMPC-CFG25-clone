'use client'; // Make sure this is a client component

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SubjectSelector from '../../components/SubjectSelector';
import syllabusData from '../../utils/syllabusData'; // Import syllabus data
import Header from '@/components/navbar/header';

function ResourcesPage() {
  const [selectedStandard, setSelectedStandard] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const router = useRouter();

  const handleSelection = (standard, subject) => {
    setSelectedStandard(standard);
    setSelectedSubject(subject);
  };

  const handleTopicNavigation = (topic) => {
    if (selectedStandard && selectedSubject) {
      router.push(`/videos/${selectedStandard}/${selectedSubject}/${encodeURIComponent(topic)}`);
    } else {
      alert('Please select a standard and subject first.');
    }
  };

  // Get the topics based on the selected standard and subject
  const topics = selectedStandard && selectedSubject
    ? syllabusData[selectedStandard]?.[selectedSubject] || []
    : [];

  return (
    <div>
      <Header />
      <div className="bg-white min-h-screen py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">Resources</h1>
          <SubjectSelector onSelect={handleSelection} />
          {selectedStandard && selectedSubject && (
            <div className="mt-6">
              <p className="text-lg text-gray-700 mb-2">
                You have selected: Standard {selectedStandard}, Subject {selectedSubject}
              </p>

              {/* Displaying the topic list dynamically */}
              <div className="space-y-2">
                {topics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => handleTopicNavigation(topic)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResourcesPage;