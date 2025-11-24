import MemorieGame from "./memorieGame/MemorieGame";
import NumberGame from "./numberGame/NumberGame";
import PuzzleGame from "./puzzleGame/PuzzleGame";

const Games = ({
  focusableRef,
  currentStep,
  storyState,
  setStoryState, setUiState,
  uiState
}) => {
  return (
    <>
      Games
      {currentStep.mode === "number" ? (
        <NumberGame
          focusableRef={focusableRef}
          storyState={storyState}
          setStoryState={setStoryState}
              setUiState={setUiState}
        />
      ) : currentStep.mode === "puzzle" ? (
        <PuzzleGame />
      ) : currentStep.mode === "memorie" ? (
        <MemorieGame
          focusableRef={focusableRef}
          storyState={storyState}
          setStoryState={setStoryState}
              setUiState={setUiState}
              uiState={uiState}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Games;
