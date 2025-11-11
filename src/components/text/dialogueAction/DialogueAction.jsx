import { useEffect, useRef, useState } from "react";
import { nextStep } from "../../functions/nextStep";
import { stepBack } from "../../functions/stepBack";
import { handleKeyDown } from "../../functions/handleKeyDown";

const DialogueAction = ({
  scene,
  stepIndex,
  setStepIndex,
  setShowChoices,
  currentChapter,
  navigate,
  setChatHistory,
  currentScene,
  setCurrentChapter,
  setCurrentScene,
  setAuto,
  showChoices,
  setQuickMenu,
  auto,
  chatHistory,
  hide,
  setHide,
  skip,
  setSkip,
  setIsPaused,
  focusableRef,
startIndex,
setFocusedIndex,
showGame,
setShowGame, 
gameState, 
setGameState,currentStep
}) => {  
  
  function skipText() {
    setSkip((prevMode) => !prevMode);
    setAuto(false);
  }

  const menuButtons = [
    {
      label: "Weiter ▶",
      onClick: () => {
        nextStep(
         scene,
  stepIndex,
  setStepIndex,
  setShowChoices,
  currentChapter,
  navigate,
  setChatHistory,
  currentScene,
  setCurrentChapter,
  setCurrentScene,
  setShowGame,
  setGameState,gameState
        );
        setAuto(false);
      },
      disabled: currentStep.type !== "text",
    },
    {
      label: "Menü",
      onClick: () => {
        setQuickMenu(true);
        setSkip(false);
        setAuto(false);
        setIsPaused(true);
      },
    },
    {
      label: "Auto",
      onClick: () => {
        setAuto((prev) => !prev);
        setSkip(false);
      },
      disabled: currentStep?.type !== "text",
      style: { background: auto ? "blue" : "" },
    },
    {
      label: "Skip",
      disabled: currentStep?.type !== "text",
      onClick: () => skipText(),
      style: { background: skip ? "blue" : "" },
    },
    {
      label: "Zurück",
      onClick: () => {
        stepBack(
       stepIndex,
  setStepIndex,
  currentStep,
  setCurrentChapter,
  setCurrentScene,
  setChatHistory,
  chatHistory,
  setFocusedIndex,setGameState,setShowGame
        );
        setAuto(false);
        setSkip(false)
      },
      disabled: !chatHistory,
    },
    {
      label: "Hide",
      onClick: () => setHide((prev) => !prev),
    },
  ];



  // Tastaturnavigation

  return (
      <div>
        {menuButtons.map((btn, index) => (
          <button
           ref={(el) => (focusableRef.current[startIndex + index] = el)}
            key={index}
            className="window-action"
            onClick={btn.onClick}
            disabled={btn.disabled}
            style={btn.style}
          >
            {btn.label}
          </button>
        ))}
      </div>
  );
};

export default DialogueAction;
