import { useState } from "react";
import "./memorieGame.css";
import { cardHandler, createDeck } from "../../../game/engine/functions";
import { useCardMode } from "../../../game/modes/useMode";


const MemorieGame = ({
  focusableRef,
  storyState,
  setStoryState,
  setUiState,
  uiState,
}) => {


  const [cardState, setCardState] = useState({
cards: createDeck(),
findCard: null,
cooldown: false,
triesleft: 15,
gameEnd: false,
  }) 

  // Steuert Sieg oder Niederlage
  useCardMode({cardState, storyState, setStoryState, setUiState, })
// Steuert Sieg oder Niederlage

  return (
  <>
  <div className="island-memory">
    <h2 className="memory-title">Memory Game</h2>

    <h3 className="memory-tries">
      {cardState.triesleft > 0
        ? `Versuche noch übrig: ${cardState.triesleft}`
        : "Du hast verloren!"}
    </h3>

    <div className="card-container">
      {cardState.cards.map((card, index) => (
        <button
          ref={(el) =>
            (focusableRef.current[uiState.gamePaused ? null : index] = el)
          }
          disabled={card.flipped || card.solved}
          onClick={() =>
            cardHandler(card.value, card.id, cardState, setCardState)
          }
          className={`
            island-card
            ${card.solved ? "card-solved" : ""}
            ${cardState.gameEnd && !card.solved ? "card-failed" : ""}
          `}
          key={card.id}
        >
          {card.flipped || card.solved || cardState.gameEnd
            ? card.name
            : "?"}
        </button>
      ))}
    </div>
  </div>
</>
  );
};

export default MemorieGame;
