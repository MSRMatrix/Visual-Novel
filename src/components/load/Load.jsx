import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LoadContext } from "../../context/LoadContext";
import { formatTime } from "../functions/formatTime";
import { handleKeyDown } from "../functions/handleKeyDown";

function Load() {
    const {load, setLoad} = useContext(LoadContext)
    const navigate = useNavigate()
const [saves, setSaves] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("vn_saves")) || [];
    return stored.length
      ? stored
      : [
          { name: "Speicherplatz 1" },
          { name: "Speicherplatz 2" },
          { name: "Speicherplatz 3" },
          { name: "Speicherplatz 4" },
          { name: "Speicherplatz 5" },
        ];
  });

  function handleLoad(slotName){
    
    const saves = JSON.parse(localStorage.getItem("vn_saves") || "[]");
  const existing = saves.find((s) => s.name === slotName);
  
  
  if (!existing.timestamp) {
    console.log("Kein Speicherstand gefunden!");
    return;
  } 
  if(!confirm(`Möchtest du mit Spielstand ${slotName} fortfahren?`)){
    console.log(`Laden abgebrochen!`);
    return 
  }
  setLoad({
      currentChapter: existing.currentChapter,
      currentScene: existing.currentScene,
      stepIndex: existing.stepIndex,
      chatHistory: existing.chatHistory,
      playTime: existing.playTime,
      choice: existing.showChoices
    })
    navigate("/start")
  }


    const focusableRef = useRef([]);

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
    <>
     {saves.map((item, index) => (
        <button disabled={!item.timestamp} ref={(el) => (focusableRef.current[0 + index] = el)} key={item.name} onClick={() => handleLoad(item.name)}>
          <h2>{item.name}</h2>
       <p>{item.timestamp ? `Gespeichert am: ${item.timestamp}` : ""}</p>
          <p>{item.currentChapter ? `Kapitel: ${item.currentChapter}` : ""}</p>
          <p>
            {item.currentScene ? `Szene im Kapitel: ${item.currentScene}` : ""}
          </p>
          <p>{item.stepIndex ? `Punkt im Szene: ${item.stepIndex}` : ""}</p>
          <p>{item.playTime ? `Spielzeit: ${formatTime(item.playTime)}` : ""}</p>
        </button>
      ))}
     <button ref={(el) => (focusableRef.current[5] = el)}  onClick={() => navigate("/")}>Zurück</button>
    </>
  );
}

export default Load;
