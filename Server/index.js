const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
require("dotenv").config();
app.use(cors());
app.use(express.urlencoded());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Welcome to my proxy backend service!");
});

app.get("/tractorJunction", async (req, res) => {
  try {
    const response = await fetch(req.query.url);
    const html = await response.text();
    res.send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving content from Google");
  }
});

server.listen(3001, () => {
  console.log("Server is running");
});
