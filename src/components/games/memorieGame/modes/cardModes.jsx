import { useEffect } from "react";

export function useCardMode({cardState, storyState, setStoryState, setUiState, }){
     useEffect(() => {
  let status = null;

  if (cardState.triesleft <= 0 && !cardState.cards.every((c) => c.solved)) {
    status = "lost";
  } else if (cardState.cards.every((c) => c.solved)) {
    status = "win";
  }

  if (!status) return; 

  const newEntry = {
    chapter: storyState.chapter,
    scene: storyState.scene,
    step: storyState.step,
    type: "game",
    mode: "memorie",
    status: true,
  };

  setTimeout(() => {
    setStoryState((prev) => ({
      ...prev,
      chapter: "chapterTwo",
      scene: status,
      step: 0,
      history: [...prev.history, newEntry],
    }));
    setUiState((prev) => ({ ...prev, focusedIndex: 0 }));
  }, 1000);
}, [cardState.triesleft, cardState.cards]);
}
