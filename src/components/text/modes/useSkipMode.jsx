import { useEffect } from "react";
import { nextStep } from "../../functions/nextStep";
import { useNavigate } from "react-router-dom";



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
