export function stepBack(
  stepIndex,
  setStepIndex,
  setCurrentChapter,
  setCurrentScene,
  setChatHistory,
  chatHistory,
  setShowChoices,
  scene,
  showChoices,
  setFocusedIndex,
  setShowGame,
          showGame,
  setGameState
) {


 console.log(scene);

  if (stepIndex > 0) {
    if (!showChoices) {
    return  setStepIndex(stepIndex - 1);
    } 
    else {
      setFocusedIndex(0)
     return setShowChoices(false);
    }

  } else if (chatHistory.length > 0) {
    const last = chatHistory[chatHistory.length - 1];



 if(!last.game){
    setStepIndex(stepIndex - 1);
    setShowGame(false);
  } 



    setCurrentChapter(last.chapter);
    setCurrentScene(last.scene);
    if (last.choice) {
      setShowChoices(true);
    }
    if(last.game){
      setShowGame(true)
      setGameState(last.game.mode)
    }

    setStepIndex(last.step);
    setChatHistory((prev) => prev.slice(0, -1));

    // letzten Eintrag löschen
  } else {
    console.log("Am Anfang der Story.");
  }
}
