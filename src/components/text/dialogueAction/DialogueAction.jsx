import { nextStep } from "../../functions/nextStep";
import { stepBack } from "../../functions/stepBack";

const DialogueAction = ({
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
  setAuto,
  showChoices,
  setQuickMenu,
  auto,
  chatHistory
}) => {

    
  return (
    <div>
      <button
        onClick={() => {
          nextStep(
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
            chatHistory
          ),
            setAuto(false);
        }}
        className="window-action"
        disabled={showChoices}
      >
        Weiter ▶
      </button>
      <button className="window-action" onClick={() => setQuickMenu(true)}>
        Menu
      </button>
      <button
        className="window-action"
        onClick={() => setAuto((prevMode) => !prevMode)}
        style={{ background: auto ? "blue" : "" }}
        disabled={showChoices}
      >
        Auto
      </button>
      <button className="window-action">Skip</button>
      <button
        onClick={() => {
          stepBack(
            stepIndex,
            setStepIndex,
            setCurrentChapter,
            setCurrentScene,
            setChatHistory,
            chatHistory,
            setShowChoices,
            scene
          ),
            setAuto(false);
        }}
        className="window-action"
        disabled={!chatHistory}
      >
        Zurück
      </button>
      <button className="window-action">Hide</button>
    </div>
  );
};

export default DialogueAction;
