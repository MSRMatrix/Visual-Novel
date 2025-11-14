import { useState } from "react";
import "./memorieGame.css";

const baseCards = [
  { value: "Eins", name: "Eins", flipped: false },
  { value: "Zwei", name: "Zwei", flipped: false },
  { value: "Drei", name: "Drei", flipped: false },
  { value: "Vier", name: "Vier", flipped: false },
  { value: "Fünf", name: "Fünf", flipped: false },
  { value: "Sechs", name: "Sechs", flipped: false },
];

function createDeck() {
  // Duplizieren + eindeutige IDs erzeugen
  const doubled = baseCards.flatMap((c) => [
    { ...c, id: c.value + "_1" },
    { ...c, id: c.value + "_2" },
  ]);

  // Mischen
  return doubled.sort(() => Math.random() - 0.5);
}

const MemorieGame = () => {
  const [cards, setCards] = useState(() => createDeck());
  const [findCard, setFindCard] = useState(null);
  const [cooldown, setCooldown] = useState(false);

  function cardHandler(value, id) {
    if (cooldown) return;

    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, flipped: true } : card))
    );

    if (!findCard) {
      setFindCard({ value, id });
    } else {
      if (findCard.id === id) return;
      if (findCard.value === value) {
        setFindCard(null);
        setCards((prev) => {
          const newCards = prev.map((card) =>
            card.id === id ? { ...card, flipped: true } : card
          );
          const allFlipped = newCards.every((card) => card.flipped);
          if (allFlipped){
            setTimeout(() => {
                // Kapitel Wechsel
             console.log("Gewonnen!");   
            }, 400);
            
          } 
          return newCards;
        });
      } else {
        setCooldown(true);
        const firstCardId = findCard.id;

        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) =>
              card.id === id || card.id === firstCardId
                ? { ...card, flipped: false }
                : card
            )
          );
          setFindCard(null);
          setCooldown(false);
        }, 800);
      }
    }
  }

  return (
    <>
      <h2>Memory Game</h2>

      <div className="card-container">
        {cards.map((card) => (
          <div
            onClick={() => cardHandler(card.value, card.id, card.flipped)}
            className="cards"
            key={card.id}
          >
            {card.flipped ? card.name : "?"}
          </div>
        ))}
      </div>
    </>
  );
};

export default MemorieGame;
