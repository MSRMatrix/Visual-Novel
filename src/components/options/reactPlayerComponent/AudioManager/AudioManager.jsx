import { useContext, useEffect } from "react";
import { checkboxHandler } from "../../../functions/checkboxHandler";
import { handleVolumeChange } from "../../../functions/handleVolumeChange";
import { SoundContext } from "../../../../context/AppProviders";

const AudioManager = ({
  focusableRef,
  startIndex,
  keyCatcher,
  setKeyCatcher,
}) => {
  const { sounds, setSounds } = useContext(SoundContext);
  const soundSettings = [
    { name: "musicVolume", label: "Musik" },
    { name: "textVolume", label: "Text" },
    { name: "clickVolume", label: "Klicken" },
    { name: "masterVolume", label: "Alles" },
  ];

  useEffect(() => {
    if (focusableRef.current[startIndex]) {
      focusableRef.current[startIndex].focus();
    }
  }, [focusableRef, startIndex]);

  return (
    <>
      {soundSettings.map((item, i) => (
        <div key={item.name}>
          <h2>{item.label}</h2>
          <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"}}>
            <input
              ref={(el) => (focusableRef.current[startIndex + i * 2] = el)}
              type="range"
              name={item.name}
              value={sounds[item.name] * 100}
              disabled={
                item.name !== "masterVolume" && sounds.masterVolume <= 0
              }
              onChange={(e) =>
                handleVolumeChange(
                  e.target.name,
                  e.target.value,
                  setSounds,
                  keyCatcher,
                  setKeyCatcher
                )
              }
            />

            <label className="vn-checkbox">
  <input
    ref={(el) => (focusableRef.current[startIndex + i * 2 + 1] = el)}
    type="checkbox"
    onChange={(e) =>
      checkboxHandler(
        e.target.name,
        setSounds,
        keyCatcher,
        setKeyCatcher
      )
    }
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        checkboxHandler(e.target.name, setSounds);
      }
    }}
    disabled={
      item.name !== "masterVolume" && sounds.masterVolume <= 0
    }
    checked={sounds[item.name] <= 0}
    name={item.name}
  />

  <span className="checkmark"></span>
</label>

          </div>
        </div>
      ))}
    </>
  );
};

export default AudioManager;
