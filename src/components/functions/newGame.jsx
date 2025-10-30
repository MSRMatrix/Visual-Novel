export function newGame(
  setCurrentChapter,
  setCurrentScene,
  setStepIndex,
  setChatHistory,
  setAction,
  setQuickMenu,
  setPlayTime,
  setDisplayText,
setPausedText,
setShowChoices
) {
  if (
    confirm(
      "Möchtest du ein neues Spiel starten? Alle deine ungespeicherten Daten gehen verloren!"
    )
  ) {
    setCurrentChapter("prolog");
    setCurrentScene("intro");
    setStepIndex(0);
    setChatHistory([]);
    setAction("");
    setQuickMenu(false);
    setPlayTime(0);
    setDisplayText("");
    setPausedText("");
    setShowChoices(false);
    return;
  } else {
    console.log(`Neues Spiel abgebrochen!`);
  }
}
