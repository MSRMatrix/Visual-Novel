export function handleKeyDown(
  e,
  focusableRef,
  active,
  currentStep,
  uiState,
  setUiState
) {
  if (!focusableRef.current.length || active) return;
  let focusables = focusableRef.current.filter(Boolean);

  if (
    (e.key === "Escape" &&
      !uiState.gamePaused &&
      currentStep.type === "game") ||
    (e.key === "Escape" && !uiState.gamePaused && currentStep.type === "choice")
  ) {
    setUiState((prev) => ({ ...prev, gamePaused: true }));
  } else if (
    (e.key === "Escape" && uiState.gamePaused && currentStep.type === "game") ||
    (e.key === "Escape" && uiState.gamePaused && currentStep.type === "choice")
  ) {
    setUiState((prev) => ({ ...prev, gamePaused: false }));
  }

  if (isNaN(uiState.focusedIndex)) {
    setUiState((prev) => ({ ...prev, focusedIndex: 0 }));
  }
  const activeEl = document.activeElement;
  if (activeEl && activeEl.tagName === "INPUT" && activeEl.type === "range") {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  }

  if (e.key === "ArrowDown") {
    e.preventDefault();
    let nextIndex = (uiState.focusedIndex + 1) % focusables.length;
    while (focusableRef.current[nextIndex]?.disabled) {
      nextIndex = (nextIndex + 1) % focusables.length;
    }

    setUiState((prev) => ({ ...prev, focusedIndex: nextIndex }));
    focusableRef.current[nextIndex]?.focus();
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();
    let previousIndex =
      (uiState.focusedIndex - 1 + focusables.length) % focusables.length;
    while (focusableRef.current[previousIndex]?.disabled) {
      previousIndex =
        (previousIndex - 1 + focusables.length) % focusables.length;
    }
    setUiState((prev) => ({ ...prev, focusedIndex: previousIndex }));
    focusableRef.current[previousIndex]?.focus();
  }
}
