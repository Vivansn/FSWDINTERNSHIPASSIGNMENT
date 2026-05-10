const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

// Dummy user (for testing)
const user = {
  email: "john@example.com",
  password: "$2a$10$7aWkQ1fJvYHk8h9ZkPj7UuFz8G2lQ8p5YlQ2YFzP6QKf2s0xwY7G6" // hashed 123456
};

// 🔐 LOGIN ROUTE
app.post("/login", async (req, res) => {
  console.log("Login route hit");

  const { email, password } = req.body;

  if (email !== user.email) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ email }, "secretkey", { expiresIn: "1h" });

  res.json({ message: "Login successful", token });
});

// test route
app.get("/", (req, res) => {
  res.send("Backend running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

// protected route
app.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected data",
    user: req.user
  });
});