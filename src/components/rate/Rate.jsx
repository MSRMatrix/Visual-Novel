import { useContext } from "react";
import { showSpeedRate, writespeedHandler } from "../functions/writeFunctions";
import { WriteContext } from "../../context/WriteContext";
import { SoundContext } from "../../context/SoundContext";

function Rate() {
  const { writeSpeed, setWriteSpeed } = useContext(WriteContext);
  const { sounds, setSounds } = useContext(SoundContext);
  return (
    <>
      <div>
        <p>Aktuelle Geschwindigkeit: {showSpeedRate(writeSpeed)} </p>
        <input
          value={writeSpeed}
          type="range"
          max={150}
          min={15}
          onChange={(e) => writespeedHandler(e.target.value, setWriteSpeed)}
        />
        <div style={{ display: "flex" }}>
          <button
            disabled={writeSpeed === 40}
            value={40}
            onClick={(e) => writespeedHandler(e.target.value, setWriteSpeed)}
          >
            Schnell
          </button>
          <button
            disabled={writeSpeed === 70}
            value={70}
            onClick={(e) => writespeedHandler(e.target.value, setWriteSpeed)}
          >
            Normal
          </button>
          <button
            disabled={writeSpeed === 100}
            value={100}
            onClick={(e) => writespeedHandler(e.target.value, setWriteSpeed)}
          >
            Langsam
          </button>
        </div>
        <button onClick={() => setSounds((prev) => ({...prev, options: ""}))}>Zurück</button>
      </div>
    </>
  );
}

export default Rate;
