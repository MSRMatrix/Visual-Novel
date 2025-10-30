import { useEffect, useState } from "react";
import { nextStep } from "../../functions/nextStep";
import { stepBack } from "../../functions/stepBack";

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
          chatHistory
        );
        setAuto(false);
      },
      disabled: showChoices,
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
      disabled: showChoices,
      style: { background: auto ? "blue" : "" },
    },
    {
      label: "Skip",
      onClick: () => skipText(),
      style: { background: skip ? "blue" : "" },
    },
    {
      label: "Zurück",
      onClick: () => {
        stepBack(
          stepIndex,
          setStepIndex,
          setCurrentChapter,
          setCurrentScene,
          setChatHistory,
          chatHistory,
          setShowChoices,
          scene,
          showChoices
        );
        setAuto(false);
      },
      disabled: !chatHistory,
    },
    {
      label: "Hide",
      onClick: () => setHide((prev) => !prev),
    },
  ];

  return (
      <div>
        {menuButtons.map((btn, index) => (
          <button
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
