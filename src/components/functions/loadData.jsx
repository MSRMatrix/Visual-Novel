const game_music = import.meta.env.VITE_GAME_MUSIC

export function loadData(
  slotName,
  setCurrentChapter,
  setCurrentScene,
  setStepIndex,
  setChatHistory,
  setMode,
  setQuickMenu,
  navigate,
  quickMenu,
  setPlayTime,
  setSounds,
  setDisplayText,
setPausedText,
setShowChoices
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
  setCurrentChapter(existing.currentChapter);
  setCurrentScene(existing.currentScene);
  setStepIndex(existing.stepIndex);
  setChatHistory(existing.chatHistory);
  setPlayTime(existing.playTime)
  setShowChoices(existing.showChoices)
  setSounds((prev) => ({...prev, url: game_music}))
  setDisplayText("")
  setPausedText("")
  if (quickMenu) {
    setMode("");
    setQuickMenu("");
  } else {
    navigate("/start");
  }
}
