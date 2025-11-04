import { NavLink, useNavigate } from "react-router-dom";
import "./options.css";
import { useContext, useEffect, useRef, useState } from "react";
import { SoundContext } from "../../context/SoundContext";
import Rate from "../rate/Rate";
import { handleKeyDown } from "../functions/handleKeyDown";

function Options({ quickMenu }) {
  const { sounds, setSounds } = useContext(SoundContext);
 
  const navigate = useNavigate();

  const focusableRef = useRef([]); // ref array für die Buttons

  const [focusedIndex, setFocusedIndex] = useState(0);

  // Tastaturnavigation
useEffect(() => {
  const listener = (e) => handleKeyDown(e, focusableRef, focusedIndex, setFocusedIndex);
  window.addEventListener("keydown", listener);
  return () => window.removeEventListener("keydown", listener);
}, [focusedIndex]);

  // Fokus setzen
  useEffect(() => {
    if (focusableRef.current[focusedIndex]) {
      focusableRef.current[focusedIndex].focus();
    }
  }, [focusedIndex]);



  return (
    <>{ sounds.options ? "" : <div>
        <button
          onClick={() => {
            setSounds((prev) => ({ ...prev, hidePlayer: false, options: "music" }));
          }}
          style={{background: sounds.options === "music" ? "red" : ""}}
          disabled={sounds.options === "music"}
        >
          Musik
        </button>

        <button
          onClick={() => {
            setSounds((prev) => ({ ...prev, options: "type-rate" }));
          }}
          style={{background: sounds.options === "type-rate" ? "red" : ""}}
          disabled={sounds.options === "type-rate"}
        >
          Schreibgeschwindigkeit
        </button>
      </div>}

      {sounds.options === "type-rate" ? <Rate /> : ""}
      {!sounds.hidePlayer || quickMenu || sounds.options ? (
        ""
      ) : (
        <button
          onClick={() => {
            setSounds((prev) => ({ ...prev, hidePlayer: true })), navigate("/");
          }}
        >
          Zurück
        </button>
      )}
    </>
  );
}

export default Options;
