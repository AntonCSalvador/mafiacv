// src/narration-gen/apiService.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Google Generative AI with your API key
const apiKey = process.env.VITE_GEMINI_API_KEY || 'null'; // Ensure you have your API key available in environment variables
const genAI = new GoogleGenerativeAI(`AIzaSyD3hPMRAZVyrRE3bis7n5TWNxdSzw8OU_g`);

// Get the generative model from Google
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "I am playing a game. I need you to make stories about a group of people which I will provide and tell a story about the events of the past night which I will provide. Limit your responses to 50 words. I will provide a group of people, a group of people that were killed and a group of people that were saved. I will also provide a setting. You should generate the stories such that they pertain to this story and do not repeat." }],
    },
    {
      role: "model",
      parts: [{ text: "Okay got it. Let me know when I can come up with a story." }],
    },
  ],
});

// Function to generate content based on the user prompt
export const getStory = async (prompt: string) => {
  try {
    const result = await chat.sendMessage(prompt);  // Send the prompt to Google Generative AI
    return result.response.text();  // Return the generated content
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    throw error;
  }
};
