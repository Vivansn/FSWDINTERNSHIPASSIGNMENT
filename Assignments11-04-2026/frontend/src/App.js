import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Login successful");
        console.log("Token:", data.token);

        // store token (important)
        localStorage.setItem("token", data.token);
      } else {
        setMessage(data.message);
      }

    } catch (error) {
      console.log(error);
      setMessage("Error connecting to server");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>

      <p>{message}</p>
    </div>
  );
}

export default App;
const getProfile = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch("http://localhost:5000/profile", {
      headers: {
        Authorization: token
      }
    });

    const data = await res.json();
    console.log(data);
    setMessage(data.message);
  } catch (err) {
    console.log(err);
  }
};