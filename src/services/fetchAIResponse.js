import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

export const fetchAIResponse = async (input) => {
  try {
    const response = await axios.post(`${API_URL}?key=${API_KEY}`, {
      contents: [{ parts: [{ text: input }] }],
    });
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw error;
  }
};