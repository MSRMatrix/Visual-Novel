import { useContext, useEffect, useState } from "react";
import { story } from "./data/story";
import { useNavigate } from "react-router-dom";
import "./dialogueBox.css";
import Menu from "../menu/Menu";
import { nextStep } from "../functions/nextStep";
import DialogueAction from "./dialogueAction/DialogueAction";
import { choose } from "../functions/choose";
import { LoadContext } from "../../context/LoadContext";

export default function VisualNovel({ hide, setHide }) {
  
  const navigate = useNavigate();
  const {load, setLoad} = useContext(LoadContext)

  const [currentChapter, setCurrentChapter] = useState(load.currentChapter || "prolog");
  const [currentScene, setCurrentScene] = useState(load.currentScene || "intro");
  const [stepIndex, setStepIndex] = useState(load.stepIndex || 0);
  const [chatHistory, setChatHistory] = useState(load.chatHistory || []);
  const [playTime, setPlayTime] = useState(load.playtime || 0);

  const [showChoices, setShowChoices] = useState(false);
  const [auto, setAuto] = useState(false);
  const [autoTime, setAutoTime] = useState(5000);
  const [quickMenu, setQuickMenu] = useState(false);
  const [skip, setSkip] = useState(false)
  
  const scene = story[currentChapter][currentScene];

  const steps = scene.steps;
  const currentStep = steps[stepIndex];

  // 🔹 Auto-Modus
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

// 🔹 Skip-Modus
useEffect(() => {
  if (!skip || showChoices) return;

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
  }, 80); // superschnell

  return () => clearInterval(interval);
}, [skip, showChoices, stepIndex]);

const [isPaused, setIsPaused] = useState(false);

useEffect(() => {
  if (isPaused) return;

  const interval = setInterval(() => {
    setPlayTime((prev) => prev + 1);
  }, 1000);

  return () => clearInterval(interval);
}, [isPaused]);

  return (
    <div style={{ display: hide ? "none" : "block" }}>
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
                      choose(
                        choice.next.chapter,
                        choice.next.scene,
                        setChatHistory,
                        currentChapter,
                        currentScene,
                        stepIndex,
                        setCurrentChapter,
                        setCurrentScene,
                        setStepIndex,
                        setShowChoices
                      )
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
              chatHistory={chatHistory}
              hide={hide}
              setHide={setHide}
              skip={skip}
              setSkip={setSkip}
              setIsPaused={setIsPaused}
            />
          </>
        </div>
      ) : (
        <Menu
          setQuickMenu={setQuickMenu}
          currentChapter={currentChapter}
          currentScene={currentScene}
          stepIndex={stepIndex}
          chatHistory={chatHistory}
          setCurrentChapter={setCurrentChapter}
          setCurrentScene={setCurrentScene}
          setStepIndex={setStepIndex}
          setChatHistory={setChatHistory}
          quickMenu={quickMenu}
          playTime={playTime}
          setPlayTime={setPlayTime}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
        />
      )}
    </div>
  );
}
