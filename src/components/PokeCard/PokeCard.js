import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import "./PokeCard.css";
import placeholder from "../../images/initial-img.png";

export default function PokeCard({ pokemonImage }) {
  // const [showImg, setShowImg] = useState(false);
  const formatNumber = (number) => {
    let id = number.toString();
    while (id.length < 3) id = "0" + id;
    return id;
  };

  const final = "win";
  return (
    <Box
      maxW="sm"
      borderWidth="3px"
      borderRadius="lg"
      className={`card ${final === "win" ? "winner" : "loser"}`}
    >
      {pokemonImage && (
        <div className="pokeImg">
          <img
            src={
              // showImg ?
              `http://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formatNumber(
                pokemonImage
              )}.png`
              // : placeholder
            }
            alt="Image"
            // onClick={() => setShowImg(true)}
            width="215px"
            height="215px"
          />
        </div>
      )}
    </Box>
  );
}
