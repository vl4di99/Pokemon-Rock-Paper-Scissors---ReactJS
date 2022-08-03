import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./GamePage.css";
import PokeCard from "./components/PokeCard/PokeCard";
import axios from "axios";
import { Flex, Button, Badge, Circle } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

function Game() {
  const [pokemonsInfo, setPokemonsInfo] = useState({});

  const [scoreLeft, setScoreLeft] = useState("");
  const [scoreRight, setScoreRight] = useState("");
  const [winner, setWinner] = useState(null);

  let poke1BaseXP = "";
  let poke2BaseXP = "";

  const poke1TypesList = [];
  const poke2TypesList = [];

  const doubleDamage = 2;
  const halfDamage = 0.5;
  const noDamage = 0;

  const scoreP1 = [];
  const scoreP2 = [];

  const pokemonsBattleFunction = async () => {
    scoreP1.length = 0;
    scoreP2.length = 0;
    poke1BaseXP = "";
    poke2BaseXP = "";
    setWinner("");
    // This is for getting the random different pokemons and set those values to the component
    let pokemonLeft = Math.floor(Math.random() * 151 + 1);
    let pokemonRight = "";
    do {
      pokemonRight = Math.floor(Math.random() * 151 + 1);
    } while (pokemonLeft === pokemonRight);
    setPokemonsInfo({
      pokemonLeft: pokemonLeft,
      pokemonRight: pokemonRight,
    });

    let pokemonLeftTypesURL = "";
    let pokemonRightTypesURL = "";

    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonLeft}/`)
      .then((res) => {
        pokemonLeftTypesURL = res.data.types;
        poke1BaseXP = res.data.base_experience;
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonRight}/`)
      .then((res) => {
        pokemonRightTypesURL = res.data.types;
        poke2BaseXP = res.data.base_experience;
      })
      .catch((err) => {
        console.log(err);
      });

    await Promise.all(
      await pokemonLeftTypesURL.map(async (element) => {
        await axios.get(element?.type?.url).then((res) => {
          poke1TypesList.push(res.data); // This approach is not working correctly
        });
      })
    );

    await Promise.all(
      await pokemonRightTypesURL.map(async (element) => {
        await axios.get(element?.type?.url).then((res) => {
          poke2TypesList.push(res.data); // This approach is not working correctly
        });
      })
    );

    await gg(poke1TypesList, poke2TypesList);
  };

  async function gg(array1, array2) {
    console.log("Dmg 1: ", array1);
    console.log("Dmg 2: ", array2);
    for (let i = 0; i < array1.length; i++) {
      let ddfrom1 = array1[i].damage_relations.double_damage_from;
      let ddto1 = array1[i].damage_relations.double_damage_to;
      let hdfrom1 = array1[i].damage_relations.half_damage_from;
      let hdto1 = array1[i].damage_relations.half_damage_to;
      let ndfrom1 = array1[i].damage_relations.no_damage_from;
      let ndto1 = array1[i].damage_relations.no_damage_to;
      for (let j = 0; j < array2.length; j++) {
        let ddfrom2 = array2[j].damage_relations.double_damage_from;
        let ddto2 = array2[j].damage_relations.double_damage_to;
        let hdfrom2 = array2[j].damage_relations.half_damage_from;
        let hdto2 = array2[j].damage_relations.half_damage_to;
        let ndfrom2 = array2[j].damage_relations.no_damage_from;
        let ndto2 = array2[j].damage_relations.no_damage_to;
        scoreCalculatorForP1(ddfrom1, ddto2, doubleDamage);
        scoreCalculatorForP1(hdfrom1, hdto2, halfDamage);
        scoreCalculatorForP1(ndfrom1, ndto2, noDamage);
        scoreCalculatorForP2(ddto1, ddfrom2, doubleDamage);
        scoreCalculatorForP2(hdto1, hdfrom2, halfDamage);
        scoreCalculatorForP2(ndto1, ndfrom2, noDamage);
      }
    }
    // await setScoreLeft(scoreP1.reduce((a, b) => a + b, 0));
    //await setScoreRight(scoreP2.reduce((a, b) => a + b, 0));
    await winnerCalculator(
      scoreP1.reduce((a, b) => a + b, 0),
      scoreP2.reduce((a, b) => a + b, 0)
    );
    //await Promise.all(scoreLeft, scoreRight);
  }

  const scoreCalculatorForP1 = (pokemon1, pokemon2, dmg) => {
    pokemon1.map((p1) => {
      pokemon2.map((p2) => {
        if (p1.name === p2.name) {
          scoreP1.push(dmg);
        }
      });
    });
  };

  const scoreCalculatorForP2 = (pokemon1, pokemon2, dmg) => {
    pokemon1.map((p1) => {
      pokemon2.map((p2) => {
        if (p1.name === p2.name) {
          scoreP2.push(dmg);
        }
      });
    });
  };

  const winnerCalculator = (score1, score2) => {
    setScoreLeft(score1);
    setScoreRight(score2);
    if (score1 > score2) {
      setWinner("Left Pokemon Wins");
    }
    if (score1 < score2) {
      setWinner("Right Pokemon Wins");
    }

    if (score1 === score2) {
      if (poke1BaseXP > poke2BaseXP) {
        setWinner("Draw. Winner is calculated by BaseXP => Left Wins");
      } else if (poke1BaseXP < poke2BaseXP) {
        setWinner("Draw. Winner is calculated by BaseXP => Right Wins");
      }
    }
  };

  useEffect(() => {
    pokemonsBattleFunction();
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
