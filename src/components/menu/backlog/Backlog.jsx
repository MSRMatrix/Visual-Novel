import { useEffect, useRef, useState } from "react";
import { story } from "../../text/data/story";
import { handleKeyDown } from "../../functions/handleKeyDown";
import { buildBacklog } from "../../functions/buildBacklog";

function Backlog({setAction, quickMenu, action, currentStep, storyState}) {

  const steps = buildBacklog(story, storyState);

  const focusableRef = useRef([]);

  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
  if(action === "backlog"){
  const listener = (e) => handleKeyDown(e, focusableRef, focusedIndex, setFocusedIndex);
  window.addEventListener("keydown", listener);
  return () => window.removeEventListener("keydown", listener);
}
}, [focusedIndex, quickMenu, action, currentStep.type === "choice" , currentStep.type === "game"]);

  // Fokus setzen
  useEffect(() => {
     if(action === "backlog"){
    if (focusableRef.current[focusedIndex]) {
      focusableRef.current[focusedIndex].focus();
    } 
     }
  }, [focusedIndex, quickMenu, action, currentStep.type === "choice" , currentStep.type === "game"]);

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
