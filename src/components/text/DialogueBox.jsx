import { useEffect, useState } from "react";
import { story } from "./data/story";
import { useNavigate } from "react-router-dom";
import "./dialogueBox.css";
import Menu from "../menu/Menu";
import { nextStep } from "../functions/nextStep";
import { stepBack } from "../functions/stepBack";
import DialogueAction from "./dialogueAction/DialogueAction";

export default function VisualNovel() {
  const [load, setLoad] = useState({
    currentChapter: "",
    currentScene: "",
    stepIndex: "",
    history: "",
  });

  const [currentChapter, setCurrentChapter] = useState(
    load.currentChapter || "prolog"
  );
  const [currentScene, setCurrentScene] = useState(
    load.currentScene || "intro"
  );
  const [stepIndex, setStepIndex] = useState(load.stepIndex || 0);
  const [chatHistory, setChatHistory] = useState(load.history || []);

  const [showChoices, setShowChoices] = useState(false);
  const [auto, setAuto] = useState(false);
  const [autoTime, setAutoTime] = useState(5000);
  const [quickMenu, setQuickMenu] = useState(false);

  const navigate = useNavigate();
  const scene = story[currentChapter][currentScene];

  const steps = scene.steps;
  const currentStep = steps[stepIndex];

  const choose = (chapter, scene) => {
  // 💾 Aktuellen Zustand merken
  setChatHistory(prev => [
    ...prev,
    {
      chapter: currentChapter,
      scene: currentScene,
      step: stepIndex,
      choice: true
    },
  ]);

  // Dann zur neuen Szene springen
  setCurrentChapter(chapter);
  setCurrentScene(scene);
  setStepIndex(0);
  setShowChoices(false);
};


  useEffect(() => {
    if (!auto || showChoices) return;

    const interval = setInterval(() => {
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
        setCurrentScene
      );
    }, autoTime);

    return () => clearInterval(interval);
  }, [auto, autoTime, showChoices, stepIndex]);

console.log(chatHistory);

  return (
    <div>
      {!quickMenu ? (
        <div>
          <div>
            <p>
              {scene.id.toUpperCase().slice(0, 1) +
                scene.id.toLowerCase().slice(1)}
            </p>
          </div>

          <>
            {!showChoices ? (
              <div>
                {" "}
                <p className="font-bold">{currentStep.speaker}</p>{" "}
                <p className="mt-2">{currentStep.text}</p>{" "}
              </div>
            ) : (
              ""
            )}

            {showChoices && (
              <div className="choices mt-4 flex flex-col gap-2">
                {scene.choices.map((choice, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      choose(choice.next.chapter, choice.next.scene)
                    }
                    className="bg-blue-600 p-2 rounded hover:bg-blue-500"
                  >
                    {choice.text}
                  </button>
                ))}
              </div>
            )}

           <DialogueAction 
                    scene={scene}
                    stepIndex={stepIndex}
                    setStepIndex={setStepIndex}
                    setShowChoices={setShowChoices}
                    currentChapter={currentChapter}
                    navigate={navigate}
                    setChatHistory={setChatHistory}
                    currentScene={currentScene}
                    setCurrentChapter={setCurrentChapter}
                    setCurrentScene={setCurrentScene}
                    setAuto={setAuto} 
                    showChoices={showChoices} 
                    setQuickMenu={setQuickMenu}
                    auto={auto}
                    chatHistory={chatHistory}/>
          </>
        </div>
      ) : (
        <Menu
          setQuickMenu={setQuickMenu}
          currentChapter={currentChapter}
          currentScene={currentScene}
          stepIndex={stepIndex}
          chatHistory={chatHistory}
        />
      )}
    </div>
  );
}
