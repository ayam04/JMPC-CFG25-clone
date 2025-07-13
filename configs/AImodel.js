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

// Lazy initialization to avoid errors when API key is not available
let ai = null;
let initializationError = null;

const config = {
  responseMimeType: 'text/plain',
};
const model = 'gemini-1.5-flash';

function initializeAI() {
  if (ai) return ai;
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API;
  
  if (!apiKey) {
    initializationError = 'Gemini API key is not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY in your environment variables.';
    throw new Error(initializationError);
  }

  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
    });
    return ai;
  } catch (error) {
    initializationError = `Failed to initialize Gemini AI: ${error.message}`;
    throw new Error(initializationError);
  }
}

export async function generateGeminiResponse(userInput) {
  try {
    const aiInstance = initializeAI();
    
    const contents = [
      {
        role: 'user',
        parts: [{ text: userInput }],
      },
    ];

    const response = await aiInstance.models.generateContentStream({
      model,
      config,
      contents,
    });

    let result = '';
    for await (const chunk of response) {
      result += chunk.text;
    }
    return result;
  } catch (error) {
    console.error('Gemini API Error:', error.message);
    throw new Error(`AI service unavailable: ${error.message}`);
  }
}

export function isAIAvailable() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API;
    return !!apiKey;
  } catch {
    return false;
  }
}
