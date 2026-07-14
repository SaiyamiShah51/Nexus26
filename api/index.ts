import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API Routes
// Chat endpoint for Gemini
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    
    // Create a chat session with system instructions
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: `You are the FIFA World Cup 2026 Smart Stadium AI Assistant. You help fans, staff, volunteers, security, medical teams, and organizers.\nProvide short, direct, and helpful answers. You have access to stadium maps, schedules, and real-time data (mocked). If asked for directions, provide clear paths.\nRespond with enthusiasm for the World Cup.`,
        temperature: 0.7,
      },
    });

    const response = await chat.sendMessage({ message });
    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "An error occurred with the AI assistant." });
  }
});

export default app;
