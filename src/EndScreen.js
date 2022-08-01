import React from "react";
import { motion } from "framer-motion/dist/framer-motion";
import "./EndScreen.css";

function EndScreen() {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
    >
      This is Score Screen
    </motion.div>
  );
}

export default EndScreen;
