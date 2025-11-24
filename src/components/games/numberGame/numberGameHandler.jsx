export function answerHandler(numberGameState, setNumberGameState) {
  const guessNum = Number(numberGameState.guess);

  if (numberGameState.tries <= 0) return;

  if (numberGameState.number !== guessNum) {
    setNumberGameState((prev) => ({
      ...prev,
      numberArray: [...prev.numberArray, guessNum],
      tries: prev.tries - 1,
      guess: 0,
    }));
    return;
  }

  finishNumberGame(guessNum);
}

function finishNumberGame(guessNum, storyState, setStoryState, numberGameState, setUiState) {
  const newEntry = {
    chapter: storyState.chapter,
    scene: storyState.scene,
    step: storyState.step,
    answer: guessNum,
    type: "game",
    mode: "number",
  };

  setStoryState((prev) => ({
    ...prev,
    chapter: "chapterOne",
    scene: guessNum === numberGameState.number ? "right_answer" : "wrong_answer",
    step: 0,
    history: [...prev.history, newEntry],
  }));

  setUiState((prev) => ({ ...prev, focusedIndex: 0 }));
}