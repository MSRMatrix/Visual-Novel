import { useEffect } from "react";

export function useBreakMode({ isPaused, quickMenu, setStoryState }) {
  useEffect(() => {
    if (isPaused || quickMenu) return;

    const interval = setInterval(() => {
      setStoryState((prev) => ({
        ...prev,
        playTime: prev.playTime + 1,
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, quickMenu]);
}
