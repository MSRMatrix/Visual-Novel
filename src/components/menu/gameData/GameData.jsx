import "./gameData.css";

import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFloppyDisk,
  faTrashCan,
  faCloud,
  faFaceMeh
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { saveData } from "../../functions/saveData";
import { loadData } from "../../functions/loadData";
import { deleteData } from "../../functions/deleteData";
import { formatTime } from "../../functions/formatTime";

import { LoadingOverlay, SoundContext } from "../../../context/AppProviders";
import { useFocusMode, useKeyControl } from "../../modes/useMode";

function GameData({
  mode,
  setMode,
  action,
  setAction,
  currentStep,
  storyState,
  setStoryState,
  setTextState,
  uiState,
  setUiState,
}) {
  
  library.add(faFloppyDisk, faTrashCan, faCloud, faFaceMeh);

  const { sounds, setSounds } = useContext(SoundContext);
   const { loadingOverlay, setLoadingOverlay } = useContext(LoadingOverlay);

  const navigate = useNavigate();
  const [saves, setSaves] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("vn_saves")) || [];
    return stored.length
      ? stored
      : [
          { name: "Speicherplatz 1" },
          { name: "Speicherplatz 2" },
          { name: "Speicherplatz 3" },
          { name: "Speicherplatz 4" },
          { name: "Speicherplatz 5" },
        ];
  });

  function actionFunction(slotName) {
    switch (mode) {
      case "save":
        return saveData(slotName, saves, setSaves, storyState);
      case "delete":
        return deleteData(slotName, saves, setSaves);
      case "load":
        loadData(
          slotName,
          setMode,
          navigate,
          setSounds,
          setStoryState,
          setTextState,
          uiState,
          setUiState
        );
        setLoadingOverlay((prev) => ({...prev, loader: true}))
        return;
      default:
        console.warn(`Unbekannter Modus: ${mode}`);
        break;
    }
  }

  const focusableRef = useRef([]);

  const effectdeps = [
    uiState.focusedIndex,
    uiState.quickMenu,
    action,
    currentStep.type === "choice",
    currentStep.type === "game",
  ];
  const ifDeps = action === "save" || action === "load" || action === "delete";

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
  useFocusMode({ focusableRef, currentStep, uiState, effectdeps, ifDeps });
  // Fokus setzen

  return (
    <div className="game-data">
      {saves.map((item, idx) => (
          <button 
          disabled={action !== "save" && !item.timestamp}
          className="gameData"
          tabIndex={0}
          ref={(el) => (focusableRef.current[0 + idx] = el)}
          onClick={() => actionFunction(item.name)}
          key={item.name}
          >
            <h2
              style={{
                color:
                  !item.timestamp && action !== "save" ? "transparent" : "",
              }}
            >
              {item.name}
            </h2>
            <p>{item.timestamp ? `Gespeichert am: ${item.timestamp}` : ""}</p>
            <p>{item.chapter ? `Kapitel: ${item.chapter}` : ""}</p>
            <p>{item.scene ? `Szene im Kapitel: ${item.scene}` : ""}</p>
            <p>
              {item.step >= 0 ? `Punkt in der Szene: ${item.step + 1}` : ""}
            </p>
            <p>
              {isNaN(item.playTime)
                ? ""
                : `Spielzeit: ${formatTime(item.playTime)}`}
            </p>
            <FontAwesomeIcon
            
            style={{
                display:
                  !item.timestamp && action !== "block" ? "none" : "",
              }}
              icon={
                mode === "save"
                  ? "floppy-disk"
                  : mode === "delete"
                  ? "trash-can"
                  : mode === "load"
                  ? "cloud"
                  : "face-meh"
              }
            />
          </button>
            
      ))}
      <button
        ref={(el) => (focusableRef.current[5] = el)}
        onClick={() => setAction("")}
      >
        Zurück
      </button>
    </div>
  );
}

export default GameData;
