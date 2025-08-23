const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // make sure this is added in Render
});
const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a comforting and empathetic grief support companion.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.get("/", (req, res) => {
  res.send("WithYouAlways.ai – Your grief companion is listening");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
