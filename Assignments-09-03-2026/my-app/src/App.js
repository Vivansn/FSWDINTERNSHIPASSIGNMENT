import React, { useState } from "react";
import "./App.css";

function App() {
  const [mood, setMood] = useState("😊");

  return (
    <div className="container">
      <h1>Mood Tracker</h1>

      <div className="emoji">{mood}</div>

      <div className="buttons">
        <button onClick={() => setMood("😊")}>Happy</button>
        <button onClick={() => setMood("😢")}>Sad</button>
        <button onClick={() => setMood("😡")}>Angry</button>
        <button onClick={() => setMood("😎")}>Cool</button>
      </div>
    </div>
  );
}

export default App;