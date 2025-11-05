import { useContext, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { SoundContext } from "../../context/SoundContext";
import AudioManager from "./AudioManager/AudioManager";
import Click from "./click/Click";
import Write from "./write/Write";
import MusicData from "./musicData/MusicData";
import "./reactPlayerComponent.css";
import { handleKeyDown } from "../functions/handleKeyDown";

function ReactPlayerComponent({ intro, setOptions }) {
  const { sounds, setSounds } = useContext(SoundContext);
  const focusableRef = useRef([]);

  const [focusedIndex, setFocusedIndex] = useState(0);
  // Tastaturnavigation
useEffect(() => {
  if(!sounds.hidePlayer){
  const listener = (e) => handleKeyDown(e, focusableRef, focusedIndex, setFocusedIndex);
  window.addEventListener("keydown", listener);
  return () => window.removeEventListener("keydown", listener);
}
}, [focusedIndex, sounds.hidePlayer]);

  // Fokus setzen
  useEffect(() => {
    if(!sounds.hidePlayer){
    if (focusableRef.current[focusedIndex]) {
      focusableRef.current[focusedIndex].focus();
    }
    }
  }, [focusedIndex, sounds.hidePlayer]);

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
        // style={{display: "none"}}
      />

      <div className="react-player-action">
        <div className="music-test">
          <button
          ref={(el) => (focusableRef.current[0] = el)}
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
            <MusicData focusableRef={focusableRef} startIndex={1} />
          </div>

          <div className="click-action">
            <h2>Klickgeräusche</h2>
            <Click focusableRef={focusableRef} startIndex={5} />
          </div>

          <div className="type-action">
            <h2>Tippgeräusche</h2>
            <Write focusableRef={focusableRef} startIndex={8} />
          </div>

          <div className="sound-volume">
            <h2>Sound Lautstärke</h2>
            <AudioManager focusableRef={focusableRef} startIndex={11} />
          </div>
        </div>
      </div>
       <button ref={(el) => (focusableRef.current[19] = el)} onClick={() => {setSounds((prev) => ({...prev, hidePlayer: true, options: ""})),setFocusedIndex(0)}}>Zurück</button>
    </div>
  );
}

export default ReactPlayerComponent;
