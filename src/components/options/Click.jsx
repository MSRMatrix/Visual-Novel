import { useContext, useEffect } from "react";
import { handleSound } from "../../game/engine/handleSound";
import { click1, click2, click3 } from "./soundEffects";
import useSound from "use-sound";
import { SoundContext } from "../../context/AppProviders";

const Click = ({ focusableRef, startIndex }) => {
  const { sounds, setSounds } = useContext(SoundContext);

  const [playClick1, { stop: stopClick1 }] = useSound(click1);
  const [playClick2, { stop: stopClick2 }] = useSound(click2);
  const [playClick3, { stop: stopClick3 }] = useSound(click3);

  const players = {
    click: {
      click1: { play: playClick1, stop: stopClick1 },
      click2: { play: playClick2, stop: stopClick2 },
      click3: { play: playClick3, stop: stopClick3 },
    },
  };

  const soundFiles = {
    click1,
    click2,
    click3,
  };

  useEffect(() => {
    if (focusableRef.current[startIndex]) {
      focusableRef.current[startIndex].focus();
    }
  }, [focusableRef, startIndex]);

  return (
    <div>
      {Object.keys(players.click).map((key, i) => (
        <button
          ref={(el) => (focusableRef.current[startIndex + i] = el)}
          key={key}
          name={key}
          onClick={(e) => {
            handleSound("click", key, e, players, soundFiles, setSounds);
          }}
          disabled={sounds.click === soundFiles[key]}
          data-nosound
        >
          {key}
        </button>
      ))}
    </div>
  );
};

export default Click;
