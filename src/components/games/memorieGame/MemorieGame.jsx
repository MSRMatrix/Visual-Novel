import { useEffect, useState } from "react";
import "./memorieGame.css";
import { cardHandler, createDeck } from "./cardFunctions";

const MemorieGame = ({
  setShowGame,
  gameState,
  setGameState,
  setCurrentChapter,
  setCurrentScene,
  setStepIndex,
  setShowChoices,
  setFocusedIndex,

  setChatHistory,
  currentChapter,
currentScene,
stepIndex,
}) => {
  const [cards, setCards] = useState(() => createDeck());
  const [findCard, setFindCard] = useState(null);
  const [cooldown, setCooldown] = useState(false);
  const [triesleft, setTriesleft] = useState(15);
  const [gameEnd, setGameEnd] = useState(false);

  useEffect(() => {
    if (triesleft <= 0) {
      setGameEnd(true);
      setTimeout(() => {
        setCurrentChapter("chapterTwo");
        setCurrentScene("lost");
        setStepIndex(0);
        setShowChoices(false);
        setFocusedIndex(0);
        setGameState("");
        setShowGame(false);
      }, 1000);
      setChatHistory((prev) => [
        ...prev,
        {
          chapter: currentChapter,
          scene: currentScene,
          step: stepIndex,
          type: "game",
          mode: "memorie",
          status: true
        },
      ]);
    }
  }, [triesleft <= 0]);

  useEffect(() => {
    if (cards.every((card) => card.solved)) {
      setTimeout(() => {
        setCurrentChapter("chapterTwo");
        setCurrentScene("win");
        setStepIndex(0);
        setShowChoices(false);
        setFocusedIndex(0);
        setGameState("");
        setShowGame(false);

        setChatHistory((prev) => [
        ...prev,
        {
          chapter: currentChapter,
          scene: currentScene,
          step: stepIndex,
          type: "game",
          mode: "memorie",
          status: true
        },
      ]);
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
        {cards.map((card) => (
          <div
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
          </div>
        ))}
      </div>
    </>
  );
};

export default MemorieGame;
