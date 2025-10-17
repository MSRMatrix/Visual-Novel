import { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import "./reactPlayerComponent.css";
import { SoundContext } from "../../context/SoundContext";

function ReactPlayerComponent({ intro }) {
  const { sound, setSound } = useContext(SoundContext);
  useEffect(() => {
    if (!sound.playing) {
      setSound((prev) => ({ ...prev, playing: true }));
    }
  }, [intro]);

  function musicTest(music) {
    setSound((prev) => ({ ...prev, url: music, playing: true }));
  }

  function checkboxHandler(name) {
    switch (name) {
      case "musicVolume":
        setSound((prev) => ({
          ...prev,
          musicVolume: prev.musicVolume > 0 ? 0 : 1,
        }));
        break;
      case "textVolume":
        setSound((prev) => ({
          ...prev,
          textVolume: prev.textVolume > 0 ? 0 : 1,
        }));
        break;
      case "masterVolume":
        setSound((prev) =>
          prev.masterVolume > 0
            ? { ...prev, masterVolume: 0, musicVolume: 0, textVolume: 0 }
            : { ...prev, masterVolume: 1, musicVolume: 1, textVolume: 1 }
        );
        break;
    }
  }

  function handleVolumeChange(name, value) {
    const volume = value / 100;
    switch (name) {
      case "musicVolume":
        setSound((prev) => ({ ...prev, musicVolume: volume }));
        break;
      case "textVolume":
        setSound((prev) => ({ ...prev, textVolume: volume }));
        break;
      case "masterVolume":
        setSound((prev) => ({
          ...prev,
          masterVolume: volume,
          musicVolume: volume,
          textVolume: volume,
        }));
        break;
    }
  }

  return (
    <>
      <div>
        <ReactPlayer
          src={sound.url}
          playing={sound.playing}
          volume={sound.musicVolume}
          loop
          onError={(e) => console.log("Player-Error:", e)}
          // style={{display: "none"}}
        />
      </div>
      <div className="react-player-action">
        <button
          onClick={() =>
            setSound((prev) => ({ ...prev, playing: !prev.playing }))
          }
        >
          {sound.playing ? "Anhalten" : "Weiter"}
        </button>
        <button
          value="https://www.youtube.com/watch?v=iZq3i94mSsQ"
          onClick={(e) => musicTest(e.target.value)}
        >
          Musik 1
        </button>
        <button
          value="https://www.youtube.com/watch?v=nrkPeCIUpQs"
          onClick={(e) => musicTest(e.target.value)}
        >
          Musik 2
        </button>
        <button
          value="https://www.youtube.com/watch?v=62TrmUvQGjo"
          onClick={(e) => musicTest(e.target.value)}
        >
          Musik 3
        </button>
        <button
          value="https://www.youtube.com/watch?v=ABN8wULoixI"
          onClick={(e) => musicTest(e.target.value)}
        >
          Musik 4
        </button>

        <div>
          <div>
            <h2>Music</h2>
            <input
              type="range"
              name="musicVolume"
              id=""
              value={sound.musicVolume * 100}
              disabled={sound.masterVolume <= 0}
              onChange={(e) =>
                handleVolumeChange(e.target.name, e.target.value)
              }
            />
            <input
              type="checkbox"
              onChange={(e) => checkboxHandler(e.target.name)}
              disabled={sound.masterVolume <= 0}
              checked={sound.musicVolume <= 0 ? true : false}
              name="musicVolume"
            />
          </div>

          <div>
            <h2>Text</h2>
            <input
              type="range"
              name="textVolume"
              id=""
              value={sound.textVolume * 100}
              disabled={sound.masterVolume <= 0}
              onChange={(e) =>
                handleVolumeChange(e.target.name, e.target.value)
              }
            />
            <input
              type="checkbox"
              onChange={(e) => checkboxHandler(e.target.name)}
              disabled={sound.masterVolume <= 0}
              checked={sound.textVolume <= 0 ? true : false}
              name="textVolume"
            />
          </div>

          <div>
            <h2>Everything</h2>
            <input
              type="range"
              name="masterVolume"
              id=""
              value={sound.masterVolume * 100}
              onChange={(e) =>
                handleVolumeChange(e.target.name, e.target.value)
              }
            />
            <input
              type="checkbox"
              onChange={(e) => checkboxHandler(e.target.name)}
              checked={sound.masterVolume <= 0 ? true : false}
              name="masterVolume"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ReactPlayerComponent;
