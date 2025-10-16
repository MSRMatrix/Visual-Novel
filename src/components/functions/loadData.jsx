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
  setPlayTime
) {
  const saves = JSON.parse(localStorage.getItem("vn_saves") || "[]");
  const existing = saves.find((s) => s.name === slotName);

  if (!existing) {
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
  setPlayTime(existing.setPlayTime)

  if (quickMenu) {
    setMode("");
    setQuickMenu("");
  } else {
    navigate("/start");
  }
}
