import { atom } from "recoil";

export const pokemonPointsState = atom({
  key: "pokemonPoints",
  default: 0,
});

export const usernameState = atom({
  key: "userName",
  default: [],
});

export const roundsPlayed = atom({
  key: "roundsComplete",
  default: [],
});
