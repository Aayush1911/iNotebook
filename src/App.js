import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [alert, setalert] = useState(null);
  const showalert = (message, type) => {
    setalert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setalert(null);
    }, 2000);
  };
  return (
    <div>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showalert={showalert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login showalert={showalert} />} />
              <Route
                path="/signup"
                element={<Signup showalert={showalert} />}
              />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
