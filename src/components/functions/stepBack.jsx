export function stepBack(stepIndex, setStepIndex, setCurrentChapter, setCurrentScene, setChatHistory, chatHistory, setShowChoices, scene){
  if (stepIndex > 0) {
    
    setStepIndex(stepIndex - 1);
    if(chatHistory.choice){
      setShowChoices(true)
    } else{
      setShowChoices(false)
    }
  } else if (chatHistory.length > 0) {
    const last = chatHistory[chatHistory.length - 1];
    
    setCurrentChapter(last.chapter);
    setCurrentScene(last.scene);
    setStepIndex(last.step);
    setChatHistory((prev) => prev.slice(0, -1)); // letzten Eintrag löschen
  } else {
    console.log("Am Anfang der Story.");
  }
}