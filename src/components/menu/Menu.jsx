import { useNavigate } from "react-router-dom";
import "./menu.css";
import { useContext, useRef, useState } from "react";
import GameData from "./gameData/GameData";
import { LoadContext } from "../../context/LoadContext";
import { SoundContext } from "../../context/SoundContext";
import { mainMenu } from "../functions/mainMenu";
import { newGame } from "../functions/newGame";
import Backlog from "./backlog/Backlog";
import Options from "../options/Options";
import { useSimpleFocusMode } from "../modes/useSimpleFocusMode";

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
const focusableRef = useRef([]);
const navigate = useNavigate();
const { load, setLoad } = useContext(LoadContext);
const { sounds, setSounds } = useContext(SoundContext);

const [action, setAction] = useState("");
const [focusedIndex, setFocusedIndex] = useState(0);

const menuButtons = [
  { label: "Speichern", action: "save" },
  { label: "Laden", action: "load" },
  { label: "Löschen", action: "delete" },
  { label: "Optionen", action: "option" },
  { label: "Backlog", action: "backlog" },
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
  }, { 
    label: "Ins Hauptmenü",
    onClick: () => mainMenu(setAction, setLoad, setSounds, navigate, setStoryState)
  }
];

const ifDeps = !uiState.quickMenu && action;
const effectDeps = [focusedIndex, sounds.hidePlayer];

useSimpleFocusMode({
  ifDeps,
  effectDeps,
  arrayItem: menuButtons,
  focusedIndex,
  setFocusedIndex,
  arrayFocus: focusableRef
});




  return (
    <>
      <h1>Schnellmenü</h1>
      

        {menuButtons.map((item, idx) => (
      <button
        ref={(el) => (focusableRef.current[idx] = el)}
        key={item.action || idx}
        disabled={item.action === action}
        onClick={() => {
          if (item.onClick) item.onClick();
          setAction(item.action);
          setSounds((prev) => ({ ...prev, options: "" }));
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
    </>
  );
}

export default Menu;
