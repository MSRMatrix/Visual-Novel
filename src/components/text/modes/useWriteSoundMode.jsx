import { useEffect } from "react";

export function useWriteSoundMode({currentStep, skip, textFinished, quickMenu, stop, play}){
    useEffect(() => {
    if (
      !currentStep?.text ||
      currentStep.type === "choice" ||
      currentStep.type === "game" ||
      skip
    )
      return;

    if (textFinished || quickMenu) {
      stop();
    } else {
      play();
    }

    return () => stop();
  }, [
    currentStep?.text,
    textFinished,
    quickMenu,
    currentStep.type === "choice",
    currentStep.type === "game",
  ]);
}
  