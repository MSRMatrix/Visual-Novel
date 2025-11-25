import { NavLink, useNavigate } from "react-router-dom";
import "./options.css";
import { useContext, useEffect, useRef, useState } from "react";
import { SoundContext } from "../../context/SoundContext";
import Rate from "../rate/Rate";
import { handleKeyDown } from "../functions/handleKeyDown";
import { WriteContext } from "../../context/WriteContext";

function Options({ action, setAction }) {
  const { sounds, setSounds } = useContext(SoundContext);
  const { writeSpeed, setWriteSpeed } = useContext(WriteContext);
  const navigate = useNavigate();
  const focusableRef = useRef([]); 
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [exampleFinished, setExampleFinished] = useState(false);
  const [active, setActive] = useState(false);
  const buttonRefs = useRef([]);

  const buttonItems = [
    {name: "Musik", onClick: () => { setSounds((prev) => ({ ...prev, hidePlayer: false, options: "music", })); setFocusedIndex(0)}, disabled: sounds.options === "music"},
    {name: "Schreibgeschwindigkeit", onClick: () => { setSounds((prev) => ({ ...prev, options: "type-rate" })); setFocusedIndex(0) }, disabled: sounds.options === "type-rate"},  
    {name: "Zurück", onClick: () => backFunction(), disabled: false}
  ]

  // Tastaturnavigation
  useEffect(() => {
    if(sounds.hidePlayer){
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        setFocusedIndex((prev) => (prev + 1) % buttonItems.length);
      } else if (e.key === "ArrowUp") {
        setFocusedIndex((prev) =>
          prev === 0 ? buttonItems.length - 1 : prev - 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }
  }, [focusedIndex, sounds.hidePlayer, active]);

  // Fokus setzen
// useEffect(() => {
//   if (!sounds.hidePlayer) return;

//   const timer = setTimeout(() => {
//     const current = focusableRef.current[focusedIndex];
//     if (!current) return;

//     if (current.disabled && focusableRef.current[focusedIndex].textContent !== "Test") {
//       const focusables = focusableRef.current.filter(Boolean);
//       let nextIndex = (focusedIndex + 1) % focusables.length;

//       while (focusableRef.current[nextIndex]?.disabled) {
//         nextIndex = (nextIndex + 1) % focusables.length;
//       }
//       setFocusedIndex(nextIndex);
//       focusableRef.current[nextIndex]?.focus();
//     } else {
//       current.focus();
//     }
//   }, 0); // 🔹 Wartet bis nach dem Render-Zyklus

//   return () => clearTimeout(timer);
// }, [focusedIndex, sounds.hidePlayer, writeSpeed, active]); 

useEffect(() => {
    buttonRefs.current[focusedIndex]?.focus();
  }, [focusedIndex]);


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
          {buttonItems.map((item, index) => 
          <button key={item.name}ref={(el) => (buttonRefs.current[index] = el)} onClick={item.onClick} disabled={item.disabled}>{item.name}</button>
          )}
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
    
    </>
  );
}

export default Options;
