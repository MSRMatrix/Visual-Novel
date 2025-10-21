import { useContext } from "react";
import { SoundContext } from "../../../context/SoundContext";
import { handleVolumeChange } from "../../functions/handleVolumeChange";
import { checkboxHandler } from "../../functions/checkboxHandler";

const AudioManager = () => {
  const { sounds, setSounds } = useContext(SoundContext);

  return (
    <>
      <div>
        <div>
          <h2>Music</h2>
          <input
            type="range"
            name="musicVolume"
            id=""
            value={sounds.musicVolume * 100}
            disabled={sounds.masterVolume <= 0}
            onChange={(e) => handleVolumeChange(e.target.name, e.target.value, setSounds)}
          />
          <input
            type="checkbox"
            onChange={(e) => checkboxHandler(e.target.name, setSounds)}
            disabled={sounds.masterVolume <= 0}
            checked={sounds.musicVolume <= 0 ? true : false}
            name="musicVolume"
          />
        </div>

        <div>
          <h2>Text</h2>
          <input
            type="range"
            name="textVolume"
            id=""
            value={sounds.textVolume * 100}
            disabled={sounds.masterVolume <= 0}
            onChange={(e) => handleVolumeChange(e.target.name, e.target.value, setSounds)}
          />
          <input
            type="checkbox"
            onChange={(e) => checkboxHandler(e.target.name, setSounds)}
            disabled={sounds.masterVolume <= 0}
            checked={sounds.textVolume <= 0 ? true : false}
            name="textVolume"
          />
        </div>

        <div>
          <h2>Klicken</h2>
          <input
            type="range"
            name="clickVolume"
            id=""
            value={sounds.clickVolume * 100}
            disabled={sounds.masterVolume <= 0}
            onChange={(e) => handleVolumeChange(e.target.name, e.target.value, setSounds)}
          />
          <input
            type="checkbox"
            onChange={(e) => checkboxHandler(e.target.name, setSounds)}
            disabled={sounds.masterVolume <= 0}
            checked={sounds.clickVolume <= 0 ? true : false}
            name="clickVolume"
          />
        </div>

        <div>
          <h2>Everything</h2>
          <input
            type="range"
            name="masterVolume"
            id=""
            value={sounds.masterVolume * 100}
            onChange={(e) => handleVolumeChange(e.target.name, e.target.value, setSounds)}
          />
          <input
            type="checkbox"
            onChange={(e) => checkboxHandler(e.target.name, setSounds)}
            checked={sounds.masterVolume <= 0 ? true : false}
            name="masterVolume"
          />
        </div>
      </div>
    </>
  );
};

export default AudioManager;
