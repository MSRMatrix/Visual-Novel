export function newGame(
  setAction,
  setQuickMenu,
  setDisplayText,
setPausedText,
          setStoryState
) {
  if (
    confirm(
      "Möchtest du ein neues Spiel starten? Alle deine ungespeicherten Daten gehen verloren!"
    )
  ) {
    setStoryState((prev) => ({
          ...prev,
          chapter: "prolog",
          scene: "intro",
          step: 0,
          history: [],
          playTime: 0,
        }));
    setAction("");
    setQuickMenu(false);
    setDisplayText("");
    setPausedText("");
    return;
  } else {
    console.log(`Neues Spiel abgebrochen!`);
  }
}
