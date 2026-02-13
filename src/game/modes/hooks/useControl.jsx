import { useEffect } from "react";
import { handleKeyDown } from "../../engine/logic/handleKeyDown";

export function useKeyControl({ focusableRef, currentStep, uiState, setUiState, effectdeps, ifDeps }) {
  useEffect(() => {
    if(!focusableRef.current){
      console.log(`array leer`);
      
    }
    if (ifDeps) {
      const listener = (e) =>
        handleKeyDown(e, focusableRef, false, currentStep, uiState, setUiState);
      window.addEventListener("keydown", listener);
      return () => window.removeEventListener("keydown", listener);
    }
  }, [...effectdeps]);
}

export function useFocusMode({ focusableRef, uiState, effectdeps, ifDeps }) {
  useEffect(() => {
    // console.log(focusableRef);
    // console.log(uiState);
    
    if (ifDeps) {
      focusableRef.current[uiState.focusedIndex]?.focus();
    }
  }, [...effectdeps]);
}
