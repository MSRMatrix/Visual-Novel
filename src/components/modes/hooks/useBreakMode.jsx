import { useEffect } from "react";

export function useBreakMode({ setStoryState, textState, uiState }) {
  useEffect(() => {
    if (textState.isPaused || uiState.quickMenu) return;

    const interval = setInterval(() => {
      setStoryState((prev) => ({
        ...prev,
        playTime: prev.playTime + 1,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [textState.isPaused, uiState.quickMenu]);
}
