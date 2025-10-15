import { NavLink, useNavigate } from "react-router-dom";
import "./menu.css";
import { useState } from "react";
import Save from "./save/Save";
import Load from "./load/Load";
import Options from "../options/Options";

function Menu({
  setQuickMenu,
  currentChapter,
  currentScene,
  stepIndex,
  chatHistory,
}) {
  const navigate = useNavigate();

  function load() {
    console.log(`Noch keine Funktion :)`);
    // Local Storage Daten rausfiltern
  }

  const [test, setTest] = useState("");

  function mainMenu() {
    const backToMenu = confirm(
      "Alle ungespeicherten Fortschritte gehen verloren! Möchtest du wirklich das Spiel verlassen?"
    );
    if (backToMenu) {
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
          setQuickMenu(false), setTest("");
        }}
      >
        Zurück zum Spiel
      </button>
      <button onClick={() => setTest("save")}>Speichern</button>
      <button onClick={() => setTest("load")}>Laden</button>
      <button onClick={() => setTest("option")}>Optionen</button>
      {test === "save" ? (
        <Save 
  currentChapter={currentChapter}
  currentScene={currentScene}
  stepIndex={stepIndex}
  chatHistory={chatHistory}/>
      ) : test === "load" ? (
        <Load />
      ) : test === "option" ? (
        <Options />
      ) : (
        ""
      )}
      <button onClick={() => mainMenu()}>Ins Hauptmenü</button>
    </>
  );
}

export default Menu;
