import React from "react";
import { motion } from "framer-motion";
import "./EndScreen.css";
import { useRecoilState } from "recoil";
import { pokemonPointsState, usernameState } from "./atoms/PokePoints";
import {
  Button,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  Tag,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function EndScreen() {
  const [userScore, setUserScore] = useRecoilState(pokemonPointsState);
  const [username, setUsername] = useRecoilState(usernameState);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
      className="containerEnd"
    >
      <Flex direction="row" justifyContent="center" marginTop="15%">
        <Tag fontSize="4em" textAlign="center" bg="rgba(255,255,255,0)">
          Player: {username}
        </Tag>
      </Flex>
      <Flex direction="column" alignItems="center" justifyContent="center">
        <Stat size="lg">
          <StatLabel fontSize="4em">Score:</StatLabel>
        </Stat>
      </Flex>

      <Flex direction="column" alignItems="center" justifyContent="center">
        <Stat size="lg">
          <StatNumber fontSize="3em">{userScore}</StatNumber>
        </Stat>
      </Flex>
      <Flex
        justifyContent="center"
        alignItems="center"
        direction="row"
        margin="2%"
      >
        <Button
          colorScheme="green"
          size="lg"
          width="30%"
          bg="#c8645c"
          borderColor="#10dd30"
          borderRadius="30px"
          border="2px"
          _hover={{ bg: "#dc9975", color: "green" }}
          onClick={() => {
            navigate("/");
            setUsername("");
            setUserScore(0);
          }}
        >
          Reset
        </Button>
      </Flex>
    </motion.div>
  );
}

export default EndScreen;
