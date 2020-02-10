import React from "react";
import GameTemplate from "../GameTemplate";
import { GameContextProvider } from "../../contexts/GameContext";

export default function MainPage() {
  return (
    <GameContextProvider>
      <GameTemplate />
    </GameContextProvider>
  );
}
