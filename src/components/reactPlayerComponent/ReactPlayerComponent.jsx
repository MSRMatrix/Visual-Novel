import { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import "./reactPlayerComponent.css";
import { SoundContext } from "../../context/SoundContext";
import AudioManager from "./AudioManager/AudioManager";
import click1 from "../../sound/normalClick.wav";
import click2 from "../../sound/normalClick2.mp3";
import click3 from "../../sound/boopClick.wav";
import typing1 from "../../sound/typing-1.wav";
import typing2 from "../../sound/typing-2.mp3";
import typing3 from "../../sound/typing-3.mp3";
import useSound from "use-sound";

function ReactPlayerComponent({ intro }) {
  const test_music1 = import.meta.env.VITE_TEST_MUSIC1;
  const test_music2 = import.meta.env.VITE_TEST_MUSIC2;
  const test_music3 = import.meta.env.VITE_TEST_MUSIC3;
  const test_music4 = import.meta.env.VITE_TEST_MUSIC4;

  const { sounds, setSounds } = useContext(SoundContext);
  const [play1] = useSound(typing1);
  const [play2] = useSound(typing2);
  const [play3] = useSound(typing3);

  useEffect(() => {
    if (!sounds.playing) {
      setSounds((prev) => ({ ...prev, playing: true }));
    }
  }, [intro]);

  function musicTest(music) {
    setSounds((prev) => ({ ...prev, url: music, playing: true }));
  }


const players = { play1, play2, play3 };

function setTypeSound(e) {
  const player = players[e.target.name];
  if (player) player(); 
  setSounds(prev => ({ ...prev, typing: e.target.value }));
}

  function setClickSound(e) {
    setSounds((prev) => ({ ...prev, click: e.target.value }));
  }

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
          <button
            disabled={sounds.url === test_music1}
            value={test_music1}
            onClick={(e) => {
              musicTest(e.target.value);
            }}
          >
            Musik 1
          </button>
          <button
            disabled={sounds.url === test_music2}
            value={test_music2}
            onClick={(e) => musicTest(e.target.value)}
          >
            Musik 2
          </button>
          <button
            disabled={sounds.url === test_music3}
            value={test_music3}
            onClick={(e) => musicTest(e.target.value)}
          >
            Musik 3
          </button>
          <button
            disabled={sounds.url === test_music4}
            value={test_music4}
            onClick={(e) => musicTest(e.target.value)}
          >
            Musik 4
          </button>
        </div>

        <div>
          <h2>Klickgeräusche</h2>
          <button
            value={click1}
            disabled={sounds.click === click1}
            onClick={(e) => setClickSound(e)}
          >
            Klicken 1
          </button>
          <button
            value={click2}
            disabled={sounds.click === click2}
            onClick={(e) => setClickSound(e)}
          >
            Klicken 2
          </button>
          <button
            value={click3}
            disabled={sounds.click === click3}
            onClick={(e) => setClickSound(e)}
          >
            Klicken 3
          </button>
        </div>

        <div>
          <h2>Tippgeräusche</h2>
          <button
            name="play1"
            value={typing1}
            style={{ background: sounds.typing === typing1 ? "blue" : "" }}
            disabled={sounds.typing === typing1}
            onClick={(e) => setTypeSound(e)}
          >
            Schreiben 1
          </button>
          <button
            name="play2"
            value={typing2}
            style={{ background: sounds.typing === typing2 ? "blue" : "" }}
            disabled={sounds.typing === typing2}
            onClick={(e) => setTypeSound(e)}
          >
            Schreiben 2
          </button>
          <button
            name="play3"
            value={typing3}
            style={{ background: sounds.typing === typing3 ? "blue" : "" }}
            disabled={sounds.typing === typing3}
            onClick={(e) => setTypeSound(e)}
          >
            Schreiben 3
          </button>
        </div>

        <AudioManager />
      </div>
    </div>
  );
}

export default ReactPlayerComponent;
