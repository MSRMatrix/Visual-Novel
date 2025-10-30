import { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import "./reactPlayerComponent.css";
import { SoundContext } from "../../context/SoundContext";
import AudioManager from "./AudioManager/AudioManager";
import Click from "./click/Click";
import Write from "./write/Write";
import MusicData from "./musicData/MusicData";

function ReactPlayerComponent({ intro }) {
  const { sounds, setSounds } = useContext(SoundContext);

  useEffect(() => {
    if (!sounds.playing) {
      setSounds((prev) => ({ ...prev, playing: true }));
    }
  }, [intro]);

  return (
    <div
      className={`react-player ${
        sounds.hidePlayer ? "hide-player" : "show-player"
      }`}
    >
      <div>
        <ReactPlayer
          src={sounds.url}
          playing={sounds.playing}
          volume={sounds.musicVolume}
          loop
          onError={(e) => console.log("Player-Error:", e)}
          style={{ display: "none" }}
        />
      </div>
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

        <div className="musicData">
          <h2>Music zum testen</h2>
          <MusicData />
        </div>

        <div>
          <h2>Klickgeräusche</h2>
          <Click />

          <h2>Tippgeräusche</h2>
          <Write />
        </div>

        <div>
          <h2>Musiklautstärke</h2>
          <AudioManager />
        </div>
      </div>
    </div>
  );
}

export default ReactPlayerComponent;
