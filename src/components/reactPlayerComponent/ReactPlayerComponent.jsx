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
  const [playClick1, { stop: stopClick1 }] = useSound(click1);
  const [playClick2, { stop: stopClick2 }] = useSound(click2);
  const [playClick3, { stop: stopClick3 }] = useSound(click3);

  const [playTyping1, { stop: stopTyping1 }] = useSound(typing1);
  const [playTyping2, { stop: stopTyping2 }] = useSound(typing2);
  const [playTyping3, { stop: stopTyping3 }] = useSound(typing3);

  // Sauberes Mapping für alle Sounds
  const players = {
    click: {
      click1: { play: playClick1, stop: stopClick1 },
      click2: { play: playClick2, stop: stopClick2 },
      click3: { play: playClick3, stop: stopClick3 },
    },
    typing: {
      typing1: { play: playTyping1, stop: stopTyping1 },
      typing2: { play: playTyping2, stop: stopTyping2 },
      typing3: { play: playTyping3, stop: stopTyping3 },
    },
  };

  const soundFiles = {
    click1,
    click2,
    click3,
    typing1,
    typing2,
    typing3,
  };

  function handleSound(category, soundKey, e) {
    const currentPlayer = players[category][soundKey];

    const soundFile = soundFiles[soundKey];

    if (!currentPlayer) return;

    Object.values(players[category]).forEach((p) => p.stop());

    currentPlayer.play();

    setSounds((prev) => ({ ...prev, [category]: soundFile }));
  }

  useEffect(() => {
    if (!sounds.playing) {
      setSounds((prev) => ({ ...prev, playing: true }));
    }
  }, [intro]);

  function musicTest(music) {
    setSounds((prev) => ({ ...prev, url: music, playing: true }));
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
          {Object.keys(players.click).map((key) => (
            <button
              key={key}
              onClick={(e) => {
                handleSound("click", key, e)
              }}
              disabled={sounds.click === soundFiles[key] }
              style={{ background: sounds.click === soundFiles[key] ? "blue" : "" }}
            >
              {key}
            </button>
          ))}

          <h2>Tippgeräusche</h2>
          {Object.keys(players.typing).map((key) => (
            <button
              key={key}
              onClick={(e) => handleSound("typing", key, e)}
              disabled={sounds.typing === soundFiles[key] }
              style={{ background: sounds.typing === soundFiles[key] ? "blue" : "" }}
            >
              {key}
            </button>
          ))}
        </div>

        <AudioManager />
      </div>
    </div>
  );
}

export default ReactPlayerComponent;
