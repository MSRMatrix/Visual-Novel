import { useEffect } from "react";
import { nextStep } from "../../functions/nextStep";
import { useNavigate } from "react-router-dom";



export function useSkipMode({ skip, currentStep, quickMenu, scene, storyState, setStoryState}) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!skip || currentStep.type === "choice" || currentStep.type === "game" || quickMenu)
      return;

    const interval = setInterval(() => {
      nextStep(scene, navigate, storyState, setStoryState);
    }, 80);

    return () => clearInterval(interval);
  }, [skip, currentStep.type, quickMenu, scene, navigate, storyState, setStoryState]);
}
