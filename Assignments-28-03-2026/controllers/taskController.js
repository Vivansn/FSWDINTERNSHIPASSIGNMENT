let tasks = [
  { id: 1, title: "Learn Node", completed: false },
  { id: 2, title: "Build API", completed: false }
];

// GET all tasks
exports.getTasks = (req, res) => {
  res.json(tasks);
};

// POST create task
exports.createTask = (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

// PUT update task
exports.updateTask = (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);

  if (!task) {
    return res.status(404).send("Task not found");
  }

  task.title = req.body.title || task.title;
  task.completed = req.body.completed ?? task.completed;

  res.json(task);
};

// DELETE task
exports.deleteTask = (req, res) => {
  const index = tasks.findIndex(t => t.id == req.params.id);

  if (index === -1) {
    return res.status(404).send("Task not found");
  }

  tasks.splice(index, 1);
  res.send("Task deleted");
};