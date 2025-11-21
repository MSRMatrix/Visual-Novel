export function nextStep(
  scene,
  navigate,
  storyState,
  setStoryState,
) {
  const steps = scene.steps;
  const currentStep = steps[storyState.step];

  // 🔹 Typ-basierte Logik
  switch (currentStep.type) {
    case "text":
      if (storyState.step < steps.length - 1) {
         setStoryState((prev) => ({
          ...prev,
          step: storyState.step + 1
        }));
      } else if (currentStep.next) {
        // Nächstes Kapitel / Szene
        const nextChapter = currentStep.next.chapter || storyState.chapter;
        const nextScene = currentStep.next.scene;

        if (nextChapter === "exit" && nextScene === "close") {
          return navigate("/credits");
        }

        const newEntry = {
            chapter: storyState.chapter,
            scene: storyState.scene,
            step: storyState.step,
            choice: false,
          };

         setStoryState((prev) => ({
          ...prev,
          chapter: nextChapter,
          scene: nextScene,
          step: 0,
          history: [...prev.history, newEntry]
        }));
      }
      break;

    default:
      console.warn("Unbekannter Step-Type:", currentStep.type);
  }
}
