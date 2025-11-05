import { useContext, useEffect, useRef, useState } from "react";
import { story } from "./data/story";
import { useNavigate } from "react-router-dom";
import "./dialogueBox.css";
import Menu from "../menu/Menu";
import { nextStep } from "../functions/nextStep";
import DialogueAction from "./dialogueAction/DialogueAction";
import { choose } from "../functions/choose";
import { LoadContext } from "../../context/LoadContext";
import useSound from "use-sound";
import { SoundContext } from "../../context/SoundContext";
import { WriteContext } from "../../context/WriteContext";
import { handleKeyDown } from "../functions/handleKeyDown";

export default function VisualNovel({ hide, setHide }) {
  const navigate = useNavigate();
  const { load, setLoad } = useContext(LoadContext);
  const { sounds, setSounds } = useContext(SoundContext);
  const {writeSpeed, setWriteSpeed} = useContext(WriteContext)
  const [play, { stop, sound }] = useSound(sounds.typing, {
    volume: sounds.textVolume,
    loop: true,
  });

  const [currentChapter, setCurrentChapter] = useState(
    load.currentChapter || "prolog"
  );
  const [currentScene, setCurrentScene] = useState(
    load.currentScene || "intro"
  );
  const [stepIndex, setStepIndex] = useState(load.stepIndex || 0);
  const [chatHistory, setChatHistory] = useState(load.chatHistory || []);
  const [playTime, setPlayTime] = useState(load.playTime || 0);

  const [showChoices, setShowChoices] = useState(load.choice || false);
  const [auto, setAuto] = useState(false);
  const [autoTime, setAutoTime] = useState(5000);
  const [quickMenu, setQuickMenu] = useState(false);
  const [skip, setSkip] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [textFinished, setTextFinished] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pausedText, setPausedText] = useState("");
  const scene = story[currentChapter][currentScene];


  const steps = scene.steps;
  const currentStep = steps[stepIndex];

  // 🔹 Skip-Modus
  useEffect(() => {
    if (!skip || showChoices || quickMenu) return;

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
    }, 80);

    return () => clearInterval(interval);
  }, [skip, showChoices, stepIndex, quickMenu]);

  // Pausen Modus
  useEffect(() => {
    if (isPaused || quickMenu) return;

    const interval = setInterval(() => {
      setPlayTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, quickMenu]);

  useEffect(() => {
    if (quickMenu) {
      setPausedText(displayText);
    }
  }, [quickMenu]);
  // 🔹 Skip-Modus

  // Typewriter Modus
  useEffect(() => {
    if (!currentStep?.text || showChoices || quickMenu) return;

    setDisplayText("");
    setTextFinished(false);

    let i = pausedText.length;

    setDisplayText(pausedText + currentStep.text.charAt(i));
    setPausedText("");
    const interval = setInterval(() => {
      if (i < currentStep.text.length) {
        setDisplayText((prev) => prev + currentStep.text.charAt(i));
        i++;
      } else {
        clearInterval(interval);
        setTextFinished(true);
      }
    }, writeSpeed);

    return () => clearInterval(interval);
  }, [currentStep?.text, showChoices, quickMenu]);
  // Typewriter Modus

  // Schreib-Soundtrack
  useEffect(() => {
    if (!currentStep?.text || showChoices || skip) return;

    if (textFinished || quickMenu) {
      stop();
    } else {
      play();
    }

    return () => stop();
  }, [currentStep?.text, textFinished, quickMenu, showChoices]);
  // Schreib-Soundtrack

  // Auto-Modus
  useEffect(() => {
    if (!auto || showChoices || !textFinished || quickMenu) return;
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
  }, [auto, autoTime, showChoices, stepIndex, textFinished, quickMenu]);
  // Auto-Modus





    const focusableRef = useRef([]);

  const [focusedIndex, setFocusedIndex] = useState(0);
  // Tastaturnavigation
useEffect(() => {
  if(!quickMenu){
  const listener = (e) => handleKeyDown(e, focusableRef, focusedIndex, setFocusedIndex);
  window.addEventListener("keydown", listener);
  return () => window.removeEventListener("keydown", listener);
}
}, [focusedIndex, showChoices, quickMenu]);

  // Fokus setzen
  useEffect(() => {
     if(!quickMenu){
    if (focusableRef.current[focusedIndex]) {
      focusableRef.current[focusedIndex].focus();
    } 
     }
  }, [focusedIndex, showChoices, quickMenu]);


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
                <p className="font-bold">{currentStep.speaker || ""}</p>{" "}
                <p className="mt-2">{displayText || ""}</p>{" "}
              </div>
            ) : (
              ""
            )}

            {showChoices && (
              <div className="choices mt-4 flex flex-col gap-2">
                {scene && scene.choices
                  ? scene.choices.map((choice, idx) => (
                      <button    
                      ref={(el) => (focusableRef.current[0 + idx] = el)}
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
                            setShowChoices,
                            setFocusedIndex
                          )
                        }
                        className="bg-blue-600 p-2 rounded hover:bg-blue-500"
                      >
                        {choice.text}
                      </button>
                    ))
                  : ""}
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
              focusableRef={focusableRef}
              startIndex={showChoices ? 2 : 0}
              setFocusedIndex={setFocusedIndex}
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
          setDisplayText={setDisplayText}
          setPausedText={setPausedText}
          showChoices={showChoices}
          setShowChoices={setShowChoices}
        />
      )}
    </div>
  );
}
