const express = require("express");
const app = express();   // ✅ MUST come before using app

const taskRoutes = require("./routes/taskRoutes");

app.use(express.json());

// ✅ Now use routes
app.use("/tasks", taskRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});