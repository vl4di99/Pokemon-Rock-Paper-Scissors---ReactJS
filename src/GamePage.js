import React, { useEffect, useState } from "react";
import { motion } from "framer-motion/dist/framer-motion";
import "./GamePage.css";

function Game() {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
    >
      This is game page
    </motion.div>
  );
}

export default Game;
