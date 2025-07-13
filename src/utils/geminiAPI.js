import { GoogleGenerativeAI } from "@google/generative-ai";

// Lazy initialization to avoid errors when API key is not available
let genAI = null;

function initializeGenAI() {
  if (genAI) return genAI;
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('Gemini API key is not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY in your environment variables.');
  }

  genAI = new GoogleGenerativeAI(apiKey);
  return genAI;
}

export const generateLearningMaterial = async (topic, standard, subject) => {
    try {
        const genAIInstance = initializeGenAI();
        const model = genAIInstance.getGenerativeModel({ model: "gemini-2.5-flash-preview-05-20" });
        
        const prompt = `Generate learning material for 6th to 8th grade students in Marathi about ${topic} for the subject ${subject}. Include a brief explanation, some fill-in-the-blanks questions, and if possible, suggest some relevant images. Format the material for a printable PDF.`;
        console.log(" kar rha hu main")
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text)
        return text;
    } catch (error) {
        console.error('Error generating learning material:', error);
        if (error.message.includes('API key')) {
            return "AI service is currently unavailable. Please check if the API key is configured properly.";
        }
        return "Failed to generate learning material.";
    }
};