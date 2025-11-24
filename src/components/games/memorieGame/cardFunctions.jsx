const baseCards = [
  { value: "Eins", name: "Eins", flipped: false, solved: false },
  { value: "Zwei", name: "Zwei", flipped: false, solved: false },
  { value: "Drei", name: "Drei", flipped: false, solved: false },
  { value: "Vier", name: "Vier", flipped: false, solved: false },
  { value: "Fünf", name: "Fünf", flipped: false, solved: false },
  { value: "Sechs", name: "Sechs", flipped: false, solved: false },
];

export function createDeck() {
  // Duplizieren + eindeutige IDs erzeugen
  const doubled = baseCards.flatMap((c) => [
    { ...c, id: c.value + "_1" },
    { ...c, id: c.value + "_2" },
  ]);

  // Mischen
  return doubled.sort(() => Math.random() - 0.5);
}

export function cardHandler(
  value,
  id,
  cardState,
  setCardState
) {
  if (
    cardState.cooldown ||
    cardState.gameEnd ||
    cardState.cards.find((item) => item.value === value).solved
  )
    return;

  if (cardState.triesleft <= 0 && !cardState.cardState.cards.every((card) => card.flipped)) {
    setCardState(prev => ({...prev, gameEnd: true}))
    console.log("Verloren!");
    return;
  }

  setCardState((prev) => ({
    ...prev,
    cards: prev.cards.map((card) =>
      card.id === id ? { ...card, flipped: true } : card
    ),
  }));

  // Erste Karte?
  if (!cardState.findCard) {
    setCardState((prev) => ({ ...prev, findCard: { value, id } }));
    return;
  }

  // Derselbe Klick?
  if (cardState.findCard.id === id) return;

  // MATCH
  if (cardState.findCard.value === value) {
    setCardState((prev) => ({ ...prev, findCard: null }));

    setCardState((prev) => {
      const newCards = prev.cards.map((card) =>
        card.value === value ? { ...card, flipped: true, solved: true } : card
      );

      // Prüfen, ob alle Karten gelöst sind
      if (newCards.every((card) => card.solved)) {
        setTimeout(() => {
          console.log("Gewonnen!");
        }, 400);
      }

      return {
        ...prev,
        cards: newCards,
      };
    });

    setCardState((prev) => ({ ...prev, triesleft: prev.triesleft - 1 }));

    return;
  }

  setCardState((prev) => ({ ...prev,  cooldown: false }));

  const firstCardId = cardState.findCard.id;

  setTimeout(() => {
    setCardState((prev) => ({
      ...prev,
      cards: prev.cards.map((card) =>
        card.id === id || card.id === firstCardId
          ? { ...card, flipped: false }
          : card
      ),
    }));

    setCardState((prev) => ({ ...prev, findCard: null, cooldown: false }));

setCardState((prev) => ({ ...prev, triesleft: prev.triesleft - 1 }));
  }, 800);
}
