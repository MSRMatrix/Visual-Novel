import { useEffect } from "react";
import { nextStep } from "../../functions/nextStep";
import { useNavigate } from "react-router-dom";

export function useAutoMode({auto, currentStep, textFinished, quickMenu, scene, storyState, setStoryState, autoTime}){
  const navigate = useNavigate();
    useEffect(() => {
    if (
      !auto ||
      currentStep.type === "choice" ||
      currentStep.type === "game" ||
      !textFinished ||
      quickMenu
    )
      return;
    const interval = setInterval(() => {
      nextStep(scene, navigate, storyState, setStoryState);
    }, autoTime);

    return () => clearInterval(interval);
  }, [
    auto,
    autoTime,
    currentStep.type === "choice",
    currentStep.type === "game",
    storyState.step,
    textFinished,
    quickMenu,
  ]);
}
 