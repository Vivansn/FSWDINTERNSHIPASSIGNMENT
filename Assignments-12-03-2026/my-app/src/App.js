import React, { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validate = () => {
    setError("");
    setSuccess("");

    // Email validation
    if (!email.includes("@")) {
      setError("Invalid email format");
      return false;
    }

    // Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must include at least one uppercase letter");
      return false;
    }

    if (!/[0-9]/.test(password)) {
      setError("Password must include at least one number");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setSuccess("Signup successful ✅");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="container">
      <h1>🔐 Signup Form</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Signup</button>
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
}

export default App;