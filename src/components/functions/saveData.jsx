export function saveData(
  slotName,
  saves,
  setSaves,
  storyState
) {
  const existing = saves.find((s) => s.name === slotName && s.timestamp);

  if (existing) {
    const override = confirm("Möchtest du diesen Speicherplatz überschreiben?");
    if (!override) return;
  }

  const newSave = {
    name: slotName,
    timestamp: new Date().toLocaleTimeString(),
    chapter: storyState.chapter,
    scene: storyState.scene,
    step: storyState.step,
    history: storyState.history,
    playTime: storyState.playTime,
  };

  // Speichern
  const newSaves = saves.map((s) => (s.name === slotName ? newSave : s));

  setSaves(newSaves);
  localStorage.setItem("vn_saves", JSON.stringify(newSaves));
}
