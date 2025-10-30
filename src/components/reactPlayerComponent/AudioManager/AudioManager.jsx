import { useContext } from "react";
import { SoundContext } from "../../../context/SoundContext";
import { handleVolumeChange } from "../../functions/handleVolumeChange";
import { checkboxHandler } from "../../functions/checkboxHandler";

const AudioManager = () => {
  const { sounds, setSounds } = useContext(SoundContext);
  const soundSettings = [
    { name: "musicVolume", label: "Musik" },
    { name: "textVolume", label: "Text" },
    { name: "clickVolume", label: "Klicken" },
    { name: "masterVolume", label: "Alles" },
  ];

  return (
    <>
      {soundSettings.map((item) => (
        <div key={item.name}>
          <h2>{item.label}</h2>
          <div>
            <input
              type="range"
              name={item.name}
              value={sounds[item.name] * 100}
              disabled={sounds.masterVolume <= 0}
              onChange={(e) =>
                handleVolumeChange(e.target.name, e.target.value, setSounds)
              }
            />

            <input
              type="checkbox"
              onChange={(e) => checkboxHandler(e.target.name, setSounds)}
              disabled={sounds.masterVolume <= 0}
              checked={sounds[item.name] <= 0 ? true : false}
              name={item.name}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default AudioManager;
