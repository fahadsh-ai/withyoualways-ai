const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Chat endpoint
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  // TODO: Replace with real AI response later
  const response = `I'm here with you. You said: "${userMessage}"`;

  res.json({ reply: response });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
