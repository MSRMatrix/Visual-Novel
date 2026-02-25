import "./menu.css";

import { useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";

import { mainMenu,newGame  } from "../../game/engine/functions";

import GameData from "./GameData";
import Backlog from "./Backlog";
import Options from "../options/Options";

import {
  useSimpleFocusMode
} from "../../game/modes/useMode";

import 
  {LoadContext,
  PictureContext,
  SoundContext,} from "../../context/AppProviders"

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
  const { pictureContext, setPictureContext } = useContext(PictureContext);

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
    },
    {
      label: "Ins Hauptmenü",
      onClick: () => {
        (mainMenu(setAction, setLoad, setSounds, navigate, setStoryState),
          setSounds((prev) => ({ ...prev, hidePlayer: true })),
          setPictureContext({
            background: "",
            protagonist: "",
            side: "",
            antagonist: "",
          }));
      },
    },
  ];

  const ifDeps = !uiState.quickMenu && action;
  const effectDeps = [focusedIndex, sounds.hidePlayer];

  useSimpleFocusMode({
    ifDeps,
    effectDeps,
    arrayItem: menuButtons,
    focusedIndex,
    setFocusedIndex,
    arrayFocus: focusableRef,
  });

  return (
  <div className="island-menu">
  <div
    className={`menu-container ${
      action || !sounds.hidePlayer ? "menu-hidden" : ""
    }`}
  >
    <h1 className="menu-title">Schnellmenü</h1>

    {menuButtons.map((item, idx) => (
      <button
        key={item.action || idx}
        ref={(el) => (focusableRef.current[idx] = el)}
        disabled={item.action === action}
        className="island-menu-button"
        onClick={() => {
          if (item.onClick) item.onClick();
          setAction(item.action);
          setSounds((prev) => ({ ...prev, options: "" }));
        }}
      >
        {item.label}
      </button>
    ))}
  </div>

  {action === "save" ||
  action === "load" ||
  action === "delete" ? (
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
  ) : null}
</div>
  );
}

export default Menu;
