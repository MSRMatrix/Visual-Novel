import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveData } from "../../functions/saveData";
import { loadData } from "../../functions/loadData";
import { deleteData } from "../../functions/deleteData";
import { formatTime } from "../../functions/formatTime";
import { SoundContext } from "../../../context/SoundContext";

function GameData({
  currentChapter,
  currentScene,
  stepIndex,
  chatHistory,
  mode,
  setCurrentChapter,
  setCurrentScene,
  setStepIndex,
  setChatHistory,
  setMode,
  quickMenu,
  setQuickMenu,
  playTime,
  setPlayTime,
  setDisplayText,
  setPausedText,
  showChoices,
setShowChoices
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
          currentChapter,
          currentScene,
          stepIndex,
          chatHistory,
          setSaves,
          playTime,
          showChoices,
        );
      case "delete":
        return deleteData(slotName, saves, setSaves);
      case "load":
        loadData(
          slotName,
          setCurrentChapter,
          setCurrentScene,
          setStepIndex,
          setChatHistory,
          setMode,
          setQuickMenu,
          navigate,
          quickMenu,
          setPlayTime,
          setSounds,
          setDisplayText,
          setPausedText,
          setShowChoices
        );
        return;
      default:
        console.warn(`Unbekannter Modus: ${mode}`);
        break;
    }
  }

  return (
    <>
      {saves.map((item, key) => (
        <div key={key} onClick={() => actionFunction(item.name)}>
          <h2>{item.name}</h2>
          <p>{item.timestamp ? `Gespeichert am: ${item.timestamp}` : ""}</p>
          <p>{item.currentChapter ? `Kapitel: ${item.currentChapter}` : ""}</p>
          <p>
            {item.currentScene ? `Szene im Kapitel: ${item.currentScene}` : ""}
          </p>
          <p>
            {item.stepIndex >= 0
              ? `Punkt in der Szene: ${item.stepIndex + 1}`
              : ""}
          </p>
          <p>
            {isNaN(item.playTime)
              ? ""
              : `Spielzeit: ${formatTime(item.playTime)}`}
          </p>
        </div>
      ))}
    </>
  );
}

export default GameData;
