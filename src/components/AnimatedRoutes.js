import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import StartPage from "../StartPage";
import GamePage from "../GamePage";
import EndScreen from "../EndScreen";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<StartPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/score" element={<EndScreen />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
