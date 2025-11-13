import { useEffect, useRef, useState } from "react";
import { nextStep } from "../../functions/nextStep";

const NumberGame = ({
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
  setFocusedIndex,
}) => {
  // Random Number Function
  const [number, setNumber] = useState(0);
  const numberRef = useRef(null);

  useEffect(() => {
    setNumber(Math.floor(Math.random() * 10));
  }, []);

  function answerHandler() {
    setShowGame(false);
    setGameState("");

    setChatHistory((prev) => [
      ...prev,
      {
        chapter: currentChapter,
        scene: currentScene,
        step: stepIndex,
        answer: Number(number),
        type: "game",
        mode: "number"
      },
    ]);

    setCurrentChapter("chapterOne");
    setCurrentScene(
      number !== Number(numberRef.current?.value)
        ? "wrong_answer"
        : "right_answer"
    );
    setStepIndex(0);
    setShowChoices(false);
    setFocusedIndex(0);
  }

  return (
    <>
      <p>Eine Zahl von 1 - 10</p>
      <input type="number" defaultValue={0} ref={numberRef} max={10} min={0} />
      <button onClick={() => answerHandler()}>Abschicken</button>
    </>
  );
};

export default NumberGame;
