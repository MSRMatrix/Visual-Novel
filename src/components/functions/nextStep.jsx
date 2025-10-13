 export function nextStep(scene, stepIndex, setStepIndex, setShowChoices, currentChapter, navigate, setHistory, currentScene, setCurrentChapter, setCurrentScene){
    const steps = scene.steps;

    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      // Steps vorbei
      if (scene.choices) {
        setShowChoices(true);
      } else if (scene.next) {
        // Kapitel/Szenenwechsel
        const nextChapter = scene.next.chapter || currentChapter;
        const nextScene = scene.next.scene || scene.next;
        if (nextChapter === "exit" && nextScene === "close") {
          return navigate("/credits");
        }
setHistory((prev) => [
  ...prev,
  { chapter: currentChapter, scene: currentScene, step: stepIndex },
]);
        setCurrentChapter(nextChapter);
        setCurrentScene(nextScene);
        setStepIndex(0);
        setShowChoices(false);
      } else {
        console.log("Ende der Story");
      }
    }
  }