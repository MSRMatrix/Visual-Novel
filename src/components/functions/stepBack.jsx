export function stepBack(
  currentStep,
  scene,
  storyState,
  setStoryState,
  setUiState
) {
  // 1️⃣ Wenn wir im aktuellen Scene-Step zurückgehen können
  if(storyState.history.length <= 0 && scene.id === "intro" && storyState.step === 0){
    return
  }

  if (storyState.step > 0) { 
    setStoryState((prev) => ({
          ...prev,
          step: storyState.step - 1
        }));
    // setFocusedIndex(0);
    return;
  }

  // 2️⃣ Wenn wir am ersten Step sind, aber History vorhanden ist
  if (storyState.history.length > 0) {
    const last = storyState.history[storyState.history.length - 1];

    setStoryState((prev) => ({
          ...prev,
          chapter: last.chapter,
          scene: last.scene,
          step: last.step,
          history: prev.history.slice(0, -1)
        }));
    // setFocusedIndex(0);
    return;
  }
        setUiState((prev) => ({...prev, focusedIndex: 0}))
  

  // 3️⃣ Wenn wir am Anfang der Story sind
  console.log("Am Anfang der Story.");
}
