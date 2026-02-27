import { useContext, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

import AudioManager from "./AudioManager";
import Click from "./Click";
import Write from "./Write";
import MusicData from "./MusicData";

import { SoundContext } from "../../../context/AppProviders";

function ReactPlayerComponent() {
  const { sounds, setSounds } = useContext(SoundContext);
  const focusableRef = useRef([]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [keyCatcher, setKeyCatcher] = useState("");

  const reactplayerItems = [
    {
      name: "Music zum testen",
      component: <MusicData focusableRef={focusableRef} startIndex={1} />,
      className: "musicData",
    },
    {
      name: "Klickgeräusche",
      component: <Click focusableRef={focusableRef} startIndex={5} />,
      className: "click-action",
    },
    {
      name: "Tippgeräusche",
      component: <Write focusableRef={focusableRef} startIndex={8} />,
      className: "type-action",
    },
    {
      name: "Sound Lautstärke",
      component: <AudioManager focusableRef={focusableRef} startIndex={11} keyCatcher={keyCatcher} setKeyCatcher={setKeyCatcher} />,
      className: "sound-volume",
    },
  ];

  const ifDeps = sounds.hidePlayer;

  // Tastaturnavigationz
  useEffect(() => {
    if (sounds.hidePlayer) return;
    const handleKeyDown = (e) => {
      setKeyCatcher(e.key);
      if (e.key === "ArrowDown") {
        setFocusedIndex((prevIndex) => {
          let next = (prevIndex + 1) % focusableRef.current.length;
          while (focusableRef.current[next]?.disabled) {
            next = (next + 1) % focusableRef.current.length;
          }
          return next;
        });
      }

      if (e.key === "ArrowUp") {
        setFocusedIndex((prevIndex) => {
          let next =
            (prevIndex - 1 + focusableRef.current.length) %
            focusableRef.current.length;
          while (focusableRef.current[next]?.disabled) {
            next =
              (next - 1 + focusableRef.current.length) %
              focusableRef.current.length;
          }
          return next;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedIndex, sounds.hidePlayer]);

  useEffect(() => {
    focusableRef.current[focusedIndex]?.focus();
  }, [focusedIndex, focusableRef]);

  return (
  <div className={`island-player-wrapper ${sounds.hidePlayer ? "hide" : ""}`}>

  <div className="island-player">

    <ReactPlayer
      src={sounds.url}
      playing={sounds.playing}
      volume={sounds.musicVolume}
      loop
      onError={(e) => console.log("Player-Error:", e)}
      style={{ display: "none" }}
    />

    <h1 className="memory-title">Musik</h1>

    {/* Play / Pause */}
    <button
      className="island-card"
      ref={(el) => (focusableRef.current[0] = el)}
      onClick={() =>
        setSounds((prev) => ({ ...prev, playing: !prev.playing }))
      }
    >
      {sounds.playing ? "Anhalten" : "Weiter"}
    </button>

    {/* Dynamische Player Elemente */}
    <div className="player-section">
      {reactplayerItems.map((item) => (
        <div key={item.name} className="player-item">
          <h2 className="player-subtitle">{item.name}</h2>
          {item.component}
        </div>
      ))}
    </div>

    {/* Zurück */}
    <button
      className="island-card"
      ref={(el) => (focusableRef.current[19] = el)}
      onClick={() => {
        setSounds((prev) => ({ ...prev, hidePlayer: true, options: "" }));
        setFocusedIndex(0);
      }}
    >
      Zurück
    </button>

  </div>
</div>
  );
}

export default ReactPlayerComponent;
