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
  <div className="island-number-game">
    <p className="island-title">Eine Zahl von 1 - 10</p>

    <p className="island-tries">
      Versuche übrig: {numberGameState.tries}
    </p>

    {numberGameState.numberArray.length > 0 && (
      <p className="island-history">
        Deine Eingabe{numberGameState.numberArray.length > 1 ? "n" : ""}:{" "}
        {numberGameState.numberArray.join(", ")}
      </p>
    )}

    <input
      type="number"
      className="island-input"
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
      className="island-button"
      onClick={() =>
        answerHandler(
          numberGameState,
          setNumberGameState,
          storyState,
          setStoryState,
          setUiState
        )
      }
      ref={(el) => (focusableRef.current[1] = el)}
    >
      Abschicken
    </button>
  </div>
</>
  );
};

export default NumberGame;
