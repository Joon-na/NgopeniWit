import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

export const fetchAIResponse = async (input) => {
  try {
    const prompt = `You are an expert in plant cultivation. Please only respond to questions related to plant care, solutions for plant problems, care schedules, and plant recommendations. User question: ${input}`;
    
    const response = await axios.post(`${API_URL}?key=${API_KEY}`, {
      contents: [{ parts: [{ text: prompt }] }],
    });
    
    // Get the AI response
    let aiResponse = response.data.candidates[0].content.parts[0].text;

    // Sanitize the response to remove markdown
    aiResponse = aiResponse
      .replace(/[*_~`]/g, '') // Remove bold, italic, strikethrough, and inline code
      .replace(/\[(.*?)\]\((.*?)\)/g, '$1') // Remove links
      .replace(/!\[(.*?)\]\((.*?)\)/g, '') // Remove image links
      .replace(/^\s*>\s?/gm, '') // Remove blockquotes
      .trim(); // Trim whitespace

    return aiResponse;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw error;
  }
};