import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./GamePage.css";
import PokeCard from "./components/PokeCard/PokeCard";
import axios from "axios";
import { Flex, Button, Circle } from "@chakra-ui/react";
import { Tabs, TabList, Tab } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { userSelectedState } from "./atoms/UserSelection";
import { pokemonPointsState } from "./atoms/PokePoints";
import { useNavigate } from "react-router-dom";

function Game() {
  const navigate = useNavigate();

  const [tabsNumberOption, setTabsNumberOption] = useState(0);

  const [pokemonsInfo, setPokemonsInfo] = useState({});

  const [LeftWinner, setLeftWinner] = useState(false);
  const [RightWinner, setRightWinner] = useState(false);

  let poke1BaseXP = "";
  let poke2BaseXP = "";

  const poke1TypesList = [];
  const poke2TypesList = [];

  const doubleDamage = 2;
  const halfDamage = 0.5;
  const noDamage = 0;

  const scoreP1 = [];
  const scoreP2 = [];

  let pokemonsData = {};

  const pokemonsBattleFunction = async () => {
    scoreP1.length = 0;
    scoreP2.length = 0;
    poke1BaseXP = "";
    poke2BaseXP = "";

    // This is for getting the random different pokemons and set those values to the component
    let pokemonLeft = Math.floor(Math.random() * 151 + 1);
    let pokemonRight = "";
    do {
      pokemonRight = Math.floor(Math.random() * 151 + 1);
    } while (pokemonLeft === pokemonRight);

    let pokemonLeftTypesURL = "";
    let pokemonRightTypesURL = "";

    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonLeft}/`)
      .then((res) => {
        pokemonsData = { ...pokemonsData, left: res.data };
        pokemonLeftTypesURL = res.data.types;
        poke1BaseXP = res.data.base_experience;
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonRight}/`)
      .then((res) => {
        pokemonsData = { ...pokemonsData, right: res.data };
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

    setPokemonsInfo(pokemonsData);
    await gg(poke1TypesList, poke2TypesList);
  };

  async function gg(array1, array2) {
    // console.log("Dmg 1: ", array1);
    // console.log("Dmg 2: ", array2);
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
    if (score1 > score2) {
      setLeftWinner(true);
      setRightWinner(false);
    }
    if (score1 < score2) {
      setLeftWinner(false);
      setRightWinner(true);
    }

    if (score1 === score2) {
      if (poke1BaseXP > poke2BaseXP) {
        setLeftWinner(true);
        setRightWinner(false);
      } else if (poke1BaseXP < poke2BaseXP) {
        setLeftWinner(false);
        setRightWinner(true);
      }
    }
  };

  useEffect(() => {
    pokemonsBattleFunction();
  }, []);

  const nextPoke = () => {
    setUserSelected(false);
    if (tabsNumberOption < 2) {
      TabChange(tabsNumberOption);
      pokemonsBattleFunction();
    }
    if (tabsNumberOption === 2) {
      navigate("/score");
    }
  };

  function TabChange(index) {
    setTabsNumberOption(index + 1);
  }

  const [userSelected, setUserSelected] = useRecoilState(userSelectedState);

  function userMadeChoice() {
    setUserSelected(true);
  }

  const [userPoints, setUserPoints] = useRecoilState(pokemonPointsState);
  function winnerFunction() {
    setUserPoints(userPoints + 1);
  }

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
      className="containerGame"
    >
      <Flex
        direction="column"
        justifyContent="space-evenly"
        width="100%"
        mt={5}
        marginTop="3%"
      >
        <div className="containerGame__Info">
          <span>
            Choose the pokemon you think will win and press the next button.
          </span>

          <br />
          <span>The score will be displayed in the circle below</span>
        </div>
        <Flex
          justifyContent="center"
          alignItems="center"
          direction="row"
          margin="1%"
        >
          <Circle
            size="5em"
            bg="#C6F6D5"
            color="black"
            fontSize="1em"
            fontWeight="bold"
          >
            {userPoints}
          </Circle>
        </Flex>
      </Flex>

      <Flex
        direction="row"
        justifyContent="space-evenly"
        width="100%"
        mt={5}
        marginTop="2%"
      >
        <PokeCard
          data={pokemonsInfo.left}
          isWinner={LeftWinner}
          userMadeChoice={userMadeChoice}
          winnerFunction={winnerFunction}
        />
        <PokeCard
          data={pokemonsInfo.right}
          isWinner={RightWinner}
          userMadeChoice={userMadeChoice}
          winnerFunction={winnerFunction}
        />
      </Flex>
      <Flex
        justifyContent="flex-end"
        alignItems="center"
        direction="column"
        marginTop="5%"
      >
        <Button
          letterSpacing="2px"
          size="lg"
          width="20%"
          onClick={() => nextPoke()}
          bg="#c8645c"
          borderColor="#10dd30"
          borderRadius="30px"
          border="2px"
          _hover={{ bg: "#dc9975", color: "green" }}
        >
          Next
        </Button>
        <Tabs
          variant="soft-rounded"
          colorScheme="green"
          index={tabsNumberOption}
          marginTop="3%"
        >
          <TabList>
            <Tab>Round 1</Tab>
            <Tab id="2">Round 2</Tab>
            <Tab>Round 3</Tab>
          </TabList>
        </Tabs>
      </Flex>
    </motion.div>
  );
}

export default Game;
