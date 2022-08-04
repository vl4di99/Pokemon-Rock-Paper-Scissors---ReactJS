import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./StartPage.css";

import PokeBallImage from "./images/pokeball.png";
import { Input } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { usernameState } from "./atoms/PokePoints";

function StartPage() {
  const [username, setUsername] = useRecoilState(usernameState);
  const handleChange = (event) => setUsername(event.target.value);

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
      className="container"
    >
      <div className="container__pokeball">
        <img
          src={PokeBallImage}
          alt="pokeBallImage"
          className="container__pokeball__image"
          width="400px"
          height="400px"
        />
        <div className="container__pokeball__info">
          Please enter your username and Start the game
        </div>
        <Input
          placeholder="User name"
          size="lg"
          value={username}
          onChange={handleChange}
        />
        <div className="container__pokeball__button">
          <Link to="/game">Start Game</Link>
        </div>
      </div>
    </motion.div>
  );
}

export default StartPage;
