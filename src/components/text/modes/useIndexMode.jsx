import { useEffect } from "react";

export function useIndexMode({ currentStep, setUiState, uiState}){
    useEffect(() => {
  if (uiState.gamePaused) {
    setUiState((prev) => ({...prev, startIndex: null}))
    return;
  }

  if (currentStep.type === "choice") {
    setUiState((prev) => ({...prev, startIndex: 2}))
  } else if (currentStep.mode === "number") {
    setUiState((prev) => ({...prev, startIndex: 2}))
  } else if (currentStep.mode === "memorie") {
    setUiState((prev) => ({...prev, startIndex: 11}))
  } else {
    setUiState((prev) => ({...prev, startIndex: 0}))
  }
  }, [currentStep.type, currentStep.mode, uiState.gamePaused]);
}

