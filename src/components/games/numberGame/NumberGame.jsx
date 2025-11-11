import { useState } from "react";
import { nextStep } from "../../functions/nextStep";

const NumberGame = ({
 setShowGame, gameState, setGameState
 ,stepIndex,
  setStepIndex,
  setShowChoices,
  currentChapter,
  setChatHistory,
  currentScene,
  setCurrentChapter,
  setCurrentScene, currentStep, setFocusedIndex
}) => {
  // Random Number Function
  const [guessedNumber, setGuessedNumber] = useState(0)
  
  
  return (
    <>
      <p>Eine Zahl von 1 - 10</p>
      <input type="number" defaultValue={guessedNumber} max={10} min={0}/>
      <button
        onClick={() =>
       {setShowGame(false);
        setGameState("");
        setChatHistory((prev) => [
            ...prev,
            {
              chapter: currentChapter,
              scene: currentScene,
              step: stepIndex,
              choice: currentStep.text,
            },
          ]);

          // Zum nächsten Step springen
          setCurrentChapter(currentStep.next.chapter);
          setCurrentScene(currentStep.next.scene);
          setStepIndex(0);
          setShowChoices(false);
          setFocusedIndex(0);



       }

        }
      >
        Abschicken
      </button>
    </>
  );
};

export default NumberGame;
