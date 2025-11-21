import { useContext, useEffect, useRef, useState } from "react";
import { story } from "./data/story";
import { useNavigate } from "react-router-dom";
import "./dialogueBox.css";
import Menu from "../menu/Menu";
import { nextStep } from "../functions/nextStep";
import DialogueAction from "./dialogueAction/DialogueAction";
import { LoadContext } from "../../context/LoadContext";
import useSound from "use-sound";
import { SoundContext } from "../../context/SoundContext";
import { WriteContext } from "../../context/WriteContext";
import { handleKeyDown } from "../functions/handleKeyDown";
import Games from "../games/Games";

export default function VisualNovel({ hide, setHide }) {
  const navigate = useNavigate();
  const { load, setLoad } = useContext(LoadContext);
  const { sounds, setSounds } = useContext(SoundContext);
  const { writeSpeed, setWriteSpeed } = useContext(WriteContext);
  const [play, { stop, sound }] = useSound(sounds.typing, {
    volume: sounds.textVolume,
    loop: true,
  });

const [storyState, setStoryState] = useState(() => ({
  chapter: load.currentChapter || "prolog",
  scene: load.currentScene || "intro",
  step: load.stepIndex ?? 0,
  history: load.chatHistory || [],
  playTime: load.playTime || 0
}));




  const [currentChapter, setCurrentChapter] = useState(
    load.currentChapter || "prolog"
  );
  const [currentScene, setCurrentScene] = useState(
    load.currentScene || "intro"
  );

  const [stepIndex, setStepIndex] = useState(load.stepIndex || 0);

  const [chatHistory, setChatHistory] = useState(load.chatHistory || []);

  const [playTime, setPlayTime] = useState(load.playTime || 0);
  
  const [auto, setAuto] = useState(false);
  const [autoTime, setAutoTime] = useState(5000);
  const [quickMenu, setQuickMenu] = useState(false);
  const [skip, setSkip] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [textFinished, setTextFinished] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pausedText, setPausedText] = useState("");
  const [gamePaused, setGamePaused] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const scene = story[currentChapter][currentScene];

  const steps = scene.steps;
  const currentStep = steps[stepIndex];
  

  useEffect(() => {
    setStartIndex(
      currentStep.type === "choice" || currentStep.mode === "number"
        ? 2
        : currentStep.mode === "memorie"
        ? 11
        : gamePaused
        ? null
        : 0
    );
  }, [currentStep.type === "choice" , currentStep.type === "game" , gamePaused]);

  useEffect(() => {
    setGamePaused(false);
  }, [currentStep.type === "choice" , currentStep.type === "game" ]);

  // 🔹 Skip-Modus
  useEffect(() => {
    if (!skip || currentStep.type === "choice" || currentStep.type === "game" || quickMenu) return;
    const interval = setInterval(() => {
      nextStep(
        scene,
        stepIndex,
        setStepIndex,
        currentChapter,
        navigate,
        setChatHistory,
        currentScene,
        setCurrentChapter,
        setCurrentScene,
      );
    }, 80);

    return () => clearInterval(interval);
  }, [skip, stepIndex, quickMenu, currentStep, chatHistory, currentStep.type === "choice" , currentStep.type === "game" ]);

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
    if (!currentStep?.text || currentStep.type === "choice" || currentStep.type === "game" || quickMenu) return;

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
  }, [currentStep?.text, currentStep.type === "choice" , currentStep.type === "game", quickMenu, skip]);
  // Typewriter Modus

  // Schreib-Soundtrack
  useEffect(() => {
    if (!currentStep?.text || currentStep.type === "choice" || currentStep.type === "game" || skip) return;

    if (textFinished || quickMenu) {
      stop();
    } else {
      play();
    }

    return () => stop();
  }, [currentStep?.text, textFinished, quickMenu, currentStep.type === "choice" , currentStep.type === "game"]);
  // Schreib-Soundtrack

  // Auto-Modus
  useEffect(() => {
    if (!auto || currentStep.type === "choice" || currentStep.type === "game"|| !textFinished || quickMenu) return;
    const interval = setInterval(() => {
      nextStep(
        scene,
        stepIndex,
        setStepIndex,
        currentChapter,
        navigate,
        setChatHistory,
        currentScene,
        setCurrentChapter,
        setCurrentScene,
      );
    }, autoTime);

    return () => clearInterval(interval);
  }, [auto, autoTime, currentStep.type === "choice" , currentStep.type === "game", stepIndex, textFinished, quickMenu]);
  // Auto-Modus

  const focusableRef = useRef([]);

  const [focusedIndex, setFocusedIndex] = useState(0);
  // Tastaturnavigation
  useEffect(() => {
    if (!quickMenu) {
      const listener = (e) =>
        handleKeyDown(
          e,
          focusableRef,
          focusedIndex,
          setFocusedIndex,
          false,
          gamePaused,
          setGamePaused,currentStep
        );
      window.addEventListener("keydown", listener);
      return () => window.removeEventListener("keydown", listener);
    }
  }, [focusedIndex,currentStep.type === "choice" , currentStep.type === "game", quickMenu, gamePaused]);

  // Fokus setzen
  useEffect(() => {
    if (!quickMenu) {
      if (focusableRef.current[focusedIndex]) {
        focusableRef.current[focusedIndex].focus();
      }
    }
  }, [focusedIndex, currentStep.type === "choice" , currentStep.type === "game", quickMenu]);
  

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
            {currentStep?.type === "text" ? (
              <div>
                {" "}
                <p className="font-bold">{currentStep.speaker || ""}</p>{" "}
                <p className="mt-2">{displayText || ""}</p>{" "}
              </div>
            ) : (
              ""
            )}

            {currentStep?.type === "choice" && (
              <div className="choices mt-4 flex flex-col gap-2">
                {currentStep.options.map((choice, idx) => (
                  <button
                   ref={gamePaused ? null : (el) => (focusableRef.current[idx] = el)}

                    key={idx}
                    onClick={() => {
                      // Chat-History speichern
                      setChatHistory((prev) => [
                        ...prev,
                        {
                          chapter: currentChapter,
                          scene: currentScene,
                          step: stepIndex,
                          choice: choice.text,
                        },
                      ]);

                      // Zum nächsten Step springen
                      setCurrentChapter(choice.next.chapter);
                      setCurrentScene(choice.next.scene);
                      setStepIndex(0);
                      setFocusedIndex(0);
                    }}
                    className="bg-blue-600 p-2 rounded hover:bg-blue-500"
                  >
                    {choice.text}
                  </button>
                ))}
              </div>
            )}

            {currentStep?.type === "game" ? (
              <Games
                stepIndex={stepIndex}
                setStepIndex={setStepIndex}
                currentChapter={currentChapter}
                setChatHistory={setChatHistory}
                currentScene={currentScene}
                setCurrentChapter={setCurrentChapter}
                setCurrentScene={setCurrentScene}
                setFocusedIndex={setFocusedIndex}
                focusableRef={focusableRef}
                gamePaused={gamePaused}
                currentStep={currentStep}
              />
            ) : (
              ""
            )}

            <DialogueAction
              scene={scene}
              stepIndex={stepIndex}
              setStepIndex={setStepIndex}
              currentChapter={currentChapter}
              navigate={navigate}
              setChatHistory={setChatHistory}
              currentScene={currentScene}
              setCurrentChapter={setCurrentChapter}
              setCurrentScene={setCurrentScene}
              setAuto={setAuto}
              setQuickMenu={setQuickMenu}
              auto={auto}
              chatHistory={chatHistory}
              hide={hide}
              setHide={setHide}
              skip={skip}
              setSkip={setSkip}
              setIsPaused={setIsPaused}
              focusableRef={focusableRef}
              startIndex={startIndex}
              setFocusedIndex={setFocusedIndex}
              currentStep={currentStep}
              setGamePaused={setGamePaused}
              gamePaused={gamePaused}
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
          currentStep={currentStep}
        />
      )}
    </div>
  );
}
