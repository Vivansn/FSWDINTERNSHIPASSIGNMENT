import React, { useState } from "react";
import "./App.css";

function App() {
  const productsData = [
    { id: 1, name: "iPhone", category: "Mobile", price: 800 },
    { id: 2, name: "Samsung TV", category: "Electronics", price: 600 },
    { id: 3, name: "Shoes", category: "Fashion", price: 100 },
    { id: 4, name: "Laptop", category: "Electronics", price: 1000 },
    { id: 5, name: "T-Shirt", category: "Fashion", price: 50 },
  ];

  const [products] = useState(productsData);
  const [filter, setFilter] = useState("All");

  const filteredProducts =
    filter === "All"
      ? products
      : products.filter((p) => p.category === filter);

  return (
    <div className="container">
      <h1>🛒 Product Listing</h1>

      {/* Filter Buttons */}
      <div className="filters">
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Electronics")}>
          Electronics
        </button>
        <button onClick={() => setFilter("Fashion")}>Fashion</button>
        <button onClick={() => setFilter("Mobile")}>Mobile</button>
      </div>

      {/* Product Cards */}
      <div className="grid">
        {filteredProducts.map((p) => (
          <div className="card" key={p.id}>
            <h3>{p.name}</h3>
            <p>Category: {p.category}</p>
            <p>₹{p.price}</p>
            <button>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;