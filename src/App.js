import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Gamepage from "./GamePage";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
