const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to WithYouAlways.ai 💜 — Your grief companion is listening.");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
