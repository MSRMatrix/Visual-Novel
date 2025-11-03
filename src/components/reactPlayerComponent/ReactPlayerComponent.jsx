import { useContext, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { SoundContext } from "../../context/SoundContext";
import AudioManager from "./AudioManager/AudioManager";
import Click from "./click/Click";
import Write from "./write/Write";
import MusicData from "./musicData/MusicData";

function ReactPlayerComponent({ intro }) {
  const { sounds, setSounds } = useContext(SoundContext);
  const focusableRef = useRef([]); // ref array für die Buttons

  const [focusedIndex, setFocusedIndex] = useState(0);

  // Tastaturnavigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        setFocusedIndex((prev) => (prev + 1) % focusableRef.current.length);
      }
      if (e.key === "ArrowUp") {
        setFocusedIndex(
          (prev) => (prev - 1 + focusableRef.current.length) % focusableRef.current.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fokus setzen
  useEffect(() => {
    if (focusableRef.current[focusedIndex]) {
      focusableRef.current[focusedIndex].focus();
    }
  }, [focusedIndex]);

  // Musik starten, falls noch nicht spielend
  useEffect(() => {
    if (!sounds.playing) {
      setSounds((prev) => ({ ...prev, playing: true }));
    }
  }, [intro]);

  return (
    <div className={`react-player ${sounds.hidePlayer ? "hide" : ""}`}>
      <ReactPlayer
        src={sounds.url}
        playing={sounds.playing}
        volume={sounds.musicVolume}
        loop
        onError={(e) => console.log("Player-Error:", e)}
        style={{ display: "none" }}
      />

      <div className="react-player-action">
        <div className="music-test">
          <button
            onClick={() =>
              setSounds((prev) => ({ ...prev, playing: !prev.playing }))
            }
          >
            {sounds.playing ? "Anhalten" : "Weiter"}
          </button>
        </div>

        <div className="placeholder">
          <div className="musicData">
            <h2>Music zum testen</h2>
            <MusicData focusableRef={focusableRef} startIndex={0} />
          </div>

          <div className="click-action">
            <h2>Klickgeräusche</h2>
            <Click />
          </div>

          <div className="type-action">
            <h2>Tippgeräusche</h2>
            <Write />
          </div>

          <div className="sound-volume">
            <h2>Sound Lautstärke</h2>
            <AudioManager />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReactPlayerComponent;
