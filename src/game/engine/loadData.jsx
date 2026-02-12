const game_music = import.meta.env.VITE_GAME_MUSIC

export function loadData(
  slotName,
  setMode,
  navigate,
  setSounds,
setStoryState,
setTextState,
uiState,
setUiState
) {
  const saves = JSON.parse(localStorage.getItem("vn_saves") || "[]");
  const existing = saves.find((s) => s.name === slotName);

  if (!existing.timestamp) {
    console.log("Kein Speicherstand gefunden!");
    return;
  }

  const confirmLoad = confirm(
    "Möchtest du diesen Speicherplatz laden? Ungespeicherter Fortschritt geht verloren!"
  );
  if (!confirmLoad) return;


  // Gespeicherte Daten anwenden
  setStoryState((prev) => ({
          ...prev,
          chapter: existing.chapter,
          scene: existing.scene,
          step: existing.step,
          history: existing.history,
          playTime: existing.playTime
        }));
  setSounds((prev) => ({...prev, url: game_music}))
  setTextState((prev) => ({
    ...prev,
    displayText: "",
    pausedText: "",
  }))
  if (uiState.quickMenu) {
    setMode("");
    setUiState((prev) => ({...prev, quickMenu: false}))
  } else {
    navigate("/start");
  }
}
