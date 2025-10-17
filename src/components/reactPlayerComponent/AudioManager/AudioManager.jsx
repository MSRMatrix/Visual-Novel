import { useContext } from "react";
import { SoundContext } from "../../../context/SoundContext";

const AudioManager = () => {
    const { sound, setSound } = useContext(SoundContext);

    function handleVolumeChange(name, value) {
    const volume = value / 100;
    switch (name) {
      case "musicVolume":
        setSound((prev) => ({ ...prev, musicVolume: volume }));
        break;
      case "textVolume":
        setSound((prev) => ({ ...prev, textVolume: volume }));
        break;
 case "clickVolume":
        setSound((prev) => ({ ...prev, clickVolume: volume }));
        break;
      case "masterVolume":
        setSound((prev) => ({
          ...prev,
          masterVolume: volume,
          musicVolume: volume,
          textVolume: volume,
          clickVolume: volume,
        }));
        break;
    }
  }

    function checkboxHandler(name) {
    switch (name) {
      case "musicVolume":
        setSound((prev) => ({
          ...prev,
          musicVolume: prev.musicVolume > 0 ? 0 : 0.5,
        }));
        break;
      case "textVolume":
        setSound((prev) => ({
          ...prev,
          textVolume: prev.textVolume > 0 ? 0 : 0.5,
        }));
        break;
 case "clickVolume":
        setSound((prev) => ({ ...prev, clickVolume: prev.clickVolume > 0 ? 0 : 0.5 }));
        break;
      case "masterVolume":
        setSound((prev) =>
          prev.masterVolume > 0
            ? { ...prev, masterVolume: 0, musicVolume: 0, textVolume: 0, clickVolume: 0 }
            : { ...prev, masterVolume: 0.5, musicVolume: 0.5, textVolume: 0.5, clickVolume: 0.5 }
        );
        break;
    }
  }

    return(
        <>
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
            <h2>Klicken</h2>
            <input
              type="range"
              name="clickVolume"
              id=""
              value={sound.clickVolume * 100}
              disabled={sound.masterVolume <= 0}
              onChange={(e) =>
                handleVolumeChange(e.target.name, e.target.value)
              }
            />
            <input
              type="checkbox"
              onChange={(e) => checkboxHandler(e.target.name)}
              disabled={sound.masterVolume <= 0}
              checked={sound.clickVolume <= 0 ? true : false}
              name="clickVolume"
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
        </>
    )
}

export default AudioManager;