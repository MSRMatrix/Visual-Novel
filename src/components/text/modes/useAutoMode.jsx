import { useEffect } from "react";
import { nextStep } from "../../functions/nextStep";

export function useAutoMode({auto, currentStep, textFinished, quickMenu, scene, navigate, storyState, setStoryState, autoTime}){
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
 