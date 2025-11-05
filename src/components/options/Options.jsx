import { NavLink, useNavigate } from "react-router-dom";
import "./options.css";
import { useContext, useEffect, useRef, useState } from "react";
import { SoundContext } from "../../context/SoundContext";
import Rate from "../rate/Rate";
import { handleKeyDown } from "../functions/handleKeyDown";

function Options({ quickMenu }) {
  const { sounds, setSounds } = useContext(SoundContext);
  const navigate = useNavigate();
  const focusableRef = useRef([]); 
  const [focusedIndex, setFocusedIndex] = useState(0);

  console.log(focusedIndex);
  
  // Tastaturnavigation
  useEffect(() => {
    if(sounds.hidePlayer){
    const listener = (e) =>
      handleKeyDown(e, focusableRef, focusedIndex, setFocusedIndex);
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }
  }, [focusedIndex, sounds.hidePlayer]);

  // Fokus setzen
  useEffect(() => {
    if(sounds.hidePlayer){
    if (focusableRef.current[focusedIndex]) {
      focusableRef.current[focusedIndex].focus();
    }
  }
  }, [focusedIndex, sounds.hidePlayer]);


  return (
    <>
      {sounds.options ? (
        ""
      ) : (
        <div>
          <button
          ref={(el) => (focusableRef.current[0] = el)}
            onClick={() => {
              setSounds((prev) => ({
                ...prev,
                hidePlayer: false,
                options: "music",
              }));
              setFocusedIndex(0)
            }}
            style={{ background: sounds.options === "music" ? "red" : "" }}
            disabled={sounds.options === "music"}
          >
            Musik
          </button>

          <button
          ref={(el) => (focusableRef.current[1] = el)}
            onClick={() => {
              setSounds((prev) => ({ ...prev, options: "type-rate" }));
              setFocusedIndex(0)
            }}
            style={{ background: sounds.options === "type-rate" ? "red" : "" }}
            disabled={sounds.options === "type-rate"}
          >
            Schreibgeschwindigkeit
          </button>
        </div>
      )}

      {sounds.options === "type-rate" ? (
        <Rate focusableRef={focusableRef} startIndex={0} setFocusedIndex={setFocusedIndex}/>
      ) : (
        ""
      )}
      {!sounds.hidePlayer || quickMenu || sounds.options ? (
        ""
      ) : (
        <button
        ref={(el) => (focusableRef.current[2] = el)}
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
