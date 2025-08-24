import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
import { OpenAI } from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';

config();

const app = express();
const port = process.env.PORT || 10000;

// For ES Modules __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Routes
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a compassionate grief counselor. Your tone is warm, gentle, and comforting.',
        },
        {
          role: 'user',
          content: userMessage,
        },
      ],
      temperature: 0.7,
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Something went wrong with the AI response.' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
