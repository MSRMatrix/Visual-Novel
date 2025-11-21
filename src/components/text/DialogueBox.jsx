import { useContext, useEffect, useRef, useState } from "react";
import { story } from "./data/story";
import { useNavigate } from "react-router-dom";
import "./dialogueBox.css";
import Menu from "../menu/Menu";
import DialogueAction from "./dialogueAction/DialogueAction";
import { LoadContext } from "../../context/LoadContext";
import useSound from "use-sound";
import { SoundContext } from "../../context/SoundContext";
import { WriteContext } from "../../context/WriteContext";
import { handleKeyDown } from "../functions/handleKeyDown";
import Games from "../games/Games";
import { useSkipMode } from "./modes/useSkipMode";
import { useBreakMode } from "./modes/useBreakMode";
import { useTypeWriterMode } from "./modes/useTypeWriterMode";
import { useWriteSoundMode } from "./modes/useWriteSoundMode";
import { useAutoMode } from "./modes/useAutoMode";
import { useFocusMode, useKeyControl } from "./modes/useControl";

export default function VisualNovel({ hide, setHide }) {
  const focusableRef = useRef([]);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const navigate = useNavigate();

  const { load, setLoad } = useContext(LoadContext);
  const { sounds, setSounds } = useContext(SoundContext);
  const { writeSpeed, setWriteSpeed } = useContext(WriteContext);
  const [play, { stop, sound }] = useSound(sounds.typing, {
    volume: sounds.textVolume,
    loop: true,
  });

  const [storyState, setStoryState] = useState(() => ({
    chapter: load.chapter || "prolog",
    scene: load.scene || "intro",
    step: load.step ?? 0,
    history: load.history || [],
    playTime: load.playTime || 0,
  }));

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

  const scene = story[storyState.chapter][storyState.scene];

  const steps = scene.steps;
  const currentStep = steps[storyState.step];

 useEffect(() => {
  if (gamePaused) {
    setStartIndex(null);
    return;
  }

  if (currentStep.type === "choice") {
    setStartIndex(2);
  } else if (currentStep.mode === "number") {
    setStartIndex(2);
  } else if (currentStep.mode === "memorie") {
    setStartIndex(11);
  } else {
    setStartIndex(0);
  }
}, [currentStep.type, currentStep.mode, gamePaused]);


useEffect(() => {
  setGamePaused(false);
}, [currentStep.type]);


  // 🔹 Skip-Modus
useSkipMode({ skip, currentStep, quickMenu, scene, navigate, storyState, setStoryState });
// 🔹 Skip-Modus
  
  // Pausen Modus
  useBreakMode({isPaused, quickMenu, setStoryState})

  useEffect(() => {
    if (quickMenu) {
      setPausedText(displayText);
    }
  }, [quickMenu]);
  // Pausen Modus

  // Typewriter Modus
  useTypeWriterMode({currentStep, quickMenu, setDisplayText, setTextFinished, setPausedText, pausedText, writeSpeed, skip})
  // Typewriter Modus

  // Schreib-Soundtrack
  useWriteSoundMode({currentStep, skip, textFinished, quickMenu, stop, play})
  // Schreib-Soundtrack

  // Auto-Modus
  useAutoMode({auto, currentStep, textFinished, quickMenu, scene, navigate, storyState, setStoryState, autoTime})
  // Auto-Modus

  

  // Tastaturnavigation
  useKeyControl({quickMenu,focusableRef,focusedIndex,setFocusedIndex,gamePaused,setGamePaused,currentStep,})
  // Tastaturnavigation

  // Fokus setzen
  useFocusMode({quickMenu, focusableRef, focusedIndex, currentStep})
  // Fokus setzen

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
                    ref={
                      gamePaused
                        ? null
                        : (el) => (focusableRef.current[idx] = el)
                    }
                    key={idx}
                    onClick={() => {
                      // Chat-History speichern
                      const newEntry = {
                        chapter: storyState.chapter,
                        scene: storyState.scene,
                        step: storyState.step,
                        choice: choice.text,
                      };

                      setStoryState((prev) => ({
                        ...prev,
                        chapter: choice.next.chapter,
                        scene: choice.next.scene,
                        step: 0,
                        history: [...prev.history, newEntry],
                      }));

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
                setFocusedIndex={setFocusedIndex}
                focusableRef={focusableRef}
                gamePaused={gamePaused}
                currentStep={currentStep}
                storyState={storyState}
                setStoryState={setStoryState}
              />
            ) : (
              ""
            )}

            <DialogueAction
              scene={scene}
              navigate={navigate}
              setAuto={setAuto}
              setQuickMenu={setQuickMenu}
              auto={auto}
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
              storyState={storyState}
              setStoryState={setStoryState}
            />
          </>
        </div>
      ) : (
        <Menu
          setQuickMenu={setQuickMenu}
          quickMenu={quickMenu}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
          setDisplayText={setDisplayText}
          setPausedText={setPausedText}
          currentStep={currentStep}
          storyState={storyState}
          setStoryState={setStoryState}
        />
      )}
    </div>
  );
}
