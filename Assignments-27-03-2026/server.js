const express = require("express");
const app = express();

app.use(express.json());

const PORT = 3000;
let tasks = [
  { id: 1, title: "Learn Node", completed: false },
  { id: 2, title: "Build API", completed: false }
];

// Test route
app.get("/", (req, res) => {
  res.send("Task API Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});
app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex(t => t.id == req.params.id);

  if (index === -1) {
    return res.status(404).send("Task not found");
  }

  tasks.splice(index, 1);
  res.send("Task deleted");
});