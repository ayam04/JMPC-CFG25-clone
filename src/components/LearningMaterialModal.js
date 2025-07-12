// // import { saveAs } from 'file-saver';

// // function TranscriptModal({ isOpen, onClose, transcript, selectedLanguage, onLanguageChange }) {

// //   const handleDownload = () => {
// //     if (transcript) {
// //       const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
// //       saveAs(blob, `transcript_${selectedLanguage}.txt`);
// //     }
// //   };
// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
// //       <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
// //         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
// //         <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
// //         <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
// //           <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
// //             <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
// //               Transcript
// //             </h3>
// //             <div className="mt-2">
// //               <label htmlFor="language" className="block text-sm font-medium text-gray-700">
// //                 Select Language:
// //               </label>
// //               <select
// //                 id="language"
// //                 name="language"
// //                 value={selectedLanguage}
// //                 onChange={onLanguageChange}
// //                 className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
// //               >
// //                 <option value="marathi">Marathi</option>
// //                 <option value="hindi">Hindi</option>
// //                 <option value="english">English</option>
// //               </select>
// //               <p className="text-sm text-gray-500">
// //                 Here is the transcript in {selectedLanguage}.
// //               </p>
// //               <div className="mt-2">
// //                 <textarea
// //                   readOnly
// //                   value={transcript}
// //                   className="shadow-sm focus:ring-orange-500 focus:border-orange-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
// //                   rows="5"
// //                 />
// //               </div>
// //             </div>
// //           </div>
// //           <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
// //             <button
// //               type="button"
// //               className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm"
// //               onClick={handleDownload}
// //             >
// //               Download Transcript
// //             </button>
// //             <button
// //               type="button"
// //               className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
// //               onClick={onClose}
// //             >
// //               Close
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default TranscriptModal;


// // import { useState, useEffect } from 'react';
// // import { saveAs } from 'file-saver';
// // import { generateLearningMaterial } from '../utils/geminiAPI'; // New function
// // import { jsPDF } from 'jspdf'; // PDF generation library

// // function TranscriptModal({ isOpen, onClose, video, standard, subject, topic }) { // Added video, standard, subject, topic props
// //   const [learningMaterial, setLearningMaterial] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);

// //   useEffect(() => {
// //     const generateMaterial = async () => {
// //       if (isOpen) {
// //         setIsLoading(true);
// //         try {
// //           // Get video topic (you might need to improve this)
// //           const videoTopic = topic || video.snippet.title;

// //           // Generate learning material using Gemini
// //           const material = await generateLearningMaterial(videoTopic, standard, subject);
// //           setLearningMaterial(material);
// //         } catch (error) {
// //           console.error('Error generating learning material:', error);
// //           alert('Failed to generate learning material.');
// //           setLearningMaterial("Error generating material.");
// //         } finally {
// //           setIsLoading(false);
// //         }
// //       } else {
// //         setLearningMaterial(''); // Clear material when modal closes
// //       }
// //     };

// //     generateMaterial();
// //   }, [isOpen, video, standard, subject, topic]);

// //   const handleDownload = () => {
// //     // Create PDF document
// //     const pdf = new jsPDF();

// //     // Add content to PDF (This is a simplified example)
// //     pdf.setFont('Arial', 'normal', 12);
// //     pdf.text(learningMaterial, 10, 10);

// //     // Save PDF
// //     pdf.save(`learning_material_${topic}.pdf`);
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
// //       <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
// //         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
// //         <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
// //         <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
// //           <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
// //             <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
// //               Learning Material
// //             </h3>
// //             <div className="mt-2">
// //               {isLoading ? (
// //                 <p>Generating learning material...</p>
// //               ) : (
// //                 <div className="mt-2">
// //                   <p className="text-sm text-gray-500">
// //                     Here is the learning material for {topic} (Standard {standard}, Subject {subject}):
// //                   </p>
// //                   <div className="mt-2">
// //                     <textarea
// //                       readOnly
// //                       value={learningMaterial}
// //                       className="shadow-sm focus:ring-orange-500 focus:border-orange-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
// //                       rows="10"
// //                     />
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //           <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
// //             <button
// //               type="button"
// //               className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm"
// //               onClick={handleDownload}
// //               disabled={isLoading}
// //             >
// //               Download Learning Material (PDF)
// //             </button>
// //             <button
// //               type="button"
// //               className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
// //               onClick={onClose}
// //               disabled={isLoading}
// //             >
// //               Close
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default TranscriptModal;

