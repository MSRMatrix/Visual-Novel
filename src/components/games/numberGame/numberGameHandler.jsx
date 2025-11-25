export function answerHandler(numberGameState, setNumberGameState, storyState, setStoryState, setUiState) {
  const guessNum = Number(numberGameState.guess);

  if (numberGameState.number !== guessNum) {
    setNumberGameState((prev) => ({
      ...prev,
      numberArray: [...prev.numberArray, guessNum],
      tries: prev.tries - 1,
      guess: 0,
    }));
    return;
  }

  finishNumberGame(guessNum, storyState, setStoryState, numberGameState, setUiState);
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









// export function answerHandler({numberGameState, setNumberGameState ,storyState, setStoryState, setUiState}) {
//   console.log(numberGameState);
  
//   const guessNum = Number(numberGameState.guess);
//   console.log(storyState);
  

//   if (numberGameState.tries <= 0 && numberGameState.number !== guessNum) {
//     finishNumberGame(
//       guessNum,
//       storyState,
//       setStoryState,
//       numberGameState,
//       setUiState
//     );
//   }

//   if (numberGameState.number !== guessNum) {
//     setNumberGameState((prev) => ({
//       ...prev,
//       numberArray: [...prev.numberArray, guessNum],
//       tries: prev.tries - 1,
//       guess: 0,
//     }));
//     return;
//   }
//   console.log(`test`);
// }

// function finishNumberGame(
//   guessNum,
//   storyState,
//   setStoryState,
//   numberGameState,
//   setUiState
// ) {
//   console.log(storyState);

//   const newEntry = {
//     chapter: storyState.chapter,
//     scene: storyState.scene,
//     step: storyState.step,
//     answer: guessNum,
//     type: "game",
//     mode: "number",
//   };

//   setStoryState((prev) => ({
//     ...prev,
//     chapter: "chapterOne",
//     scene:
//       guessNum === numberGameState.number ? "right_answer" : "wrong_answer",
//     step: 0,
//     history: [...prev.history, newEntry],
//   }));

//   setUiState((prev) => ({ ...prev, focusedIndex: 0 }));
// }
