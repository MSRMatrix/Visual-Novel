import { useState } from "react";
import { useNumberMode } from "../../../game/modes/useMode";
import { answerHandler } from "../../../game/engine/functions";

const NumberGame = ({
  focusableRef,
  storyState,
  setStoryState,
  setUiState,
}) => {

  const [numberGameState, setNumberGameState] = useState({
    number: Math.floor(Math.random() * 10),
    guess: 0,
    tries: 3,
    numberArray: [],
  });
  
  // Number Effekt
  useNumberMode({numberGameState, setNumberGameState ,storyState, setStoryState, setUiState})
  // Number Effekt

  return (
    <>
      <p>Eine Zahl von 1 - 10</p>
      <p>Versuche übrig: {numberGameState.tries}</p>
      {numberGameState.numberArray.length > 0 ? (
        <p>
          Deine Eingabe{numberGameState.numberArray.length > 1 ? "n" : ""}:{" "}
          {numberGameState.numberArray.join(", ")}
        </p>
      ) : (
        ""
      )}
      <input
        type="number"
        defaultValue={numberGameState.guess}
        onChange={(e) =>
          setNumberGameState((prev) => ({
            ...prev,
            guess: parseFloat(e.target.value),
          }))
        }
        max={10}
        min={0}
        ref={(el) => (focusableRef.current[0] = el)}
      />
      <button
        onClick={() => answerHandler(numberGameState, setNumberGameState, storyState, setStoryState, setUiState)}
        ref={(el) => (focusableRef.current[1] = el)}
      >
        Abschicken
      </button>
    </>
  );
};

export default NumberGame;
