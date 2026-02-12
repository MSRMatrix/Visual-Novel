import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { nextStep } from "../../game/engine/nextStep";
import { stepBack } from "../../game/engine/stepBack";

const DialogueAction = ({
  scene,
  hide,
  setHide,
  focusableRef,
  currentStep,
  storyState,
  setStoryState,
  setTextState,
  autoState,
  setAutoState,
  uiState,
  setUiState

}) => {
  const navigate = useNavigate();
  function skipText() {
    setAutoState((prev) => ({...prev, auto: false, skip: !prev.skip}))
  }

  useEffect(() => {
    setUiState((prev) => ({...prev, gamePaused: false}))
  }, [currentStep.type === "choice", currentStep.type === "game"]);

  const menuButtons = [
    {
      label: "Weiter ▶",
      onClick: () => {
        nextStep(scene, navigate, storyState, setStoryState);
        setAutoState((prev) => ({...prev, auto: false}))
         setUiState((prev) => ({...prev, gamePaused: false}))
      },
      disabled: currentStep?.type !== "text",
    },
    {
      label: "Menü",
      onClick: () => {
        setUiState((prev) => ({...prev, quickMenu: true, focusedIndex: 0 }))
        setAutoState((prev) => ({...prev, auto: false, skip: false}))
        setTextState((prev) => ({
          ...prev,
          isPaused:true
        }))
      },
    },
    {
      label: "Auto",
      onClick: () => {
        setAutoState((prev) => ({...prev, auto: !prev.auto, skip: false}))
      },
      // disabled: currentStep?.type !== "text",
      style: { background: autoState.auto ? "blue" : "" },
    },
    {
      label: "Skip",
      // disabled: currentStep?.type !== "text",
      onClick: () => skipText(),
      style: { background: autoState.skip ? "blue" : "" },
    },
    {
      label: "Zurück",
      onClick: () => {
        stepBack(
          currentStep,
          scene,
          storyState,
          setStoryState,
          setUiState
        );
        setAutoState((prev) => ({...prev, auto: false, skip: false})) 
        setUiState((prev) => ({...prev, gamePaused: false}))
      },
      disabled:
        storyState.history.length <= 0 &&
        scene.id === "intro" &&
        storyState.step === 0,
    },
    {
      label: "Hide",
      onClick: () => {
        setHide((prev) => !prev);
        setAutoState((prev) => ({...prev, auto: false, skip: false}))
      },
    },
  ];

  // Tastaturnavigation
  function pauseFunction(index) {
    if (uiState.gamePaused) {
      if (currentStep.type === "choice" || currentStep.type === "game") {
        return index;
      }
    }

    if (
      !uiState.gamePaused &&
      currentStep.type !== "choice" &&
      currentStep.type !== "game"
    ) {
      return index + uiState.startIndex;
    }
  }

  return (
    <>
      {menuButtons.map((btn, index) => (
        <button
          ref={(el) => (focusableRef.current[pauseFunction(index)] = el)}
          key={index}
          className="window-action"
          onClick={btn.onClick}
          disabled={btn.disabled}
          style={btn.style}
        >
          {btn.label}
        </button>
      ))}
    </>
  );
};

export default DialogueAction;
