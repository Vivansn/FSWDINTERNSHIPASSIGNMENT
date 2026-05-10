const express = require("express");
const app = express();

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

// About route
app.get("/about", (req, res) => {
  res.send("This is About Page");
});

// Contact route
app.get("/contact", (req, res) => {
  res.send("Contact us at email@example.com");
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});