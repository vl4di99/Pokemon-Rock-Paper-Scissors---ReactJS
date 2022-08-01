import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./GamePage.css";
import PokeCard from "./components/PokeCard/PokeCard";
import axios from "axios";

function Game() {
  const [pokemonsInfo, setPokemonsInfo] = useState({});
  let pokemonLeft;
  let pokemonRight;
  const [poke1BaseXP, setPoke1BaseXP] = useState("");
  const [poke2BaseXP, setPoke2BaseXP] = useState("");
  let poke1TypesURL;
  let poke2TypesURL;
  const poke1TypesList = [];
  const poke2TypesList = [];

  const randomPokemons = () => {
    pokemonLeft = Math.floor(Math.random() * 151 + 1);
    do {
      pokemonRight = Math.floor(Math.random() * 151 + 1);
    } while (pokemonLeft === pokemonRight);
    setPokemonsInfo({
      pokemonLeft: pokemonLeft,
      pokemonRight: pokemonRight,
    });
  };

  const getPokemonsData = async () => {
    randomPokemons();
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonLeft}/`)
      .then((res) => {
        pokemonLeft = res.data;
        setPoke1BaseXP(pokemonLeft.base_experience);
        poke1TypesURL = pokemonLeft.types;
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonRight}/`)
      .then((res) => {
        pokemonRight = res.data;
        setPoke2BaseXP(pokemonRight.base_experience);
        poke2TypesURL = pokemonRight.types;
      })
      .catch((err) => {
        console.log(err);
      });

    await getPokeTypes();
  };

  const getPokeTypes = async () => {
    console.log("1: ", poke1TypesURL);
    console.log("2: ", poke2TypesURL);
    poke1TypesURL.map((element, index) => {
      axios.get(element?.type?.url).then((res) => {
        poke1TypesList.push(res.data);
      });
    });
    poke2TypesURL.map((element, index) => {
      axios.get(element?.type?.url).then((res) => {
        poke2TypesList.push(res.data);
      });
    });
    console.log(poke1TypesList);
    console.log(poke2TypesList);
    calculateScore();
  };

  const calculateScore = () => {
    for (let i = 0; i < poke1TypesList.length; i++) {
      for (let j = 0; j < poke2TypesList.length; j++) {
        poke1TypesList[i].damage_relations.double_damage_from.map(
          (element1) => {
            console.log(element1);
          }
        );
      }
    }
  };

  useEffect(() => {
    getPokemonsData();
  }, []);

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
