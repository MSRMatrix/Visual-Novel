import { useNavigate } from "react-router-dom";
import "./menu.css";
import { useContext, useEffect, useState } from "react";
import GameData from "./gameData/GameData";
import { LoadContext } from "../../context/LoadContext";
import { SoundContext } from "../../context/SoundContext";
import { mainMenu } from "../functions/mainMenu";
import { newGame } from "../functions/newGame";
import Backlog from "./backlog/Backlog";
import Options from "../options/Options";

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

  const menuButtons = [
    { label: "Speichern", action: "save", color: "blue" },
    { label: "Laden", action: "load", color: "green" },
    { label: "Löschen", action: "delete", color: "red" },
    { label: "Optionen", action: "option", color: "violet" },
    { label: "Backlog", action: "backlog", color: "orange" },
  ];

  const menuButtons2 = [
    {
      label: "Zurück zum Spiel",
      onClick: () => {
        setQuickMenu(false);
        setAction("");
        setIsPaused(false);
        setSounds((prev) => ({
          ...prev,
          url: game_music,
          hidePlayer: true,
        }));
      },
    },
    {
      label: "Neues Spiel",
      onClick: () => {
        newGame(
          setCurrentChapter,
          setCurrentScene,
          setStepIndex,
          setChatHistory,
          setAction,
          setQuickMenu,
          setPlayTime,
          setDisplayText,
          setPausedText,
          setShowChoices
        );
      },
    },
  ];

  return (
    <>
      <h1>Schnellmenü</h1>
      {menuButtons2.map((btn) => (
        <button key={btn.label} onClick={btn.onClick}>
          {btn.label}
        </button>
      ))}

      {menuButtons.map((item) => (
        <button
          key={item.action}
          style={{ background: item.action === action ? item.color : "" }}
          disabled={item.action === action}
          onClick={() => setAction(item.action)}
        >
          {item.label}
        </button>
      ))}

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
        <Options quickMenu={quickMenu}/>
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
