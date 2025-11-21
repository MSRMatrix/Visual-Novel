import MemorieGame from "./memorieGame/MemorieGame";
import NumberGame from "./numberGame/NumberGame";
import PuzzleGame from "./puzzleGame/PuzzleGame";

const Games = ({
  setFocusedIndex,
  focusableRef,
  gamePaused,
  currentStep,
  storyState,
  setStoryState,
}) => {
  return (
    <>
      Games
      {currentStep.mode === "number" ? (
        <NumberGame
          setFocusedIndex={setFocusedIndex}
          focusableRef={focusableRef}
          storyState={storyState}
          setStoryState={setStoryState}
        />
      ) : currentStep.mode === "puzzle" ? (
        <PuzzleGame />
      ) : currentStep.mode === "memorie" ? (
        <MemorieGame
          setFocusedIndex={setFocusedIndex}
          focusableRef={focusableRef}
          gamePaused={gamePaused}
          storyState={storyState}
          setStoryState={setStoryState}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Games;
