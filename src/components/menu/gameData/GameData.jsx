import { useContext, useEffect, useRef, useState } from "react";
import "./gameData.css";
import { useNavigate } from "react-router-dom";
import { saveData } from "../../functions/saveData";
import { loadData } from "../../functions/loadData";
import { deleteData } from "../../functions/deleteData";
import { formatTime } from "../../functions/formatTime";
import { SoundContext } from "../../../context/SoundContext";
import { handleKeyDown } from "../../functions/handleKeyDown";

function GameData({
  mode,
  setMode,
  quickMenu,
  setQuickMenu,
  setDisplayText,
  setPausedText,
  action,
  setAction, currentStep,
                storyState,
                setStoryState,
}) {
  const { sounds, setSounds } = useContext(SoundContext);
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
        return saveData(
          slotName,
          saves,
          setSaves,
          storyState
        );
      case "delete":
        return deleteData(slotName, saves, setSaves);
      case "load":
        loadData(
          slotName,
          setMode,
          setQuickMenu,
          navigate,
          quickMenu,
          setSounds,
          setDisplayText,
          setPausedText,
          setStoryState
        );
        return;
      default:
        console.warn(`Unbekannter Modus: ${mode}`);
        break;
    }
  }

  const focusableRef = useRef([]);

  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    if (action === "save" || action === "load" || action === "delete") {
      const listener = (e) =>
        handleKeyDown(e, focusableRef, focusedIndex, setFocusedIndex);
      window.addEventListener("keydown", listener);
      return () => window.removeEventListener("keydown", listener);
    }
  }, [focusedIndex, quickMenu, action, currentStep.type === "choice" , currentStep.type === "game",]);

  // Fokus setzen
  useEffect(() => {
    if (action === "save" || action === "load" || action === "delete") {
      if (focusableRef.current[focusedIndex]) {
        focusableRef.current[focusedIndex].focus();
      }
    }
  }, [focusedIndex, quickMenu, action, currentStep.type === "choice" , currentStep.type === "game",]);

  return (
    <>
      {saves.map((item, idx) => (
        <button
          disabled={action !== "save" && !item.timestamp}
          className="gameData"
          tabIndex={0}
          ref={(el) => (focusableRef.current[0 + idx] = el)}
          key={item.name}
          onClick={() => actionFunction(item.name)}
        >
          <h2>{item.name}</h2>
          <p>{item.timestamp ? `Gespeichert am: ${item.timestamp}` : ""}</p>
          <p>{item.chapter ? `Kapitel: ${item.chapter}` : ""}</p>
          <p>
            {item.scene ? `Szene im Kapitel: ${item.scene}` : ""}
          </p>
          <p>
            {item.step >= 0
              ? `Punkt in der Szene: ${item.step + 1}`
              : ""}
          </p>
          <p>
            {isNaN(item.playTime)
              ? ""
              : `Spielzeit: ${formatTime(item.playTime)}`}
          </p>
        </button>
      ))}
      <button
        ref={(el) => (focusableRef.current[5] = el)}
        onClick={() => setAction("")}
      >
        Zurück
      </button>
    </>
  );
}

export default GameData;
