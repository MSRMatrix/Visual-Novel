import { useNavigate } from "react-router-dom";
import "./menu.css";
import { useContext, useEffect, useRef, useState } from "react";
import GameData from "./gameData/GameData";
import { LoadContext } from "../../context/LoadContext";
import { SoundContext } from "../../context/SoundContext";
import { mainMenu } from "../functions/mainMenu";
import { newGame } from "../functions/newGame";
import Backlog from "./backlog/Backlog";
import Options from "../options/Options";
import { handleKeyDown } from "../functions/handleKeyDown";
import { useFocusMode, useKeyControl } from "../text/modes/useControl";

function Menu({
  currentStep,
  storyState,
  setStoryState,
  textState,
  setTextState,
  uiState,
  setUiState,
}) {
  const game_music = import.meta.env.VITE_GAME_MUSIC;

  const navigate = useNavigate();
  const { load, setLoad } = useContext(LoadContext);
  const { sounds, setSounds } = useContext(SoundContext);
  const [action, setAction] = useState("");

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
        setUiState((prev) => ({ ...prev, quickMenu: false }));
        setAction("");
        setTextState((prev) => ({
          ...prev,
          isPaused: false,
        }));
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
        newGame(setAction, setStoryState, setTextState, setUiState);
      },
    },
  ];

  const focusableRef = useRef([]);

  const effectdeps = [ uiState.quickMenu, action, currentStep.type === "choice", currentStep.type === "game"];
  const ifDeps = uiState.quickMenu && !action;

  // Tastaturnavigation
  useKeyControl({ focusableRef, currentStep, uiState, setUiState, effectdeps, ifDeps });
  // Tastaturnavigation

  // Fokus setzen
  useFocusMode({ focusableRef, currentStep, uiState, effectdeps, ifDeps });
  // Fokus setzen

  return (
    <>
      <h1>Schnellmenü</h1>
      {menuButtons2.map((btn, idx) => (
        <button
          ref={(el) => (focusableRef.current[0 + idx] = el)}
          key={btn.label}
          onClick={btn.onClick}
        >
          {btn.label}
        </button>
      ))}

      {menuButtons.map((item, idx) => (
        <button
          ref={(el) => (focusableRef.current[2 + idx] = el)}
          key={item.action}
          style={{ background: item.action === action ? item.color : "" }}
          disabled={item.action === action}
          onClick={() => {
            setAction(item.action),
              setSounds((prev) => ({
                ...prev,
                options: "",
              }));
          }}
        >
          {item.label}
        </button>
      ))}

      {action === "save" || action === "load" || action === "delete" ? (
        <GameData
          mode={action}
          setMode={setAction}
          action={action}
          setAction={setAction}
          currentStep={currentStep}
          storyState={storyState}
          setStoryState={setStoryState}
          setTextState={setTextState}
          uiState={uiState}
          setUiState={setUiState}
        />
      ) : action === "option" ? (
        <Options action={action} setAction={setAction} />
      ) : action === "backlog" ? (
        <Backlog
          setAction={setAction}
          action={action}
          currentStep={currentStep}
          storyState={storyState}
          uiState={uiState}
          setUiState={setUiState}
        />
      ) : (
        ""
      )}
      <button
        ref={(el) => (focusableRef.current[7] = el)}
        onClick={() =>
          mainMenu(setAction, setLoad, setSounds, navigate, setStoryState)
        }
      >
        Ins Hauptmenü
      </button>
    </>
  );
}

export default Menu;
