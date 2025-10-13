export function stepBack(stepIndex, setStepIndex, setCurrentChapter, setCurrentScene, setHistory, history, setShowChoices){
  if (stepIndex > 0) {
    setShowChoices(false)
    setStepIndex(stepIndex - 1);
  } else if (history.length > 0) {
    const last = history[history.length - 1];
    setCurrentChapter(last.chapter);
    setCurrentScene(last.scene);
    setStepIndex(last.step);
    setHistory((prev) => prev.slice(0, -1)); // letzten Eintrag löschen
  } else {
    console.log("Am Anfang der Story.");
  }
}