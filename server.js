const express = require('express');
const { GoogleGenAI } = require('@google/generative-ai');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: "Message is required" });

        const model = ai.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: "You are the advanced, highly intelligent STEM Girls Academy AI Mentor. You assist women in learning programming, DevOps, Cyber Security, Data Science, and UI/UX design. Always keep answers encouraging, technically accurate, highly structured, and business-focused. Respond in English."
        });

        const result = await model.generateContent(message);
        const responseText = result.response.text();
        
        res.json({ reply: responseText });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`SGA AI Core deployed on port ${PORT}`));