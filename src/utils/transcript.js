// // utils/transcript.js
// import { YoutubeTranscript } from 'youtube-transcript';

// export const getTranscript = async (videoUrl) => {
//   try {
//     const videoId = videoUrl.match(/v=([a-zA-Z0-9_-]+)/)[1]; // Extract video ID
//     const transcriptData = await YoutubeTranscript.fetchTranscript(videoId);

//     // Format the transcript into a single string
//     const transcriptText = transcriptData.map(item => item.text).join(' ');
//     return transcriptText;
//   } catch (error) {
//     console.error("Error fetching transcript:", error);
//     return "Transcript not available.";
//   }
// };