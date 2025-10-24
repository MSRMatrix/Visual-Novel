import { useNavigate } from "react-router-dom";
import "./menu.css";
import { useContext, useEffect, useState } from "react";
import GameData from "./gameData/GameData";
import { LoadContext } from "../../context/LoadContext";
import Options from "./options/Options";
import { SoundContext } from "../../context/SoundContext";
import { mainMenu } from "../functions/mainMenu";
import { newGame } from "../functions/newGame";
import Backlog from "./backlog/Backlog";

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
  setIsPaused,
  writeSpeed,
  setWriteSpeed,
  setDisplayText,
  setPausedText,
  showChoices,
  setShowChoices,
}) {
  const game_music = import.meta.env.VITE_GAME_MUSIC;

  const navigate = useNavigate();
  const { load, setLoad } = useContext(LoadContext);
  const { sounds, setSounds } = useContext(SoundContext);
  const [action, setAction] = useState("");

  useEffect(() => {
    if (action === "option") {
      setSounds((prev) => ({ ...prev, hidePlayer: false }));
    } else {
      setSounds((prev) => ({ ...prev, hidePlayer: true }));
    }
  }, [action]);

  return (
    <>
      <h1>Schnellmenü</h1>
      <button
        onClick={() => {
          setQuickMenu(false),
            setAction(""),
            setIsPaused(false),
            setSounds((prev) => ({
              ...prev,
              url: game_music,
              hidePlayer: true,
            }));
        }}
      >
        Zurück zum Spiel
      </button>
      <button
        onClick={() =>
          newGame(
            setCurrentChapter,
            setCurrentScene,
            setStepIndex,
            setChatHistory,
            setAction,
            setQuickMenu,
            setPlayTime
          )
        }
      >
        Neues Spiel
      </button>
      <button
        style={{ background: action === "save" ? "blue" : "" }}
        disabled={action === "save"}
        onClick={() => setAction("save")}
      >
        Speichern
      </button>
      <button
        style={{ background: action === "load" ? "green" : "" }}
        disabled={action === "load"}
        onClick={() => setAction("load")}
      >
        Laden
      </button>
      <button
        style={{ background: action === "delete" ? "red" : "" }}
        disabled={action === "delete"}
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

      <button
        style={{ background: action === "backlog" ? "orange" : "" }}
        onClick={() => setAction("backlog")}
      >
        Backlog
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
          setDisplayText={setDisplayText}
          setPausedText={setPausedText}
          showChoices={showChoices}
          setShowChoices={setShowChoices}
        />
      ) : action === "option" ? (
        <Options writeSpeed={writeSpeed} setWriteSpeed={setWriteSpeed} />
      ) : action === "backlog" ? (
        <Backlog
          currentChapter={currentChapter}
          currentScene={currentScene}
          stepIndex={stepIndex}
          chatHistory={chatHistory}
        />
      ) : (
        ""
      )}
      <button
        onClick={() =>
          mainMenu(setAction, setLoad, setPlayTime, setSounds, navigate)
        }
      >
        Ins Hauptmenü
      </button>
    </>
  );
}

export default Menu;
