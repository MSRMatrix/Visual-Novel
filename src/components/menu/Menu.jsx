import { useNavigate } from "react-router-dom";
import "./menu.css";
import { useState } from "react";
import Options from "../options/Options";
import GameData from "./save/GameData";

function Menu({
  setQuickMenu,
  currentChapter,
  currentScene,
  stepIndex,
  chatHistory,
  setCurrentChapter,
  setCurrentScene,
  setStepIndex,
  setChatHistory,
  quickMenu
}) {
  const navigate = useNavigate();

  const [action, setAction] = useState("");

  function mainMenu() {
    const backToMenu = confirm(
      "Alle ungespeicherten Fortschritte gehen verloren! Möchtest du wirklich das Spiel verlassen?"
    );
    if (backToMenu) {
      setAction("");
      return navigate("/");
    } else {
      return;
    }
  }

  return (
    <>
      <h1>Schnellmenü</h1>
      <button
        onClick={() => {
          setQuickMenu(false), setAction("");
        }}
      >
        Zurück zum Spiel
      </button>
      <button
        style={{ background: action === "save" ? "blue" : "" }}
        onClick={() => setAction("save")}
      >
        Speichern
      </button>
      <button
        style={{ background: action === "load" ? "green" : "" }}
        onClick={() => setAction("load")}
      >
        Laden
      </button>
      <button
        style={{ background: action === "delete" ? "red" : "" }}
        onClick={() => setAction("delete")}
      >
        Löschen
      </button>
      <button
        style={{ background: action === "option" ? "violet" : "" }}
        onClick={() => setAction("option")}
      >
        Optionen
      </button>
      {action === "save" || action === "load" || action === "delete" ? (
        <GameData
          currentChapter={currentChapter}
          currentScene={currentScene}
          stepIndex={stepIndex}
          chatHistory={chatHistory}
          mode={action}
          setCurrentChapter={setCurrentChapter}
setCurrentScene={setCurrentScene}
setStepIndex={setStepIndex}
setChatHistory={setChatHistory}
setMode={setAction}
quickMenu={quickMenu}
setQuickMenu={setQuickMenu}
        />
      ) : action === "option" ? (
        <Options />
      ) : (
        ""
      )}
      <button onClick={() => mainMenu()}>Ins Hauptmenü</button>
    </>
  );
}

export default Menu;
