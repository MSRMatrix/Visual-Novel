import { story } from "../../text/data/story";

function Backlog({ currentChapter, currentScene, stepIndex, chatHistory }) {

  function buildBacklog() {
    const backlogSteps = [];

    chatHistory.forEach(entry => {
      const { chapter, scene } = entry;
      const sceneData = story?.[chapter]?.[scene];
      if (sceneData) {
        backlogSteps.push(...sceneData.steps);
      }
    });

    const currentSceneData = story?.[currentChapter]?.[currentScene];
    if (currentSceneData) {
      backlogSteps.push(...currentSceneData.steps.slice(0, stepIndex + 1));
    }

    return backlogSteps;
  }

  const steps = buildBacklog();

  return (
    <>
      <h2>Backlog</h2>
      <ul>
        {steps.map((step, i) => (
          <li key={i}>
            <strong>{step.speaker}:</strong> {step.text}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Backlog;
