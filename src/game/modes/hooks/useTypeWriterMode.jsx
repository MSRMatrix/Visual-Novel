import { useEffect, useRef } from "react";

export function useTypeWriterMode({
  currentStep,
  writeSpeed,
  setTextState,
  autoState,
  uiState
}) {
  const indexRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Guard Conditions
    if (
      !currentStep?.text ||
      currentStep.type === "choice" ||
      currentStep.type === "game" ||
      uiState.quickMenu
    ) {
      return;
    }

    const fullText = currentStep.text;

    // Reset
    indexRef.current = 0;

    setTextState(prev => ({
      ...prev,
      displayText: "",
      textFinished: false,
    }));

    // Skip sofort komplett anzeigen
    if (autoState.skip) {
      setTextState(prev => ({
        ...prev,
        displayText: fullText,
        textFinished: true,
      }));
      return;
    }

    const typeNext = () => {
      indexRef.current++;

      setTextState(prev => ({
        ...prev,
        displayText: fullText.slice(0, indexRef.current),
      }));

      if (indexRef.current < fullText.length) {
        timeoutRef.current = setTimeout(typeNext, writeSpeed);
      } else {
        setTextState(prev => ({
          ...prev,
          textFinished: true,
        }));
      }
    };

    timeoutRef.current = setTimeout(typeNext, writeSpeed);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [
    currentStep?.text,
    currentStep?.type,
    uiState.quickMenu,
    autoState.skip,
    writeSpeed,
    setTextState
  ]);
}
