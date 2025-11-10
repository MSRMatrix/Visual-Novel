import { useContext, useEffect, useState } from "react";
import { showSpeedRate, writespeedHandler } from "../functions/writeFunctions";
import { WriteContext } from "../../context/WriteContext";
import { SoundContext } from "../../context/SoundContext";

function Rate({
  focusableRef,
  startIndex,
  setFocusedIndex,
  setExampleFinished,
  active,
  setActive,
}) {
  const { writeSpeed, setWriteSpeed } = useContext(WriteContext);
  const { sounds, setSounds } = useContext(SoundContext);

  const speed = [
    { name: "Schnell", rate: 40 },
    { name: "Normal", rate: 70 },
    { name: "Langsam", rate: 100 },
  ];

  const [example, setExample] = useState({
    text: "Das ist hier ein Beispieltext",
    rate: writeSpeed,
  });

  const [displayExample, setDisplayExample] = useState("");

  useEffect(() => {
    if (!active) return;
    setTimeout(() => {
      setDisplayExample("");
      setExampleFinished(false);

      let i = -1;

      const interval = setInterval(() => {
        if (i < example.text.length) {
          setDisplayExample((prev) => prev + example.text.charAt(i));
          i++;
        } else {
          clearInterval(interval);
          setExampleFinished(true);
          setActive(false);
        }
      }, writeSpeed);

      return () => clearInterval(interval);
    }, 20);
  }, [active, writeSpeed]);

  function writeHelper(e) {
    if (active) return;
    writespeedHandler(e.target.value, setWriteSpeed);
  }

  return (
    <>
      <div>
        <h1>Beispieltext</h1>
        <p>{displayExample}</p>
        <p>Aktuelle Geschwindigkeit: {showSpeedRate(writeSpeed)} </p>
        <input
          ref={(el) => (focusableRef.current[0] = el)}
          value={writeSpeed}
          type="range"
          max={150}
          min={15}
          onChange={(e) => writeHelper(e)}
        />
        <div style={{ display: "flex" }}>
          {speed.map((item, i) => (
            <button
              ref={(el) => (focusableRef.current[startIndex + i + 1] = el)}
              value={item.rate}
              disabled={item.rate === writeSpeed}
              key={item.name}
              onClick={(e) => writeHelper(e)}
            >
              {item.name}
            </button>
          ))}

          <button
            disabled={active}
            ref={(el) =>
              (focusableRef.current[startIndex + speed.length + 1] = el)
            }
            onClick={() => setActive(true)}
          >
            Test
          </button>
        </div>
        <button
          ref={(el) =>
            (focusableRef.current[startIndex + speed.length + 2] = el)
          }
          onClick={() => {
            setSounds((prev) => ({ ...prev, options: "" })),
              setFocusedIndex(0),
              setDisplayExample(""),
              setExampleFinished(true),
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
