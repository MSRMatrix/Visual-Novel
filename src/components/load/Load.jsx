import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LoadContext } from "../../context/LoadContext";

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

  if (!existing) {
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
    })
    navigate("/start")
  }
  
  
  return (
    <>
     {saves.map((item, key) => (
        <div key={key} onClick={() => handleLoad(item.name)}>
          <h2>{item.name}</h2>
       <p>{item.timestamp ? `Gespeichert am: ${item.timestamp}` : ""}</p>
          <p>{item.currentChapter ? `Kapitel: ${item.currentChapter}` : ""}</p>
          <p>
            {item.currentScene ? `Szene im Kapitel: ${item.currentScene}` : ""}
          </p>
          <p>{item.stepIndex ? `Punkt im Szene: ${item.stepIndex}` : ""}</p>
          <p>{item.playTime ? `Spielzeit: ${item.playTime}` : ""}</p>
        </div>
      ))}
     <NavLink to="/">Zurück</NavLink>
    </>
  );
}

export default Load;
