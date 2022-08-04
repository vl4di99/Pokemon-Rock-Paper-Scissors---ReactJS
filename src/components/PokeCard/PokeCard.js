import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import "./PokeCard.css";
import { useRecoilValue } from "recoil";
import { userSelectedState } from "../../atoms/UserSelection";

export default function PokeCard({
  pokemonImage,
  isWinner,
  userMadeChoice,
  winnerFunction,
}) {
  const [selection, setSelection] = useState(false);

  const userHasChosen = useRecoilValue(userSelectedState);

  useEffect(() => {
    setSelection(false);
  }, [pokemonImage]);

  const handleSelection = () => {
    setSelection(true);
    userMadeChoice();
    if (selection !== isWinner) {
      winnerFunction();
    }
  };

  const formatNumber = (number) => {
    let id = number.toString();
    while (id.length < 3) id = "0" + id;
    return id;
  };

  return (
    <Box
      maxW="sm"
      borderRadius="lg"
      className={`card ${!userHasChosen && "hover-card"} ${
        selection ? (isWinner ? "winner" : "loser") : "img-border"
      }`}
      onClick={() => {
        if (!userHasChosen) handleSelection();
      }}
    >
      {pokemonImage && (
        <div className="pokeImg">
          <img
            src={`http://assets.pokemon.com/assets/cms2/img/pokedex/detail/${formatNumber(
              pokemonImage
            )}.png`}
            alt="Pokemon"
            width="215px"
            height="215px"
          />
        </div>
      )}
    </Box>
  );
}
