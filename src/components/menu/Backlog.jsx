import { useRef } from "react";

import { story } from "../../game/story/story";
import { buildBacklog } from "../../game/engine/functions";
import { useFocusMode, useKeyControl } from "../../game/modes/useMode";

function Backlog({setAction, action, currentStep, storyState, uiState, setUiState}) {

  const steps = buildBacklog(story, storyState);

  const focusableRef = useRef([]);
  
  const effectdeps =[ uiState.focusedIndex, uiState.quickMenu, action, currentStep.type === "choice" , currentStep.type === "game" ];
  const ifDeps = action === "backlog";

    // Tastaturnavigation
    useKeyControl({ focusableRef, currentStep, uiState, setUiState, effectdeps, ifDeps });
    // Tastaturnavigation
  
    // Fokus setzen
    useFocusMode({ focusableRef, currentStep, uiState , effectdeps, ifDeps });
    // Fokus setzen

  // Einen Scroller einfügen um die Texte durchlesen zu können wenn er zulang wird

  return (
   <div className="island-backlog">
  <div className="backlog-container">

    <h2 className="backlog-title">Backlog</h2>

    <ul className="backlog-list">
      {steps.map((step, i) => (
        <li
          key={i}
          className={`backlog-item ${
            step.speaker === "Spieler"
              ? "speaker-player"
              : "speaker-npc"
          }`}
        >
          <strong className="speaker-name">
            {step.speaker}:
          </strong>{" "}
          {step.text}
        </li>
      ))}
    </ul>

    <button
      className="island-button"
      ref={(el) => (focusableRef.current[0] = el)}
      onClick={() => setAction("")}
    >
      Zurück
    </button>

  </div>
</div>

  );
}

export default Backlog;
