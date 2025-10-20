import { useNavigate } from "react-router-dom";
import "./menu.css";
import { useContext, useEffect, useState } from "react";
import GameData from "./gameData/GameData";
import { LoadContext } from "../../context/LoadContext";
import Options from "./options/Options";
import { SoundContext } from "../../context/SoundContext";

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
  quickMenu,
  playTime,
setPlayTime,
isPaused,
setIsPaused
}) {
  const navigate = useNavigate();
const {load, setLoad} = useContext(LoadContext)
const { sound, setSound } = useContext(SoundContext);
  const [action, setAction] = useState("");

  function mainMenu() {
    const backToMenu = confirm(
      "Alle ungespeicherten Fortschritte gehen verloren! Möchtest du wirklich das Spiel verlassen?"
    );
    if (backToMenu) {
      setAction("");
      setLoad({
      currentChapter: "",
      currentScene: "",
      stepIndex: "",
      history: "",
      playTime: 0,
    });
    setPlayTime(0)
    setSound((prev) => ({ ...prev, url: "https://www.youtube.com/watch?v=6Fv-wbsIA2s" }))
      return navigate("/");
    } else {
      return;
    }
  }

  function newGame() {
    if (
      confirm(
        "Möchtest du ein neues Spiel starten? Alle deine ungespeicherten Daten gehen verloren!"
      )
    ) {
      setCurrentChapter("prolog")
      setCurrentScene("intro")
      setStepIndex(0)
      setChatHistory([])
      setAction("");
      setQuickMenu(false)
      setPlayTime(0)
      return;
    } else {
      console.log(`Neues Spiel abgebrochen!`);
    }
  }

  useEffect( () => {
if(action === "option"){
    setSound((prev) => ({...prev, hidePlayer: false}))
  } else {
    setSound((prev) => ({...prev, hidePlayer: true}))
  }

  },[action])


  return (
    <>
      <h1>Schnellmenü</h1>
      <button
        onClick={() => {
          setQuickMenu(false), setAction(""), setIsPaused(false), setSound((prev) => ({...prev, url: "https://www.youtube.com/watch?v=0iVgv5OP4so&list=PLfP6i5T0-DkLTWwznhWjQ1sm_GasKuMPY&index=23", hidePlayer: true}));
        }}
      >
        Zurück zum Spiel
      </button>
      <button onClick={() => newGame()}>Neues Spiel</button>
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
          playTime={playTime}
          setPlayTime={setPlayTime}
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
