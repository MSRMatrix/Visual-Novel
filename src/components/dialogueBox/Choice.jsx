const Choice = ({
  currentStep,
  focusableRef,
  storyState,
  setStoryState,
  setUiState,
  uiState
}) => {
  return (
    <>
      {currentStep?.type === "choice" && (
        <div className="choices mt-4 flex flex-col gap-2">
          {currentStep.options.map((choice, idx) => (
            <button
              ref={uiState.gamePaused ? null : (el) => (focusableRef.current[idx] = el)}
              key={idx}
              onClick={() => {
                const newEntry = {
                  chapter: storyState.chapter,
                  scene: storyState.scene,
                  step: storyState.step,
                  choice: choice.text,
                };

                setStoryState((prev) => ({
                  ...prev,
                  chapter: choice.next.chapter,
                  scene: choice.next.scene,
                  step: 0,
                  history: [...prev.history, newEntry],
                }));

                setUiState((prev) => ({...prev, focusedIndex: 0}))
              }}
              className="bg-blue-600 p-2 rounded hover:bg-blue-500"
            >
              {choice.text}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Choice;
