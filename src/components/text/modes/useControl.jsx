import { useEffect } from "react";
import { handleKeyDown } from "../../functions/handleKeyDown";

export function useKeyControl({
  focusableRef,
  currentStep,
  uiState,
  setUiState,
}) {
  useEffect(() => {
    if (!uiState.quickMenu) {
      const listener = (e) =>
        handleKeyDown(e, focusableRef, false, currentStep, uiState, setUiState);
      window.addEventListener("keydown", listener);
      return () => window.removeEventListener("keydown", listener);
    }
  }, [
    uiState.focusedIndex,
    currentStep.type === "choice",
    currentStep.type === "game",
    uiState.quickMenu,
    uiState.gamePaused,
  ]);
}



export function useFocusMode({ focusableRef, currentStep, uiState }) {
  useEffect(() => {
    if (!uiState.quickMenu) {
      if (focusableRef.current[uiState.focusedIndex]) {
        focusableRef.current[uiState.focusedIndex].focus();
      }
    }
  }, [
    uiState.focusedIndex,
    currentStep.type === "choice",
    currentStep.type === "game",
    uiState.quickMenu,
  ]);
}