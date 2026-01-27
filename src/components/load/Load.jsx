import "./load.css"

import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { formatTime } from "../functions/formatTime";
import { handleKeyDown } from "../functions/handleKeyDown";
import { LoadContext, LoadingOverlay, SoundContext } from "../../context/AppProviders";

function Load() {
  const game_music = import.meta.env.VITE_GAME_MUSIC;
  const { sounds, setSounds } = useContext(SoundContext);
  const { load, setLoad } = useContext(LoadContext);
   const { loadingOverlay, setLoadingOverlay } = useContext(LoadingOverlay);

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

  function handleLoad(slotName) {
    const saves = JSON.parse(localStorage.getItem("vn_saves") || "[]");
    const existing = saves.find((s) => s.name === slotName);

    if (!existing.timestamp) {
      console.log("Kein Speicherstand gefunden!");
      return;
    }
    if (!confirm(`Möchtest du mit Spielstand ${slotName} fortfahren?`)) {
      console.log(`Laden abgebrochen!`);
      return;
    }
    setLoad({
      chapter: existing.chapter,
      scene: existing.scene,
      step: existing.step,
      history: existing.history,
      playTime: existing.playTime,
    });
    setSounds((prev) => ({ ...prev, url: game_music }));
    navigate("/start");
    setLoadingOverlay((prev) => ({...prev, loader: true}))
  }

  const focusableRef = useRef([]);

  const [uiState, setUiState] = useState({
    focusedIndex: 0,
    quickMenu: false,
    gamePaused: false,
    startIndex: 0,
  });

  // Tastaturnavigation
  useEffect(() => {
    const listener = (e) =>
      handleKeyDown(e, focusableRef, false, [], uiState, setUiState);
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [uiState.focusedIndex]);

  // Fokus setzen
  useEffect(() => {
    if (focusableRef.current[uiState.focusedIndex]) {
      focusableRef.current[uiState.focusedIndex].focus();
    }
  }, [uiState.focusedIndex]);

  return (
    <div className="load">
      <div className="load-container">
      {saves.map((item, index) => (
        <button
        
          disabled={!item.timestamp}
          ref={(el) => (focusableRef.current[0 + index] = el)}
          key={item.name}
          onClick={() => handleLoad(item.name)}
        >
          <h2 style={{color: !item.timestamp ? "transparent" : ""}}>{item.name}</h2>
          <p>{item.timestamp ? `Gespeichert am: ${item.timestamp}` : ""}</p>
          <p>{item.currentChapter ? `Kapitel: ${item.currentChapter}` : ""}</p>
          <p>
            {item.currentScene ? `Szene im Kapitel: ${item.currentScene}` : ""}
          </p>
          <p>{item.stepIndex ? `Punkt im Szene: ${item.stepIndex}` : ""}</p>
          <p>
            {item.playTime ? `Spielzeit: ${formatTime(item.playTime)}` : ""}
          </p>
        </button>
      ))}
      <button
        ref={(el) => (focusableRef.current[5] = el)}
        onClick={() => navigate("/")}
      >
        Zurück
      </button>
      </div>
    </div>
  );
}

export default Load;
