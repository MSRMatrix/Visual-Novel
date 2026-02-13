import { useEffect } from "react";

export function useNumberMode({numberGameState,storyState, setStoryState, setUiState}){
    useEffect(() => {
        if (
          numberGameState.tries < 0 &&
          numberGameState.number !== numberGameState.guess
        ) {
          const newEntry = {
            chapter: storyState.chapter,
            scene: storyState.scene,
            step: storyState.step,
            answer: numberGameState.guess,
            type: "game",
            mode: "number",
          };
    
          setStoryState((prev) => ({
            ...prev,
            chapter: "chapterOne",
            scene:
              numberGameState.number !== numberGameState.guess
                ? "wrong_answer"
                : "right_answer",
            step: 0,
            history: [...prev.history, newEntry],
          }));
          setUiState((prev) => ({ ...prev, focusedIndex: 0 }));
        }
      }, [
        numberGameState.tries < 0 &&
          numberGameState.number !== numberGameState.guess,
      ]);
}