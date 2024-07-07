const express = require("express");
// Importing the connection logic
const db = require("./config/connection");

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
// Built-in Express function that parses incoming requests to JSON
app.use(express.json());

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
