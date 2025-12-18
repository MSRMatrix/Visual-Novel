import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { SoundContext } from "../../context/SoundContext";
import { handleMenuAction } from "./handleMenuAction";
import { useSimpleFocusMode } from "../modes/useSimpleFocusMode";

function Dashboard() {
  const { sounds, setSounds } = useContext(SoundContext);
  const navigate = useNavigate("");
  const buttonRefs = useRef([]);
  const [focusedIndex, setFocusedIndex] = useState(0);

const menuItems = ["start", "load", "options", "options-panel"];

const labels = {
  start: "Start",
  load: "Spiel laden",
  options: "Optionen",
  "options-panel": "Optionen Panel",
};


  const ifDeps = false;
  const effectDeps = [focusedIndex, sounds.hidePlayer];

  useSimpleFocusMode({
    ifDeps,
    effectDeps,
    arrayItem: menuItems,
    focusedIndex,
    setFocusedIndex,
    arrayFocus: buttonRefs,
  });

  // Einen weiteren Punkt zum auswählen um Daten zu importieren und exportieren bzw auch alles löschen
  // Einen weiteren Punkt zum auswählen um Daten zu importieren und exportieren bzw auch alles löschen
  
  return (
    <div className="dashboard">
      {menuItems.map((route, index) => (
        <button
          key={route}
          ref={(el) => (buttonRefs.current[index] = el)}
          onClick={() =>
            handleMenuAction(route, navigate, setSounds)
          }
          onBlur={() => buttonRefs.current[focusedIndex]?.focus()}
          disabled={false}
          data-nosound="false"
          className="menu-button"
        >
          {labels[route] || route}
        </button>
      ))}
    </div>
  );
}

export default Dashboard;
