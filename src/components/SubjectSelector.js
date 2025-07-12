import { useState } from 'react';
import syllabusData from '../utils/syllabusData';

function SubjectSelector({ onSelect }) {
  const [standard, setStandard] = useState('');
  const [subject, setSubject] = useState('');

  const handleStandardChange = (e) => {
    setStandard(e.target.value);
    setSubject(''); // Reset subject when standard changes
  };

  const handleSubjectClick = (subject) => {
    setSubject(subject);
    onSelect(standard, subject); // Pass the values to parent component
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      {/* Standard Selection */}
      <div>
        <label htmlFor="standard" className="block text-sm font-medium text-gray-700 mb-1">
          Select Standard:
        </label>
        <div className="relative">
          <select
            id="standard"
            name="standard"
            value={standard}
            onChange={handleStandardChange}
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md shadow-sm appearance-none"
          >
            <option value="">Select Standard</option>
            <option value="6th">6th</option>
            <option value="7th">7th</option>
            <option value="8th">8th</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>

      {/* Subject Selection */}
      {standard && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Subject:
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.keys(syllabusData[standard]).map((subjectOption) => (
              <button
                key={subjectOption}
                onClick={() => handleSubjectClick(subjectOption)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  subject === subjectOption
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-orange-500`}
              >
                {subjectOption}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SubjectSelector;