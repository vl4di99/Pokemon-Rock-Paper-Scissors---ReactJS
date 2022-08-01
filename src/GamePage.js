import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./GamePage.css";
import PokeCard from "./components/PokeCard/PokeCard";
import axios from "axios";

function Game() {
  const [pokemonsInfo, setPokemonsInfo] = useState({});
  let pokemonLeft;
  let pokemonRight;

  const randomPokemons = () => {
    pokemonLeft = Math.floor(Math.random() * 151 + 1);
    do {
      pokemonRight = Math.floor(Math.random() * 151 + 1);
    } while (pokemonLeft === pokemonRight);
  };

  useEffect(() => {
    randomPokemons();
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonLeft}/`)
      .then((res) => {
        pokemonLeft = res.data;
        // console.log(pokemonLeft);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonRight}/`)
      .then((res) => {
        pokemonRight = res.data;
        // console.log(pokemonRight);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(pokemonLeft);
    setPokemonsInfo({
      pokemonLeft: pokemonLeft,
      pokemonRight: pokemonRight,
    });
  }, []);

  // console.log(pokemonsInfo);
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
    >
      This is game page
      <PokeCard pokemonImage={pokemonsInfo?.pokemonLeft} />
      <PokeCard pokemonImage={pokemonsInfo?.pokemonRight} />
    </motion.div>
  );
}

export default Game;
