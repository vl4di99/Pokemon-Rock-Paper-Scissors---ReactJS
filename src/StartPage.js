import React from "react";
import { motion } from "framer-motion";
import "./StartPage.css";

import axios from "axios";
function StartPage() {
  

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
    >
      This is Start page
    </motion.div>
  );
}

export default StartPage;
