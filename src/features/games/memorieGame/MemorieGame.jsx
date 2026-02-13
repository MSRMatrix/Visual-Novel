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
      <h2>Memory Game</h2>
      <h3>
        {cardState.triesleft > 0
          ? `Vesuche noch übrig: ${cardState.triesleft}`
          : "Du hast verloren!"}
      </h3>
      <div className="card-container">
        {cardState.cards.map((card, index) => (
          <button
            ref={(el) =>
              (focusableRef.current[uiState.gamePaused ? null : index] = el)
            }
            disabled={card.flipped || card.solved}
            style={{
              background: card.solved
                ? "green"
                : cardState.gameEnd && !card.solved
                ? "red"
                : "",
            }}
            onClick={() =>
              cardHandler(
                card.value,
                card.id,
                cardState,
                setCardState
              )
            }
            className="cards"
            key={card.id}
          >
            {card.flipped || card.solved || cardState.gameEnd ? card.name : "?"}
          </button>
        ))}
      </div>
    </>
  );
};

export default MemorieGame;
