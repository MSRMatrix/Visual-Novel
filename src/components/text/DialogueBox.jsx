import { useState } from "react";
import { story } from "./data/story";
import { useNavigate } from "react-router-dom";
import "./dialogueBox.css";

export default function VisualNovel() {
  //   const [save, setSave] = useState({
  //     currentChapter: null,
  //     currentScene: null,
  //     stepIndex: null,
  //     showChoices: false
  //   });
  const navigate = useNavigate();
  const [currentChapter, setCurrentChapter] = useState("prolog");
  const [currentScene, setCurrentScene] = useState("intro");
  const [stepIndex, setStepIndex] = useState(0);
  const [showChoices, setShowChoices] = useState(false);

  const [history, setHistory] = useState([]);
  const scene = story[currentChapter][currentScene];

  const steps = scene.steps;
  const currentStep = steps[stepIndex];

  const nextStep = () => {
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
        console.log(scene);
        
        if (nextChapter === "exit" && nextScene === "close") {
          return navigate("/credits");
        }

        setCurrentChapter(nextChapter);
        setCurrentScene(nextScene);
        setStepIndex(0);
        setShowChoices(false);
      } else {
        console.log("Ende der Story");
      }
    }
  };

  const stepBack = () => {
    const steps = scene.steps;

    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
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

        setCurrentChapter(nextChapter);
        setCurrentScene(nextScene);
        setStepIndex(0);
        setShowChoices(false);
      } else {
        console.log("Ende der Story");
      }
    }
  };

  const choose = (chapter, scene) => {
    setCurrentChapter(chapter);
    setCurrentScene(scene);
    setStepIndex(0);
    setShowChoices(false);
  };
  return (
    <div className="dialogue-box p-4 bg-gray-800 text-white rounded">
      <div>
        <p>
          {scene.id.toUpperCase().slice(0, 1) + scene.id.toLowerCase().slice(1)}
        </p>
      </div>

      <>
       
        {!showChoices ? <div> <p className="font-bold">{currentStep.speaker}</p> <p className="mt-2">{currentStep.text}</p> </div> : ""}

        {showChoices && (
          <div className="choices mt-4 flex flex-col gap-2">
            {scene.choices.map((choice, idx) => (
              <button
                key={idx}
                onClick={() => choose(choice.next.chapter, choice.next.scene)}
                className="bg-blue-600 p-2 rounded hover:bg-blue-500"
              >
                {choice.text}
              </button>
            ))}
          </div>
        )}

        <div>
          <button
            onClick={nextStep}
            className="window-action"
            disabled={showChoices}
          >
            Weiter ▶
          </button>
          <button className="window-action">Menu</button>
          <button className="window-action">Auto</button>
          <button className="window-action">Skip</button>
          <button
            onClick={stepBack}
            className="window-action"
            disabled={stepIndex <= 0 && scene.id === "intro"}
          >
            Zurück
          </button>
          <button className="window-action">Hide</button>
        </div>
      </>
    </div>
  );
}
