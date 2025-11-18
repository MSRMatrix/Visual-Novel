export function handleKeyDown(
  e,
  focusableRef,
  focusedIndex,
  setFocusedIndex,
  active
) {




  if (!focusableRef.current.length || active) return;
  let focusables = focusableRef.current.filter(Boolean);


  // Escape einbauen zum togglen. Gegebenfalls einen Boolean einbauen um dann die ausgewählten mit disabled togglen zu können
  if(e.key === "Escape" && focusables.length <= 6){
  focusables = focusables.filter((item) => item.className === "window-action");
} else {
  focusables = focusableRef.current.filter(Boolean);
}
console.log(focusables);

  if (isNaN(focusedIndex)) {
    setFocusedIndex(0);
  }
  const activeEl = document.activeElement;
  if (activeEl && activeEl.tagName === "INPUT" && activeEl.type === "range") {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  }

  if (e.key === "ArrowDown") {
    e.preventDefault();
    let nextIndex = (focusedIndex + 1) % focusables.length;
    while (focusableRef.current[nextIndex]?.disabled) {
      nextIndex = (nextIndex + 1) % focusables.length;
    }
    setFocusedIndex(nextIndex);
    focusableRef.current[nextIndex]?.focus();
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();
    let previousIndex =
      (focusedIndex - 1 + focusables.length) % focusables.length;
    while (focusableRef.current[previousIndex]?.disabled) {
      previousIndex =
        (previousIndex - 1 + focusables.length) % focusables.length;
    }
    setFocusedIndex(previousIndex);
    focusableRef.current[previousIndex]?.focus();
  }
}
