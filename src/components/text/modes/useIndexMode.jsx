import { useEffect } from "react";

export function useIndexMode({gamePaused, setStartIndex, currentStep}){
    useEffect(() => {
  if (gamePaused) {
    setStartIndex(null);
    return;
  }

  if (currentStep.type === "choice") {
    setStartIndex(2);
  } else if (currentStep.mode === "number") {
    setStartIndex(2);
  } else if (currentStep.mode === "memorie") {
    setStartIndex(11);
  } else {
    setStartIndex(0);
  }
  }, [currentStep.type, currentStep.mode, gamePaused]);
}

