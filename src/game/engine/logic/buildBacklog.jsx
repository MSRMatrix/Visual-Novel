export function buildBacklog(
  story,
  storyState
) {
  const backlogSteps = [];

  storyState.history.forEach((entry) => {
    const { chapter, scene, choice, answer, mode, status } = entry;

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

    if (mode === "memorie") {
      backlogSteps.push({
        speaker: "Spieler",
        text: status ? "Ich habe gewonnen" : "Ich habe verloren",
      });
    }
  });

  const currentSceneData = story?.[storyState.chapter]?.[storyState.scene];
  if (currentSceneData) {
    currentSceneData.steps.slice(0, storyState.step + 1).forEach((step) => {
      if (step.type !== "choice" && step.type !== "game") {
        backlogSteps.push(step);
      }
    });
  }
  return backlogSteps;
}
