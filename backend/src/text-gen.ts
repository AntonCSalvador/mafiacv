// src/narration-gen/apiService.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Generative AI with your API key
const apiKey = process.env.VITE_GEMINI_API_KEY || 'null'; // Ensure you have your API key available in environment variables
const genAI = new GoogleGenerativeAI(`AIzaSyD3hPMRAZVyrRE3bis7n5TWNxdSzw8OU_g`);

// Get the generative model from Google
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to generate content based on the user prompt
export const getStory = async (prompt: string) => {
  try {
    const result = await model.generateContent(prompt);  // Send the prompt to Google Generative AI
    return result.response.text();  // Return the generated content
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    throw error;
  }
};
