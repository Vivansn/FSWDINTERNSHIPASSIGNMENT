const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const PORT = 3000;

// 🔗 Connect to MongoDB
mongoose.connect("")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// =======================
// 📘 SCHEMAS
// =======================

// Author Schema
const authorSchema = new mongoose.Schema({
  name: String
});

// Book Schema
const bookSchema = new mongoose.Schema({
  title: String,
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author"
  }
});

const Author = mongoose.model("Author", authorSchema);
const Book = mongoose.model("Book", bookSchema);


// =======================
// 🏠 HOME
// =======================
app.get("/", (req, res) => {
  res.send("Bookstore API with MongoDB");
});


// =======================
// 📚 BOOK ROUTES
// =======================

// Get all books
app.get("/books", async (req, res) => {
  const books = await Book.find().populate("authorId");
  res.json(books);
});

// Add book
app.post("/books", async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
});

// Update book
app.put("/books/:id", async (req, res) => {
  const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete book
app.delete("/books/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.send("Book deleted");
});


// =======================
// ✍️ AUTHOR ROUTES
// =======================

// Get all authors
app.get("/authors", async (req, res) => {
  const authors = await Author.find();
  res.json(authors);
});

// Add author
app.post("/authors", async (req, res) => {
  const author = new Author(req.body);
  await author.save();
  res.status(201).json(author);
});


// =======================
// 🚀 SERVER
// =======================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});