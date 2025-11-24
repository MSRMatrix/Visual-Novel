import { useEffect } from "react";

export function useWriteSoundMode({currentStep, stop, play, textState, autoState, uiState}){
    useEffect(() => {
    if (
      !currentStep?.text ||
      currentStep.type === "choice" ||
      currentStep.type === "game" ||
      autoState.skip
    )
      return;

    if (textState.textFinished || uiState.quickMenu) {
      stop();
    } else {
      play();
    }

    return () => stop();
  }, [
    currentStep?.text,
    textState.textFinished,
    uiState.quickMenu,
    currentStep.type === "choice",
    currentStep.type === "game",
  ]);
}
  