// import { useState, useEffect } from 'react';
// import LearningMaterialModal from './LearningMaterialModal';

// function VideoCard({ video, standard, subject, topic }) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [videoLanguage, setVideoLanguage] = useState('');

//   // Determine the language (This is a simplified example)
//   const getVideoLanguage = (video) => {
//     const title = video.snippet.title.toLowerCase();
//     const description = video.snippet.description.toLowerCase();

//     if (title.includes('marathi') || description.includes('marathi')) {
//       return 'Marathi';
//     } else if (title.includes('hindi') || description.includes('hindi')) {
//       return 'Hindi';
//     } else {
//       return 'English'; // Default to English if no language is found
//     }
//   };

//   // Use useEffect to set the language only once when the component mounts
//   useEffect(() => {
//     setVideoLanguage(getVideoLanguage(video));
//   }, [video]);

//     const handleOpenModal = () => {
//         setIsModalOpen(true);
//         console.log("Modal opened"); // Debugging
//     };

//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//         console.log("Modal closed"); // Debugging
//     };
//   return (
//     <div className="shadow rounded-md overflow-hidden">
//       <img
//         src={video.snippet.thumbnails.medium.url}
//         alt={video.snippet.title}
//         className="w-full h-48 object-cover"
//       />
//       <div className="p-4">
//         <h3 className="text-lg font-medium text-gray-900">{video.snippet.title}</h3>
//         <p className="text-sm text-gray-500">{video.snippet.channelTitle}</p>
//         {/* Language tag */}
//         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//           {videoLanguage} Video
//         </span>
//         <div className="mt-2 space-x-2">
//           <a
//             href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
//           >
//             Watch Video
//           </a>
//           <button
//             onClick={handleOpenModal}
//             className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//           >
//             Get Learning Material
//           </button>
//         </div>
//       </div>

//       {/* Learning Material Modal */}
//       <LearningMaterialModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         video={video}
//         standard={standard}
//         subject={subject}
//         topic={topic}
//       />
//     </div>
//   );
// }

// export default VideoCard;

// VideoCard.js
import { useState, useEffect } from 'react';
import { generateLearningMaterial } from '../utils/geminiAPI';
import { jsPDF } from 'jspdf';

function VideoCard({ video, standard, subject, topic }) {
  const [isLoading, setIsLoading] = useState(false);
  const [videoLanguage, setVideoLanguage] = useState('');

  // Determine the language (This is a simplified example)
  const getVideoLanguage = (video) => {
    const title = video.snippet.title.toLowerCase();
    const description = video.snippet.description.toLowerCase();

    if (title.includes('marathi') || description.includes('marathi')) {
      return 'Marathi';
    } else if (title.includes('hindi') || description.includes('hindi')) {
      return 'Hindi';
    } else {
      return 'English'; // Default to English if no language is found
    }
  };

  // Use useEffect to set the language only once when the component mounts
  useEffect(() => {
    setVideoLanguage(getVideoLanguage(video));
  }, [video]);
  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const videoTopic = topic || video.snippet.title;
      const learningMaterial = await generateLearningMaterial(videoTopic, standard, subject);

      // Create PDF document
      const pdf = new jsPDF();
      pdf.setFont('Arial', 'normal', 12);
      pdf.text(learningMaterial, 10, 10, { maxWidth: 190 }); // Added maxWidth for better formatting
      pdf.save(`learning_material_${topic}.pdf`);
    } catch (error) {
      console.error('Error generating learning material:', error);
      alert('Failed to generate learning material.  Check the console for errors.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="shadow rounded-md overflow-hidden">
      <img
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{video.snippet.title}</h3>
        <p className="text-sm text-gray-500">{video.snippet.channelTitle}</p>

        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {/* Replace with your language detection logic here if needed */}
          {videoLanguage}
        </span>

        <div className="mt-2 space-x-2">
          <a
            href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Watch Video
          </a>

          <button
            onClick={handleDownload}
            disabled={isLoading}
            className={`inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            {isLoading ? 'Generating PDF...' : 'Get Learning Material'}
          </button>
        </div>
      </div>

    </div>
  );
}

export default VideoCard;