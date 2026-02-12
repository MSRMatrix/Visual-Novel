import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { nextStep } from "../../engine/nextStep";

export function useAutoMode({currentStep, scene, storyState, setStoryState, textState, autoState, uiState,}){
  const navigate = useNavigate();
    useEffect(() => {
    if (
      !autoState.auto ||
      currentStep.type === "choice" ||
      currentStep.type === "game" ||
      !textState.textFinished ||
      uiState.quickMenu
    )
      return;
    const interval = setInterval(() => {
      nextStep(scene, navigate, storyState, setStoryState);
    }, autoState.autoTime);

    return () => clearInterval(interval);
  }, [
    autoState.auto,
    autoState.autoTime,
    currentStep.type === "choice",
    currentStep.type === "game",
    storyState.step,
    textState.textFinished,
    uiState.quickMenu,
  ]);
}
 