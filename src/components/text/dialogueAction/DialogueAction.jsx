import { useEffect } from "react";
import { nextStep } from "../../functions/nextStep";
import { stepBack } from "../../functions/stepBack";
import { useNavigate } from "react-router-dom";

const DialogueAction = ({
  scene,
  setAuto,
  setQuickMenu,
  auto,
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
  storyState,
  setStoryState,
}) => {
  const navigate = useNavigate();
  function skipText() {
    setSkip((prevMode) => !prevMode);
    setAuto(false);
  }

  useEffect(() => {
    setGamePaused(false);
  }, [currentStep.type === "choice", currentStep.type === "game"]);

  const menuButtons = [
    {
      label: "Weiter ▶",
      onClick: () => {
        nextStep(scene, navigate, storyState, setStoryState);
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
          currentStep,
          setFocusedIndex,
          scene,
          storyState,
          setStoryState
        );
        setAuto(false);
        setSkip(false);
        setGamePaused(false);
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

    if (
      !gamePaused &&
      currentStep.type !== "choice" &&
      currentStep.type !== "game"
    ) {
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
