// // To run this code you need to install the following dependencies:
// // npm install @google/genai mime
// // npm install -D @types/node

// import {
//   GoogleGenAI,
// } from '@google/genai';

// async function main() {
//   const ai = new GoogleGenAI({
//     apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
//   });
//   const config = {
//     responseMimeType: 'text/plain',
//   };
//   const model = 'gemini-1.5-flash';
//   const contents = [
//     {
//       role: 'user',
//       parts: [
//         {
//           text: `INSERT_INPUT_HERE`,
//         },
//       ],
//     },
//   ];

//   const response = await ai.models.generateContentStream({
//     model,
//     config,
//     contents,
//   });
//   let fileIndex = 0;
//   for await (const chunk of response) {
//     console.log(chunk.text);
//   }
// }

// main();
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API,
});
const config = {
  responseMimeType: 'text/plain',
};
const model = 'gemini-1.5-flash';

export async function generateGeminiResponse(userInput) {
  const contents = [
    {
      role: 'user',
      parts: [{ text: userInput }],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let result = '';
  for await (const chunk of response) {
    result += chunk.text;
  }
  return result;
}
