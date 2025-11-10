import { useState } from "react";
import MemorieGame from "./memorieGame/MemorieGame";
import NumberGame from "./numberGame/NumberGame";
import PuzzleGame from "./puzzleGame/PuzzleGame";

const Games = ({ setShowGame, gameState, setGameState }) => {
  return (
    <>
      Games
      {gameState === "number" ? (
        <NumberGame
          setShowGame={setShowGame}
          gameState={gameState}
          setGameState={setGameState}
        />
      ) : gameState === "puzzle" ? (
        <PuzzleGame
          setShowGame={setShowGame}
          gameState={gameState}
          setGameState={setGameState}
        />
      ) : gameState === "memorie" ? (
        <MemorieGame
          setShowGame={setShowGame}
          gameState={gameState}
          setGameState={setGameState}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Games;
