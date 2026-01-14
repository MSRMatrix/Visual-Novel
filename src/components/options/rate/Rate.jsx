import { useContext, useEffect, useRef, useState } from "react";
import { useTypeWriteMode } from "./modes/useTypeWriteMode";
import { showSpeedRate, writespeedHandler } from "./functions/writeFunctions";
import { SoundContext, WriteContext } from "../../../context/AppProviders";

function Rate({ active, setActive }) {
  const { writeSpeed, setWriteSpeed } = useContext(WriteContext);
  const { sounds, setSounds } = useContext(SoundContext);

  const focusableRef = useRef([]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [displayExample, setDisplayExample] = useState("");
  // Speed Presets
  const speed = [
    { name: "Schnell", rate: 40 },
    { name: "Normal", rate: 70 },
    { name: "Langsam", rate: 100 },
  ];

  // Beispieltext
  const [example] = useState({
    text: "Das ist hier ein Beispieltext",
  });

  const [keyCatcher, setKeyCatcher] = useState("");

  // TYPEWRITER-EFFEKT
  useTypeWriteMode({
    active,
    setDisplayExample,
    writeSpeed,
    example,
    setActive,keyCatcher,setKeyCatcher
  });
  // TYPEWRITER-EFFEKT

  useEffect(() => {
    if (!sounds.hidePlayer) return;
    const handleKeyDown = (e) => {
      setKeyCatcher(e.key);
     if (e.key === "ArrowDown") {
  setFocusedIndex((prevIndex) => {
    let next = (prevIndex + 1) % focusableRef.current.length;
    while (focusableRef.current[next]?.disabled) {
      next = (next + 1) % focusableRef.current.length;
    }
    return next;
  });
}

if (e.key === "ArrowUp") {
  setFocusedIndex((prevIndex) => {
    let next = (prevIndex - 1 + focusableRef.current.length) % focusableRef.current.length;
    while (focusableRef.current[next]?.disabled) {
      next = (next - 1 + focusableRef.current.length) % focusableRef.current.length;
    }
    return next;
  });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sounds.hidePlayer]);

  useEffect(() => {
    focusableRef.current[focusedIndex]?.focus();
  }, [focusedIndex]);

  useEffect(() => {
    focusableRef.current = [];
    setFocusedIndex(0);
  }, [sounds.options]);

  function writeHelper(e) {
    if(keyCatcher === "ArrowUp" || keyCatcher === "ArrowDown") {setKeyCatcher("");return}
    writespeedHandler(e.target.value, setWriteSpeed);
  }

  return (
    <>
      <div>
        <h1>Beispieltext</h1>

        <p>{displayExample}</p>
        <p>Aktuelle Geschwindigkeit: {showSpeedRate(writeSpeed)}</p>

        {/* Range Input */}
        <input
          ref={(el) => (focusableRef.current[0] = el)}
          value={writeSpeed}
          type="range"
          max={150}
          min={15}
          onChange={writeHelper}
        />

        {/* Preset Buttons */}
        <div style={{ display: "flex" }}>
          {speed.map((item, i) => (
            <button
              key={item.name}
              ref={(el) => (focusableRef.current[i + 1] = el)}
              value={item.rate}
              disabled={item.rate === writeSpeed || active}
              onClick={writeHelper}
            >
              {item.name}
            </button>
          ))}

          {/* Test Button */}
          <button
            disabled={active}
            ref={(el) => (focusableRef.current[speed.length + 1] = el)}
            onClick={() => setActive(true)}
          >
            Test
          </button>
        </div>

        {/* Zurück */}
        <button
          ref={(el) => (focusableRef.current[speed.length + 2] = el)}
          onClick={() => {
            setSounds((prev) => ({ ...prev, options: "" }));
            setFocusedIndex(0);
            setDisplayExample("");
            setActive(false);
          }}
        >
          Zurück
        </button>
      </div>
    </>
  );
}

export default Rate;
