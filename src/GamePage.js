import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./GamePage.css";
import PokeCard from "./components/PokeCard/PokeCard";
import axios from "axios";
import { Flex, Button, Badge, Circle } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

function Game() {
  const [pokemonsInfo, setPokemonsInfo] = useState({});
  const [poke1BaseXP, setPoke1BaseXP] = useState("");
  const [poke2BaseXP, setPoke2BaseXP] = useState("");

  let pokemonLeft;
  let pokemonRight;
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
      <Flex direction="row" justifyContent="space-evenly" width="100%">
        <PokeCard pokemonImage={pokemonsInfo?.pokemonLeft} />
        <PokeCard pokemonImage={pokemonsInfo?.pokemonRight} />
      </Flex>
      <Flex
        justifyContent="center"
        alignItems="center"
        direction="row"
        marginTop="4%"
      >
        <Button colorScheme="green" size="lg" width="17%">
          Next
        </Button>
      </Flex>
      <Flex
        justifyContent="center"
        alignItems="center"
        direction="row"
        marginTop="4%"
      >
        <Badge ml="3" fontSize="1.2em" colorScheme="green">
          player name
        </Badge>
      </Flex>
      <Flex
        justifyContent="center"
        alignItems="center"
        direction="row"
        marginTop="4%"
      >
        <Circle size="4em" bg="#C6F6D5" color="white"></Circle>
      </Flex>
      <Flex
        justifyContent="center"
        alignItems="center"
        direction="row"
        marginTop="4%"
      >
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab>Round 1</Tab>
            <Tab>Round 2</Tab>
            <Tab>Round 3</Tab>
          </TabList>
        </Tabs>
      </Flex>
      <Flex
        justifyContent="center"
        alignItems="center"
        direction="row"
        marginTop="4%"
      >
        <Button
          colorScheme="green"
          size="lg"
          width="17%"
          style={{ borderRadius: "10px!important" }}
        >
          Reset
        </Button>
      </Flex>
    </motion.div>
  );
}

export default Game;
