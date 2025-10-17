import { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import "./reactPlayerComponent.css";
import { SoundContext } from "../../context/SoundContext";
import AudioManager from "./AudioManager/AudioManager";
import normalClick from "../../sound/normalClick.wav"
import normalClick2 from "../../sound/normalClick2.mp3"
import boopClick from "../../sound/boopClick.wav"
import typing1 from "../../sound/typing-1.wav"
import typing2 from "../../sound/typing-2.mp3"
import typing3 from "../../sound/typing-3.mp3"

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

  return (
    <>
      <div>
        <ReactPlayer
          src={sound.url}
          playing={sound.playing}
          volume={sound.musicVolume}
          loop
          onError={(e) => console.log("Player-Error:", e)}
          style={{display: "none"}}
        />
      </div>
      <div className="react-player-action">

        <div className="music-test">
         <button
          onClick={() =>
            setSound((prev) => ({ ...prev, playing: !prev.playing }))
          }
        >
          {sound.playing ? "Anhalten" : "Weiter"}
        </button>
        <button
          disabled={sound.url === "https://www.youtube.com/watch?v=iZq3i94mSsQ"}
          value="https://www.youtube.com/watch?v=iZq3i94mSsQ"
          onClick={(e) => {
            musicTest(e.target.value);
          }}
        >
          Musik 1
        </button>
        <button
          disabled={sound.url === "https://www.youtube.com/watch?v=nrkPeCIUpQs"}
          value="https://www.youtube.com/watch?v=nrkPeCIUpQs"
          onClick={(e) => musicTest(e.target.value)}
        >
          Musik 2
        </button>
        <button
          disabled={sound.url === "https://www.youtube.com/watch?v=62TrmUvQGjo"}
          value="https://www.youtube.com/watch?v=62TrmUvQGjo"
          onClick={(e) => musicTest(e.target.value)}
        >
          Musik 3
        </button>
        <button
          disabled={sound.url === "https://www.youtube.com/watch?v=ABN8wULoixI"}
          value="https://www.youtube.com/watch?v=ABN8wULoixI"
          onClick={(e) => musicTest(e.target.value)}
        >
          Musik 4
        </button> 
        </div>
        
        <div>
          <h2>Klickgeräusche</h2>
          <button value={normalClick} disabled={sound.click === normalClick} onClick={(e) => setSound((prev) => ({...prev, click: e.target.value}))}>Klicken 1</button>
          <button value={normalClick2} disabled={sound.click === normalClick2} onClick={(e) => setSound((prev) => ({...prev, click: e.target.value}))}>Klicken 2</button>
          <button value={boopClick} disabled={sound.click === boopClick} onClick={(e) => setSound((prev) => ({...prev, click: e.target.value}))}>Klicken 3</button>
        </div>

        <div>
          <h2>Tippgeräusche</h2>
          <button value={typing1} disabled={sound.typing === typing1} onClick={(e) => setSound((prev) => ({...prev, typing: e.target.value}))}>Schreiben 1</button>
          <button value={typing2} disabled={sound.typing === typing2} onClick={(e) => setSound((prev) => ({...prev, typing: e.target.value}))}>Schreiben 2</button>
          <button value={typing3} disabled={sound.typing === typing3} onClick={(e) => setSound((prev) => ({...prev, typing: e.target.value}))}>Schreiben 3</button>
        </div>

        <AudioManager />
      </div>
    </>
  );
}

export default ReactPlayerComponent;
