export function saveData(
  slotName,
  saves,
  currentChapter,
  currentScene,
  stepIndex,
  chatHistory,
  setSaves
) {
  const existing = saves.find((s) => s.name === slotName && s.timestamp);

  if (existing) {
    const override = confirm("Möchtest du diesen Speicherplatz überschreiben?");
    if (!override) return;
  }

  const newSave = {
    name: slotName,
    timestamp: new Date().toLocaleTimeString(),
    currentChapter,
    currentScene,
    stepIndex,
    chatHistory,
  };

  // Speichern
  const newSaves = saves.map((s) => (s.name === slotName ? newSave : s));

  setSaves(newSaves);
  localStorage.setItem("vn_saves", JSON.stringify(newSaves));
}
