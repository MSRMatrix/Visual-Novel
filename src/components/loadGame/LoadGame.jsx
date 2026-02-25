import "./loadGame.css"

import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { formatTime } from "../../utils/formatTime";
import { LoadContext, LoadingOverlay, SoundContext } from "../../context/AppProviders";
import { handleKeyDown } from "../../game/engine/functions";

function LoadGames() {
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
   <div className="island-game-data">
  <div className="game-data-container">

    {saves.map((item, index) => {
      const isEmpty = !item.timestamp;

      return (
        <button
          key={item.name}
          disabled={isEmpty}
          ref={(el) => (focusableRef.current[index] = el)}
          onClick={() => handleLoad(item.name)}
          className={`
            island-save-slot
            ${isEmpty ? "slot-empty" : "slot-filled"}
            mode-load
          `}
        >
          <h2 className="slot-title">
            {item.name}
          </h2>

          {!isEmpty && (
            <>
              <p>Gespeichert am: {item.timestamp}</p>
              <p>Kapitel: {item.currentChapter}</p>
              <p>Szene im Kapitel: {item.currentScene}</p>
              <p>Punkt in der Szene: {item.stepIndex + 1}</p>
              <p>Spielzeit: {formatTime(item.playTime)}</p>
            </>
          )}
        </button>
      );
    })}

    <button
      className="island-button"
      ref={(el) => (focusableRef.current[saves.length] = el)}
      onClick={() => navigate("/")}
    >
      Zurück
    </button>

  </div>
</div>
  );
}

export default LoadGames;
