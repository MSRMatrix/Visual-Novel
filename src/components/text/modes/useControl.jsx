import { useEffect } from "react";
import { handleKeyDown } from "../../functions/handleKeyDown";

export function useKeyControl({ focusableRef, currentStep, uiState, setUiState, effectdeps, ifDeps }) {
  useEffect(() => {
    if (ifDeps) {
      const listener = (e) =>
        handleKeyDown(e, focusableRef, false, currentStep, uiState, setUiState);
      window.addEventListener("keydown", listener);
      return () => window.removeEventListener("keydown", listener);
    }
  }, [...effectdeps]);
}

export function useFocusMode({ focusableRef, currentStep, uiState, effectdeps, ifDeps }) {
  useEffect(() => {
    if (ifDeps) {
      focusableRef.current[uiState.focusedIndex]?.focus();
    }
  }, [...effectdeps]);
}
