import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { nextStep } from "../../functions/nextStep";



export function useSkipMode({ currentStep, scene, storyState, setStoryState, autoState, uiState}) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!autoState.skip || currentStep.type === "choice" || currentStep.type === "game" || uiState.quickMenu)
      return;

    const interval = setInterval(() => {
      nextStep(scene, navigate, storyState, setStoryState);
    }, 80);

    return () => clearInterval(interval);
  }, [autoState.skip, currentStep.type, uiState.quickMenu, scene, navigate, storyState, setStoryState]);
}
