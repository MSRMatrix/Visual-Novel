export function buildBacklog(
  chatHistory,
  story,
  currentChapter,
  currentScene,
  stepIndex
) {
  const backlogSteps = [];

  chatHistory.forEach((entry) => {
    const { chapter, scene, choice, answer, mode } = entry;

    const sceneData = story?.[chapter]?.[scene];
    
    sceneData.steps.forEach((step) => {
      if (step.type !== "choice" && step.type !== "game") {
        backlogSteps.push(step);
      }
    });

    if (choice) {
      backlogSteps.push({
        speaker: "Spieler",
        text: choice,
      });
    }


    if (mode === "number" && answer !== undefined) {
      backlogSteps.push({
        speaker: "Spieler",
        text: answer,
      });
    }
  });

  const currentSceneData = story?.[currentChapter]?.[currentScene];
  if (currentSceneData) {
    currentSceneData.steps.slice(0, stepIndex + 1).forEach((step) => {
      if (step.type !== "choice" && step.type !== "game") {
        backlogSteps.push(step);
      }
    });
  }
console.log(backlogSteps);

  return backlogSteps;
}
