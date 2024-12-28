// server.js
// Setup empty JS object to act as endpoint for all routes
let projectData = {};

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// GET route
app.get("/all", (req, res) => {
  try {
    res.send(projectData);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch data" });
  }
});

// POST route
app.post("/add", (req, res) => {
  try {
    projectData = {
      temperature: req.body.temperature,
      date: req.body.date,
      userResponse: req.body.userResponse,
    };
    res.send(projectData);
  } catch (error) {
    res.status(500).send({ error: "Failed to add data" });
  }
});

// Setup Server
const port = 8000;
app.listen(port, () => console.log(`Server running on localhost: ${port}`));
