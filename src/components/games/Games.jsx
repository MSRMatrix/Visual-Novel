import MemorieGame from "./memorieGame/MemorieGame";
import NumberGame from "./numberGame/NumberGame";
import PuzzleGame from "./puzzleGame/PuzzleGame";

const Games = ({
  stepIndex,
  setStepIndex,
  currentChapter,
  setChatHistory,
  currentScene,
  setCurrentChapter,
  setCurrentScene,
  setFocusedIndex,focusableRef, gamePaused, currentStep
}) => {
  return (
    <>
      Games
      {currentStep.mode === "number" ? (
        <NumberGame
          stepIndex={stepIndex}
          setStepIndex={setStepIndex}
          currentChapter={currentChapter}
          setChatHistory={setChatHistory}
          currentScene={currentScene}
          setCurrentChapter={setCurrentChapter}
          setCurrentScene={setCurrentScene}
          setFocusedIndex={setFocusedIndex}
          focusableRef={focusableRef}
        />
      ) : currentStep.mode === "puzzle" ? (
        <PuzzleGame
        />
      ) : currentStep.mode === "memorie" ? (
        <MemorieGame
          setCurrentChapter={setCurrentChapter}
          setCurrentScene={setCurrentScene}
          setStepIndex={setStepIndex}
          setFocusedIndex={setFocusedIndex}
          setChatHistory={setChatHistory}
          currentChapter={currentChapter}
          currentScene={currentScene}
          stepIndex={stepIndex}
          focusableRef={focusableRef}
          gamePaused={gamePaused}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Games;
