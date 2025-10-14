export function choose(
  chapter,
  scene,
  setChatHistory,
  currentChapter,
  currentScene,
  stepIndex,
  setCurrentChapter,
  setCurrentScene,
  setStepIndex,
  setShowChoices
) {
  // 💾 Aktuellen Zustand merken
  setChatHistory((prev) => [
    ...prev,
    {
      chapter: currentChapter,
      scene: currentScene,
      step: stepIndex,
      choice: true,
    },
  ]);

  // Dann zur neuen Szene springen
  setCurrentChapter(chapter);
  setCurrentScene(scene);
  setStepIndex(0);
  setShowChoices(false);
}