// import { useState, useEffect } from 'react';
// import { saveAs } from 'file-saver';
// import { generateLearningMaterial } from '../utils/geminiAPI'; // New function
// import { jsPDF } from 'jspdf'; // PDF generation library

// function LearningMaterialModal({ isOpen, onClose, video, standard, subject, topic }) { // Added video, standard, subject, topic props
//   const [learningMaterial, setLearningMaterial] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const generateMaterial = async () => {
//       console.log("trying to gen")
//       if (isOpen) {
//         setIsLoading(true);
//         try {
//           // Get video topic (you might need to improve this)
//           const videoTopic = topic || video.snippet.title;
//           console.log(videoTopic)

//           // Generate learning material using Gemini
//           const material = await generateLearningMaterial(videoTopic, standard, subject);
//           console.log("gen hogya")
//           setLearningMaterial(material);
//         } catch (error) {
//           console.error('Error generating learning material:', error);
//           alert('Failed to generate learning material.');
//           setLearningMaterial("Error generating material.");
//         } finally {
//           setIsLoading(false);
//         }
//       } else {
//         setLearningMaterial(''); // Clear material when modal closes
//       }
//     };

//     generateMaterial();
//   }, [isOpen, video, standard, subject, topic]);

//   const handleDownload = () => {
//     // Create PDF document
//     const pdf = new jsPDF();

//     // Add content to PDF (This is a simplified example)
//     pdf.setFont('Arial', 'normal', 12);
//     pdf.text(learningMaterial, 10, 10);

//     // Save PDF
//     pdf.save(`learning_material_${topic}.pdf`);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
//       <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
//         <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
//         <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//           <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//             <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
//               Learning Material
//             </h3>
//             <div className="mt-2">
//               {isLoading ? (
//                 <p>Generating learning material...</p>
//               ) : (
//                 <div className="mt-2">
//                   <p className="text-sm text-gray-500">
//                     Here is the learning material for {topic} (Standard {standard}, Subject {subject}):
//                   </p>
//                   <div className="mt-2">
//                     <textarea
//                       readOnly
//                       value={learningMaterial}
//                       className="shadow-sm focus:ring-orange-500 focus:border-orange-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
//                       rows="10"
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//             <button
//               type="button"
//               className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm"
//               onClick={handleDownload}
//               disabled={isLoading}
//             >
//               Download Learning Material (PDF)
//             </button>
//             <button
//               type="button"
//               className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
//               onClick={onClose}
//               disabled={isLoading}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LearningMaterialModal;


import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { generateLearningMaterial } from '../utils/geminiAPI';

function LearningMaterialModal({ isOpen, onClose, video, standard, subject, topic }) {
    const [learningMaterial, setLearningMaterial] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const generateMaterial = async () => {
            if (isOpen) {
                setIsLoading(true);
                setError(null); // Clear any previous errors
                try {
                    const videoTopic = topic || video.snippet.title;
                    const material = await generateLearningMaterial(videoTopic, standard, subject);
                    setLearningMaterial(material);
                } catch (err) {
                    console.error('Error generating learning material:', err);
                    setError('Failed to generate learning material. Please try again later.');
                    setLearningMaterial('');
                } finally {
                    setIsLoading(false);
                }
            } else {
                setLearningMaterial('');
                setError(null);
            }
        };

        generateMaterial();
    }, [isOpen, video, standard, subject, topic]);

    const handleDownload = () => {
        try {
            const pdf = new jsPDF();
            pdf.setFont('Arial', 'normal', 12);
            pdf.text(learningMaterial, 10, 10);
            pdf.save(`learning_material_${topic}.pdf`);
        } catch (pdfError) {
            console.error("Error generating PDF:", pdfError);
            alert("Error generating PDF. See console for details.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                            Learning Material
                        </h3>
                        <div className="mt-2">
                            {isLoading ? (
                                <p>Generating learning material...</p>
                            ) : error ? (
                                <p className="text-red-500">{error}</p>
                            ) : (
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Here is the learning material for {topic} (Standard {standard}, Subject {subject}):
                                    </p>
                                    <div className="mt-2">
                                        <textarea
                                            readOnly
                                            value={learningMaterial}
                                            className="shadow-sm focus:ring-orange-500 focus:border-orange-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                            rows="10"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={handleDownload}
                            disabled={isLoading || error}
                        >
                            Download Learning Material (PDF)
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LearningMaterialModal;