import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";

import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  return (
    <Router>
      <AnimatedRoutes />
      <Gamepage />
    </Router>
  );
}

export default App;
