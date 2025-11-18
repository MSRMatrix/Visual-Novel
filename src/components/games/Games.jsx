import MemorieGame from "./memorieGame/MemorieGame";
import NumberGame from "./numberGame/NumberGame";
import PuzzleGame from "./puzzleGame/PuzzleGame";

const Games = ({
  setShowGame,
  gameState,
  setGameState,
  stepIndex,
  setStepIndex,
  setShowChoices,
  currentChapter,
  setChatHistory,
  currentScene,
  setCurrentChapter,
  setCurrentScene,
  currentStep,
  setFocusedIndex,focusableRef
}) => {
  return (
    <>
      Games
      {gameState === "number" ? (
        <NumberGame
          setShowGame={setShowGame}
          gameState={gameState}
          setGameState={setGameState}
          stepIndex={stepIndex}
          setStepIndex={setStepIndex}
          setShowChoices={setShowChoices}
          currentChapter={currentChapter}
          setChatHistory={setChatHistory}
          currentScene={currentScene}
          setCurrentChapter={setCurrentChapter}
          setCurrentScene={setCurrentScene}
          currentStep={currentStep}
          setFocusedIndex={setFocusedIndex}
          focusableRef={focusableRef}
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
          setCurrentChapter={setCurrentChapter}
          setCurrentScene={setCurrentScene}
          setStepIndex={setStepIndex}
          setShowChoices={setShowChoices}
          setFocusedIndex={setFocusedIndex}
          setChatHistory={setChatHistory}
          currentChapter={currentChapter}
          currentScene={currentScene}
          stepIndex={stepIndex}
          focusableRef={focusableRef}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Games;
