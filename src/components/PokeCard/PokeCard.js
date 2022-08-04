import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import "./PokeCard.css";
import { useRecoilValue } from "recoil";
import { userSelectedState } from "../../atoms/UserSelection";
import { typeColors } from "../../resources/colors";

export default function PokeCard({
  data,
  isWinner,
  userMadeChoice,
  winnerFunction,
}) {
  const [selection, setSelection] = useState(false);
  const userHasChosen = useRecoilValue(userSelectedState);

  useEffect(() => {
    setSelection(false);
  }, [data]);

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

  const cardColor = typeColors[data?.types[0]?.type?.name];
  const hoverColor = typeColors.hover[data?.types[0]?.type?.name];

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
      bg={cardColor}
      _hover={{ backgroundColor: hoverColor }}
    >
      {data && (
        <div className="pokeImg">
          <img
            src={data.sprites.other["official-artwork"].front_default}
            alt="Pokemon"
            width="215px"
            height="215px"
          />
        </div>
      )}
    </Box>
  );
}
