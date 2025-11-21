import { useEffect, useRef, useState } from "react";

const NumberGame = ({
  stepIndex,
  setStepIndex,
  currentChapter,
  setChatHistory,
  currentScene,
  setCurrentChapter,
  setCurrentScene,
  setFocusedIndex,
  focusableRef
}) => {
  // Random Number Function
  const [number, setNumber] = useState(0);
  const [guess, setGuess] = useState(0);
  const [tries, setTries] = useState(3);
  const [numberArray, setNumberArray] = useState([])

  useEffect(() => {
    setNumber(Math.floor(Math.random() * 10));
  }, []);

  function answerHandler() {
    if (tries < 0) return;

    if (number !== Number(guess)) {
      setTries((prev) => prev - 1);
      setNumberArray(prev => [...prev, guess]);
      setGuess(0)
      return;
    }

    setChatHistory((prev) => [
      ...prev,
      {
        chapter: currentChapter,
        scene: currentScene,
        step: stepIndex,
        answer: Number(number),
        type: "game",
        mode: "number",
      },
    ]);

    setCurrentChapter("chapterOne");
    setCurrentScene(number !== Number(guess) ? "wrong_answer" : "right_answer");
    setStepIndex(0);
    setFocusedIndex(0);
  }

  useEffect(() => {
    if (tries < 0 && number !== Number(guess)) {

      setChatHistory((prev) => [
        ...prev,
        {
          chapter: currentChapter,
          scene: currentScene,
          step: stepIndex,
          answer: Number(guess),
          type: "game",
          mode: "number",
        },
      ]);

      setCurrentChapter("chapterOne");
      setCurrentScene(
        number !== Number(guess) ? "wrong_answer" : "right_answer"
      );
      setStepIndex(0);
      setFocusedIndex(0);
    }
  }, [tries < 0 && number !== Number(guess)]);

  return (
    <>
      <p>Eine Zahl von 1 - 10</p>
      <p>Versuche übrig: {tries}</p>
      {numberArray.length > 0 ? <p>Deine Eingabe{numberArray.length > 1 ? "n" : ""}: {numberArray.join(", ")}</p> : ""}
      <input
        type="number"
        defaultValue={guess}
        onChange={(e) => setGuess(e.target.value)}
        max={10}
        min={0}
        ref={(el) => (focusableRef.current[0] = el)}
      />
      <button
        onClick={() => answerHandler()}
        ref={(el) => (focusableRef.current[1] = el)}
      >
        Abschicken
      </button>
    </>
  );
};

export default NumberGame;
