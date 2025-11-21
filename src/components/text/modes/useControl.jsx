import { useEffect } from "react";
import { handleKeyDown } from "../../functions/handleKeyDown";

export function useKeyControl({quickMenu,focusableRef,focusedIndex,setFocusedIndex,gamePaused,setGamePaused,currentStep,}){
    useEffect(() => {
    if (!quickMenu) {
      const listener = (e) =>
        handleKeyDown(
          e,
          focusableRef,
          focusedIndex,
          setFocusedIndex,
          false,
          gamePaused,
          setGamePaused,
          currentStep
        );
      window.addEventListener("keydown", listener);
      return () => window.removeEventListener("keydown", listener);
    }
  }, [
    focusedIndex,
    currentStep.type === "choice",
    currentStep.type === "game",
    quickMenu,
    gamePaused,
  ]);
}
 
  export function useFocusMode({quickMenu, focusableRef, focusedIndex, currentStep}){
    useEffect(() => {
    if (!quickMenu) {
      if (focusableRef.current[focusedIndex]) {
        focusableRef.current[focusedIndex].focus();
      }
    }
  }, [
    focusedIndex,
    currentStep.type === "choice",
    currentStep.type === "game",
    quickMenu,
  ]);
  }
  // Fokus setzen
  