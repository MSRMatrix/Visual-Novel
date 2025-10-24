import { useState } from "react";
import MemorieGame from "./memorieGame/MemorieGame";
import NumberGame from "./numberGame/NumberGame";
import PuzzleGame from "./puzzleGame/PuzzleGame";

const Games = () => {
  const [gameState, setGameState] = useState("");
  return (
    <>
      Games
      {gameState === "number" ? (
        <NumberGame />
      ) : gameState === "puzzle" ? (
        <PuzzleGame />
      ) : gameState === "memorie" ? (
        <MemorieGame />
      ) : (
        ""
      )}
    </>
  );
};

export default Games;
