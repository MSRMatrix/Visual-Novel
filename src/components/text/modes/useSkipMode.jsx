import { useEffect } from "react";
import { nextStep } from "../../functions/nextStep";

export function useSkipMode({ skip, currentStep, quickMenu, scene, navigate, storyState, setStoryState}) {
  useEffect(() => {
    if (!skip || currentStep.type === "choice" || currentStep.type === "game" || quickMenu)
      return;

    const interval = setInterval(() => {
      nextStep(scene, navigate, storyState, setStoryState);
    }, 80);

    return () => clearInterval(interval);
  }, [skip, currentStep.type, quickMenu, scene, navigate, storyState, setStoryState]);
}
