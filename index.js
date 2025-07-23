const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

dotenv.config();
const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/chat', async (req, res) => {
  const message = req.body.message;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a gentle, understanding grief counselor helping someone who has lost a loved one. Listen well, speak kindly, and help them express themselves without offering false hope."
        },
        {
          role: "user",
          content: message
        }
      ],
    });

    res.json({ reply: chatCompletion.choices[0].message.content });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ reply: "I'm here, but something went wrong. Please try again later." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
