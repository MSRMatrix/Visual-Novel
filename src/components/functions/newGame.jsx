export function newGame(
  setAction,
          setStoryState,
          setTextState, setUiState
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
    setUiState((prev) => ({...prev, quickMenu: false}))
    setTextState((prev) => ({
    ...prev,
    displayText: "",
    pausedText: ""
  }))
    return;
  } else {
    console.log(`Neues Spiel abgebrochen!`);
  }
}
