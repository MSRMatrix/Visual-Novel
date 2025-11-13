import { useEffect, useRef, useState } from "react";
import { story } from "../../text/data/story";
import { handleKeyDown } from "../../functions/handleKeyDown";
import { buildBacklog } from "../../functions/buildBacklog";

function Backlog({ currentChapter, currentScene, stepIndex, chatHistory, setAction, showChoices, quickMenu, action}) {

  const steps = buildBacklog(chatHistory, story, currentChapter, currentScene, stepIndex);

  const focusableRef = useRef([]);

  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
  if(action === "backlog"){
  const listener = (e) => handleKeyDown(e, focusableRef, focusedIndex, setFocusedIndex);
  window.addEventListener("keydown", listener);
  return () => window.removeEventListener("keydown", listener);
}
}, [focusedIndex, showChoices, quickMenu, action]);

  // Fokus setzen
  useEffect(() => {
     if(action === "backlog"){
    if (focusableRef.current[focusedIndex]) {
      focusableRef.current[focusedIndex].focus();
    } 
     }
  }, [focusedIndex, showChoices, quickMenu, action]);

  // Einen Scroller einfügen um die Texte durchlesen zu können wenn er zulang wird

  return (
    <>
      <h2>Backlog</h2>
      <ul>
        {steps.map((step, i) => (
          <li key={i} style={{background: step.speaker === "Spieler" ? "red" : "royalblue"}}>
            <strong>{step.speaker}:</strong> {step.text}
          </li>
        ))}
      </ul>
       <button
        ref={(el) => (focusableRef.current[0] = el)}
          onClick={() => setAction("")}
        >
          Zurück
        </button>
    </>
  );
}

export default Backlog;
