import { useContext } from "react";
import ActionButton from "../../text/ActionButton";
import { SoundContext } from "../../../context/SoundContext";
import { handleSound } from "../../functions/handleSound";
import click1 from "../../../sound/normalClick.wav";
import click2 from "../../../sound/normalClick2.mp3";
import click3 from "../../../sound/boopClick.wav";
import useSound from "use-sound";

const Click = () => {
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

  const { sounds, setSounds } = useContext(SoundContext);

  return (
    <>
      {Object.keys(players.click).map((key) => (
        <ActionButton
          key={key}
          name={key}
          customFunction={(e) => {
            handleSound("click", key, e, players, soundFiles, setSounds);
          }}
          disabled={sounds.click === soundFiles[key]}
          dataNosound={false}
          style={{
            background: sounds.click === soundFiles[key] ? "blue" : "",
          }}
        />
      ))}
    </>
  );
};

export default Click;
