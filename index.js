const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get('/', (req, res) => {
  res.send(`
    <html>
    <head><title>WithYouAlways.ai</title></head>
    <body style="font-family:sans-serif;max-width:600px;margin:auto;padding:2rem;">
      <h2>WithYouAlways.ai – Your Grief Companion</h2>
      <div id="chat" style="margin-bottom: 1rem;"></div>
      <input id="userInput" type="text" style="width:80%;" placeholder="Type your message..." />
      <button onclick="sendMessage()">Send</button>
      <script>
        async function sendMessage() {
          const input = document.getElementById('userInput');
          const message = input.value;
          input.value = '';
          const chat = document.getElementById('chat');
          chat.innerHTML += '<p><strong>You:</strong> ' + message + '</p>';

          const res = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
          });

          const data = await res.json();
          chat.innerHTML += '<p><strong>Grief Companion:</strong> ' + data.reply + '</p>';
        }
      </script>
    </body>
    </html>
  `);
});

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a warm, supportive grief companion. You gently talk to people who are mourning a loved one. Always be empathetic, gentle, and never robotic.'
        },
        { role: 'user', content: userMessage }
      ],
      model: 'gpt-4',
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating response');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
