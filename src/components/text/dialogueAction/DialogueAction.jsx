import { useEffect } from "react";
import { nextStep } from "../../functions/nextStep";
import { stepBack } from "../../functions/stepBack";

const DialogueAction = ({
  scene,
  stepIndex,
  setStepIndex,
  currentChapter,
  navigate,
  setChatHistory,
  currentScene,
  setCurrentChapter,
  setCurrentScene,
  setAuto,
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
  currentStep,
  setGamePaused,
  gamePaused,
}) => {
  function skipText() {
    setSkip((prevMode) => !prevMode);
    setAuto(false);
  }

  useEffect(() => {
    setGamePaused(false);
  }, [currentStep.type === "choice" , currentStep.type === "game",]);

  const menuButtons = [
    {
      label: "Weiter ▶",
      onClick: () => {
        nextStep(
          scene,
          stepIndex,
          setStepIndex,
          currentChapter,
          navigate,
          setChatHistory,
          currentScene,
          setCurrentChapter,
          setCurrentScene,
        );
        setAuto(false);
        setGamePaused(false);
      },
      disabled: currentStep?.type !== "text",
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
      // disabled: currentStep?.type !== "text",
      style: { background: auto ? "blue" : "" },
    },
    {
      label: "Skip",
      // disabled: currentStep?.type !== "text",
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
          setFocusedIndex,
          scene
        );
        setAuto(false);
        setSkip(false);
        setGamePaused(false);
      },
      disabled:
        chatHistory.length <= 0 && scene.id === "intro" && stepIndex === 0,
    },
    {
      label: "Hide",
      onClick: () => {
        setHide((prev) => !prev);
        setAuto(false);
        setSkip(false);
      },
    },
  ];

  // Tastaturnavigation
  function test(index) {
    if (gamePaused) {
      if (currentStep.type === "choice" || currentStep.type === "game") {
        return index;
      }
      
    }
    
    if(!gamePaused && currentStep.type !== "choice" && currentStep.type !== "game"){
      return index + startIndex;
    }
  }
  
  return (
    <div>
      {menuButtons.map((btn, index) => (
        <button
          ref={(el) => (focusableRef.current[test(index)] = el)}
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
