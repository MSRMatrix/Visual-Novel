export function stepBack(
  stepIndex,
  setStepIndex,
  setCurrentChapter,
  setCurrentScene,
  setChatHistory,
  chatHistory,
  setShowChoices,
  scene,
  showChoices
) {
  if (stepIndex > 0) {
    if (!showChoices) {
    return  setStepIndex(stepIndex - 1);
    } else {
     return setShowChoices(false);
    }
  } else if (chatHistory.length > 0) {
    const last = chatHistory[chatHistory.length - 1];
    setCurrentChapter(last.chapter);
    setCurrentScene(last.scene);
    if (last.choice) {
      setShowChoices(true);
    }

    setStepIndex(last.step);
    setChatHistory((prev) => prev.slice(0, -1));

    // letzten Eintrag löschen
  } else {
    console.log("Am Anfang der Story.");
  }
}
