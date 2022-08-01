import React from "react";
import { Box } from "@chakra-ui/react";

export default function PokeCard({ pokemonImage }) {
  const formatNumber = (number) => {
    console.log(number);
    let id = number.toString();
    while (id.length < 3) id = "0" + id;
    return id;
  };

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      poke card
      {pokemonImage && (
        <img
          src={`http://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formatNumber(
            pokemonImage
          )}.png`}
          alt="Image"
        />
      )}
    </Box>
  );
}
