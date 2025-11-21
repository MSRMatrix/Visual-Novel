export function stepBack(
  stepIndex,
  setStepIndex,
  currentStep,
  setCurrentChapter,
  setCurrentScene,
  setChatHistory,
  chatHistory,
  setFocusedIndex,
  scene
) {
  // 1️⃣ Wenn wir im aktuellen Scene-Step zurückgehen können
  if(chatHistory.length <= 0 && scene.id === "intro" && stepIndex === 0){
    return
  }

  if (stepIndex > 0) {
    setStepIndex(stepIndex - 1);
    // setFocusedIndex(0);
    return;
  }

  // 2️⃣ Wenn wir am ersten Step sind, aber History vorhanden ist
  if (chatHistory.length > 0) {
    const last = chatHistory[chatHistory.length - 1];

    setCurrentChapter(last.chapter);
    setCurrentScene(last.scene);
    setStepIndex(last.step);

    setChatHistory((prev) => prev.slice(0, -1));
    // setFocusedIndex(0);
    return;
  }
    setFocusedIndex(0);
  

  // 3️⃣ Wenn wir am Anfang der Story sind
  console.log("Am Anfang der Story.");
}
