import { useEffect } from "react";

export function useTypeWriterMode({
 currentStep,
    writeSpeed,
    setTextState,
    textState,
    autoState,
    uiState
}) {
  useEffect(() => {
    if (
      !currentStep?.text ||
      currentStep.type === "choice" ||
      currentStep.type === "game" ||
      uiState.quickMenu
    )
      return;

    setTextState((prev) => ({
      ...prev,
      displayText: "",
      textFinished: false
    }));
    
    let i = textState.pausedText.length;

    setTextState((prev) => ({
      ...prev,
      displayText: textState.pausedText + currentStep.text.charAt(i),
      pausedText: ""
    }));
    const interval = setInterval(() => {
      if (i < currentStep.text.length) {
        setTextState((prev) => ({
          ...prev,
          displayText: prev.displayText + currentStep.text.charAt(i),
        }));

        i++;
      } else {
        clearInterval(interval);
        setTextState((prev) => ({
          ...prev,
          textFinished: true,
        }));
      }
    }, writeSpeed);

    return () => clearInterval(interval);
  }, [
    currentStep?.text,
    currentStep.type === "choice",
    currentStep.type === "game",
    uiState.quickMenu,
    autoState.skip,
  ]);
}
