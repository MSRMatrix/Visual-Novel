import { useEffect } from "react";

export function useTypeWriterMode({currentStep, quickMenu, setDisplayText, setTextFinished, setPausedText, pausedText, writeSpeed, skip}){
  useEffect(() => {
    if (
      !currentStep?.text ||
      currentStep.type === "choice" ||
      currentStep.type === "game" ||
      quickMenu
    )
      return;

    setDisplayText("");
    setTextFinished(false);

    let i = pausedText.length;

    setDisplayText(pausedText + currentStep.text.charAt(i));
    setPausedText("");
    const interval = setInterval(() => {
      if (i < currentStep.text.length) {
        setDisplayText((prev) => prev + currentStep.text.charAt(i));
        i++;
      } else {
        clearInterval(interval);
        setTextFinished(true);
      }
    }, writeSpeed);

    return () => clearInterval(interval);
  }, [
    currentStep?.text,
    currentStep.type === "choice",
    currentStep.type === "game",
    quickMenu,
    skip,
  ]);
}