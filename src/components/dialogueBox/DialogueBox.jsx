import "./dialogueBox.css";

import { useContext, useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import { LoadingOverlay, PictureContext, SoundContext, WriteContext } from "../../context/AppProviders";
import styled from "styled-components";

import { useAutoMode, useBreakMode, useFocusMode, useIndexMode, useKeyControl, useSkipMode, useTypeWriterMode, useWriteSoundMode } from "../modes/useMode";

import { story } from "../text/data/story";
import { pictures } from "../pictures/pictures";

import Menu from "../menu/Menu";
import DialogueAction from "./dialogueAction/DialogueAction";
import Games from "../games/Games";
import Choice from "./choice/Choice";


export default function VisualNovel({ hide, setHide, storyState, setStoryState }) {
  const focusableRef = useRef([]);

  const { sounds, setSounds } = useContext(SoundContext);
  const { writeSpeed, setWriteSpeed } = useContext(WriteContext);
  const { loadingOverlay, setLoadingOverlay } = useContext(LoadingOverlay);
  const {pictureContext, setPictureContext} = useContext(PictureContext)

  const [play, { stop, sound }] = useSound(sounds.typing, {
    volume: sounds.textVolume,
    loop: true,
  });

  const [textState, setTextState] = useState(() => ({
    displayText: "",
    textFinished: false,
    isPaused: false,
    pausedText: "",
  }));

  const [autoState, setAutoState] = useState({
    auto: false,
    autoTime: 5000,
    skip: false,
  });

  const [uiState, setUiState] = useState({
    focusedIndex: 0,
    quickMenu: false,
    gamePaused: false,
    startIndex: 0,
  });

  const scene = story[storyState.chapter][storyState.scene];
  const steps = scene.steps;
  const currentStep = steps[storyState.step];

  // Index-Rechner
  useIndexMode({ currentStep, setUiState, uiState });
  // Index-Rechner

  // Esc
  useEffect(() => {
    setUiState((prev) => ({ ...prev, gamePaused: false }));
  }, [currentStep.type]);
  // Esc

  // 🔹 Skip-Modus
  useSkipMode({
    currentStep,
    scene,
    storyState,
    setStoryState,
    autoState,
    uiState,
  });
  // 🔹 Skip-Modus

  // Pausen Modus
  useBreakMode({ setStoryState, textState, uiState });
  useEffect(() => {
    if (uiState.quickMenu) {
      setTextState((prev) => ({
        ...prev,
        pausedText: textState.displayText,
      }));
    }
  }, [uiState.quickMenu]);
  // Pausen Modus

  // Typewriter Modus
  useTypeWriterMode({
    currentStep,
    writeSpeed,
    setTextState,
    textState,
    autoState,
    uiState,
  });
  // Typewriter Modus

  // Schreib-Soundtrack
  useWriteSoundMode({
    currentStep,
    stop,
    play,
    textState,
    autoState,
    uiState,
  });
  // Schreib-Soundtrack

  // Auto-Modus
  useAutoMode({
    currentStep,
    scene,
    storyState,
    setStoryState,
    textState,
    autoState,
    uiState,
  });
  // Auto-Modus

  const effectdeps = [
    uiState.focusedIndex,
    currentStep.type === "choice",
    currentStep.type === "game",
    uiState.quickMenu,
    uiState.gamePaused,
  ];
  const ifDeps = !uiState.quickMenu;

  // Tastaturnavigation
  useKeyControl({
    focusableRef,
    currentStep,
    uiState,
    setUiState,
    effectdeps,
    ifDeps,
  });
  // Tastaturnavigation

  // Fokus setzen
  useFocusMode({ focusableRef, uiState, effectdeps, ifDeps });
  // Fokus setzen


  // Height muss sich dem Reactplayer anpassen
  // Height muss sich dem Reactplayer anpassen

  // Function für die Bilder
useEffect(() => {
  if (!currentStep.pic) return;

  Object.entries(currentStep.pic).forEach(([type, value]) => {
    if (!value) return;

    const img = pictures[type]?.[value];
    if (!img) return;

    setPictureContext(prev => ({
      ...prev,
      [type]: img
    }));
  });
}, [currentStep.pic]);

console.log(pictureContext);



  // Function für die Bilder

  return (
    <>
    <div className={`dialog-box${uiState.quickMenu ? "-hide" : ""}`} style={{ display: hide ? "none" : "block"}}>
      {!uiState.quickMenu ? (
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
                <p className="mt-2">{textState.displayText || ""}</p>{" "}
              </div>
            ) : (
              ""
            )}

            <Choice
              currentStep={currentStep}
              focusableRef={focusableRef}
              storyState={storyState}
              setStoryState={setStoryState}
              setUiState={setUiState}
              uiState={uiState}
            />

            {currentStep?.type === "game" ? (
              <Games
                focusableRef={focusableRef}
                currentStep={currentStep}
                storyState={storyState}
                setStoryState={setStoryState}
                setUiState={setUiState}
                uiState={uiState}
              />
            ) : (
              ""
            )}

            <DialogueAction
              scene={scene}
              hide={hide}
              setHide={setHide}
              focusableRef={focusableRef}
              currentStep={currentStep}
              storyState={storyState}
              setStoryState={setStoryState}
              setTextState={setTextState}
              autoState={autoState}
              setAutoState={setAutoState}
              uiState={uiState}
              setUiState={setUiState}
            />
          </>
        </div>
      ) : (
        <Menu
          currentStep={currentStep}
          storyState={storyState}
          setStoryState={setStoryState}
          textState={textState}
          setTextState={setTextState}
          uiState={uiState}
          setUiState={setUiState}
        />
      )}
    </div>
    </>
    
  );
}
