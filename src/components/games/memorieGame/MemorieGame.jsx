import { useEffect, useState } from "react";
import "./memorieGame.css";
import { cardHandler, createDeck } from "./cardFunctions";

const MemorieGame = ({
  setFocusedIndex,
  focusableRef,
  gamePaused,
  storyState,
  setStoryState,
}) => {
  const [cards, setCards] = useState(() => createDeck());
  const [findCard, setFindCard] = useState(null);
  const [cooldown, setCooldown] = useState(false);
  const [triesleft, setTriesleft] = useState(15);
  const [gameEnd, setGameEnd] = useState(false);
  const [escape, setEscape] = useState(false);

  useEffect(() => {
    if (triesleft <= 0) {
      setGameEnd(true);
      setTimeout(() => {
        setStoryState((prev) => ({
          ...prev,
          chapter: "chapterTwo",
          scene: "lost",
          step: 0,
        }));
        setFocusedIndex(0);
      }, 1000);
      const newEntry = {
        chapter: storyState.chapter,
        scene: storyState.scene,
        step: storyState.step,
        type: "game",
        mode: "memorie",
        status: true,
      };

      setStoryState((prev) => ({
        ...prev,
        history: [...prev.history, newEntry],
      }));
    }
  }, [triesleft <= 0]);

  useEffect(() => {
    if (cards.every((card) => card.solved)) {
      setTimeout(() => {
        const newEntry = {
          chapter: storyState.chapter,
          scene: storyState.scene,
          step: storyState.step,
          type: "game",
          mode: "memorie",
          status: true,
        };
        setStoryState((prev) => ({
          ...prev,
          chapter: "chapterTwo",
          scene: "win",
          step: 0,
          history: [...prev.history, newEntry],
        }));
        setFocusedIndex(0);
      }, 1000);
    }
  }, [gameEnd, cards.every((card) => card.solved)]);

  return (
    <>
      <h2>Memory Game</h2>
      <h3>
        {triesleft > 0
          ? `Vesuche noch übrig: ${triesleft}`
          : "Du hast verloren!"}
      </h3>
      <div className="card-container">
        {cards.map((card, index) => (
          <button
            ref={(el) => (focusableRef.current[gamePaused ? null : index] = el)}
            disabled={card.flipped || card.solved || escape}
            style={{
              background: card.solved
                ? "green"
                : gameEnd && !card.solved
                ? "red"
                : "",
            }}
            onClick={() =>
              cardHandler(
                card.value,
                card.id,
                cooldown,
                gameEnd,
                cards,
                triesleft,
                setGameEnd,
                setCards,
                findCard,
                setFindCard,
                setTriesleft,
                setCooldown
              )
            }
            className="cards"
            key={card.id}
          >
            {card.flipped || card.solved || gameEnd ? card.name : "?"}
          </button>
        ))}
      </div>
    </>
  );
};

export default MemorieGame;
