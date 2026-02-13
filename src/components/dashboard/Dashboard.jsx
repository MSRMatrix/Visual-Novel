import "./dashboard.css";

import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";

import { LoadingOverlay, SoundContext } from "../../context/AppProviders";
import { useSimpleFocusMode } from "../../game/modes/useMode";
import { handleMenuAction } from "../../game/engine/functions";

function Dashboard() {
  
  const navigate = useNavigate("");

  const { sounds, setSounds } = useContext(SoundContext);
  const { loadingOverlay, setLoadingOverlay } = useContext(LoadingOverlay);

  const buttonRefs = useRef([]);

  const [focusedIndex, setFocusedIndex] = useState(0);
  

const menuItems = ["start", "load-game", "options", "data-manager"];

const labels = {
  start: "Start",
  "load-game": "Spiel laden",
  options: "Optionen",
  "data-manager": "Daten Verwaltung",
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

    useEffect(() => {
      setLoadingOverlay((prev) => ({...prev, title: "Menü wird geladen", ready: true }))
    },[loadingOverlay.loader && !loadingOverlay.ready])

  
  return (
    <div className="dashboard">
    {loadingOverlay.loader ? "" : <div className="dashboard-container">
      {menuItems.map((route, index) => (
        <button
          key={route}
          ref={(el) => (buttonRefs.current[index] = el)}
          onClick={() =>
            handleMenuAction(route, navigate, setSounds, setLoadingOverlay)}
          onBlur={() => buttonRefs.current[focusedIndex]?.focus()}
          disabled={false}
          data-nosound="false"
          className="menu-button"
        >
          {labels[route] || route}
        </button>
      ))}
    </div>}
    
    </div>
    
  );
}

export default Dashboard;
