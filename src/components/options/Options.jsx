import { NavLink, useNavigate } from "react-router-dom";
import "./options.css";
import { useContext, useEffect, useRef, useState } from "react";
import { SoundContext } from "../../context/SoundContext";
import Rate from "../rate/Rate";
import { handleKeyDown } from "../functions/handleKeyDown";
import { WriteContext } from "../../context/WriteContext";

function Options({ quickMenu, action, setAction }) {
  const { sounds, setSounds } = useContext(SoundContext);
  const { writeSpeed, setWriteSpeed } = useContext(WriteContext);
  const navigate = useNavigate();
  const focusableRef = useRef([]); 
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [exampleFinished, setExampleFinished] = useState(false);
  const [active, setActive] = useState(false);
  
  // Tastaturnavigation
  useEffect(() => {
    if(sounds.hidePlayer){
    const listener = (e) =>
      handleKeyDown(e, focusableRef, focusedIndex, setFocusedIndex, active);
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }
  }, [focusedIndex, sounds.hidePlayer, active]);

  // Fokus setzen
useEffect(() => {
  if (!sounds.hidePlayer) return;

  const timer = setTimeout(() => {
    const current = focusableRef.current[focusedIndex];
    if (!current) return;

    if (current.disabled && focusableRef.current[focusedIndex].textContent !== "Test") {
      const focusables = focusableRef.current.filter(Boolean);
      let nextIndex = (focusedIndex + 1) % focusables.length;

      while (focusableRef.current[nextIndex]?.disabled) {
        nextIndex = (nextIndex + 1) % focusables.length;
      }

      setFocusedIndex(nextIndex);
      focusableRef.current[nextIndex]?.focus();
    } else {
      current.focus();
    }
  }, 0); // 🔹 Wartet bis nach dem Render-Zyklus

  return () => clearTimeout(timer);
}, [focusedIndex, sounds.hidePlayer, writeSpeed, active]);


  function backFunction(){
    if(action){
      setAction("")
      return
    } else{
     setSounds((prev) => ({ ...prev, hidePlayer: true })), navigate("/"); 
     return   
    }  
  }


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
        <Rate focusableRef={focusableRef} startIndex={0} setFocusedIndex={setFocusedIndex}
        setExampleFinished={setExampleFinished}
        active={active} 
        setActive={setActive} />
      ) : (
        ""
      )}
      {!sounds.hidePlayer || sounds.options ? (
        ""
      ) : (
        <button
        ref={(el) => (focusableRef.current[2] = el)}
          onClick={() => backFunction()}
        >
          Zurück
        </button>
      )}
    </>
  );
}

export default Options;
