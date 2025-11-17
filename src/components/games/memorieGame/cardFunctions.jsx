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


export function cardHandler(value, id, cooldown, gameEnd, cards, triesleft, setGameEnd, setCards, findCard, setFindCard, setTriesleft, setCooldown) {
    if (cooldown || gameEnd || cards.find((item) => item.value === value).solved)
      return;

    if(triesleft <= 0 && !cards.every((card) => card.flipped)){
      setGameEnd(true)
      console.log("Verloren!");
      return;
    }

    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, flipped: true } : card))
    );

    // Erste Karte?
    if (!findCard) {
      setFindCard({ value, id });
      return;
    }

    // Derselbe Klick?
    if (findCard.id === id) return;

    // MATCH
    if (findCard.value === value) {
      setFindCard(null);

      setCards((prev) => {
        const newCards = prev.map((card) =>
          card.value === value ? { ...card, flipped: true, solved: true } : card
        );

        if (newCards.every((card) => card.solved)) {
          setGameEnd(true)
          setTimeout(() => {
            console.log("Gewonnen!");
          }, 400);
        }

        return newCards;
      });
      setTriesleft((prev) => prev - 1);
      return;
    }

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

      setTriesleft((prev) => prev - 1);
    }, 800);
  }
