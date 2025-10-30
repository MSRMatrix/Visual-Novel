import { useContext } from "react";
import ActionButton from "../../text/ActionButton";
import { SoundContext } from "../../../context/SoundContext";
import { handleSound } from "../../functions/handleSound";
import useSound from "use-sound";
import typing1 from "../../../sound/typing-1.wav";
import typing2 from "../../../sound/typing-2.mp3";
import typing3 from "../../../sound/typing-3.mp3";

const Write = () => {
  const { sounds, setSounds } = useContext(SoundContext);

  const [playTyping1, { stop: stopTyping1 }] = useSound(typing1);
  const [playTyping2, { stop: stopTyping2 }] = useSound(typing2);
  const [playTyping3, { stop: stopTyping3 }] = useSound(typing3);

  const players = {
    typing: {
      typing1: { play: playTyping1, stop: stopTyping1 },
      typing2: { play: playTyping2, stop: stopTyping2 },
      typing3: { play: playTyping3, stop: stopTyping3 },
    },
  };

  const soundFiles = {
    typing1,
    typing2,
    typing3,
  };

  return (
    <>
      {Object.keys(players.typing).map((key) => (
        <ActionButton
          key={key}
          name={key}
          customFunction={(e) => {
            handleSound("typing", key, e, players, soundFiles, setSounds);
          }}
          disabled={sounds.typing === soundFiles[key]}
          dataNosound={false}
          style={{
            background: sounds.typing === soundFiles[key] ? "blue" : "",
          }}
        />
      ))}
    </>
  );
};

export default Write;
