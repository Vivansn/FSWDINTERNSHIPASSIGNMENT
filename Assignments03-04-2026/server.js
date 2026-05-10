const Task = require("./models/Task");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const PORT = 3000;

// 🔗 Connect MongoDB (use your Atlas link)
mongoose.connect("mongodb+srv://@vcluster.iq3w6bj.mongodb.net/?appName=vcluster")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("CRUD Lab Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.post("/tasks", async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title
    });

    const savedTask = await task.save();

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});