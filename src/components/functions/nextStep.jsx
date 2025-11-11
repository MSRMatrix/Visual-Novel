export function nextStep(
  scene,
  stepIndex,
  setStepIndex,
  setShowChoices,
  currentChapter,
  navigate,
  setChatHistory,
  currentScene,
  setCurrentChapter,
  setCurrentScene,
  setShowGame,
  setGameState,
  gameState
) {
  const steps = scene.steps;
  const currentStep = steps[stepIndex];

  // 🔹 Typ-basierte Logik
  switch (currentStep.type) {
    case "text":
      if (stepIndex < steps.length - 1) {
        setStepIndex(stepIndex + 1);
      } else if (currentStep.next) {
        // Nächstes Kapitel / Szene
        const nextChapter = currentStep.next.chapter || currentChapter;
        const nextScene = currentStep.next.scene;

        if (nextChapter === "exit" && nextScene === "close") {
          return navigate("/credits");
        }

        setChatHistory((prev) => [
          ...prev,
          {
            chapter: currentChapter,
            scene: currentScene,
            step: stepIndex,
            choice: false,
          },
        ]);

        setCurrentChapter(nextChapter);
        setCurrentScene(nextScene);
        setStepIndex(0);
        setShowChoices(false);
        setShowGame(false);
      }
      break;

    case "choice":
      // Choice anzeigen
      setShowChoices(true);
      setShowGame(false);

      break;

    case "game":
      setGameState(currentStep.mode);
      setShowGame(true);
      setShowChoices(false);
      break;

    default:
      console.warn("Unbekannter Step-Type:", currentStep.type);
  }
}
