import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-05-20" });


// const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

export const generateLearningMaterial = async (topic, standard, subject) => {
    try {
        const prompt = `Generate learning material for 6th to 8th grade students in Marathi about ${topic} for the subject ${subject}. Include a brief explanation, some fill-in-the-blanks questions, and if possible, suggest some relevant images. Format the material for a printable PDF.`;
        console.log(" kar rha hu main")
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text)
        return text;
    } catch (error) {
        console.error('Error generating learning material:', error);
        return "Failed to generate learning material.";
    }
};