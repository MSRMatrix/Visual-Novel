import "./dashboard.css";

import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";

import { LoadingOverlay, SoundContext } from "../../context/AppProviders";
import { handleMenuAction } from "./handleMenuAction";
import { useSimpleFocusMode } from "../modes/useMode";

function Dashboard() {
  
  const navigate = useNavigate("");

  const { sounds, setSounds } = useContext(SoundContext);
  const { loadingOverlay, setLoadingOverlay } = useContext(LoadingOverlay);

  const buttonRefs = useRef([]);

  const [focusedIndex, setFocusedIndex] = useState(0);
  

const menuItems = ["start", "load", "options", "data-options"];

const labels = {
  start: "Start",
  load: "Spiel laden",
  options: "Optionen",
  "data-options": "Daten Verwaltung",
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
    <>
    {loadingOverlay.loader ? "" : <div className="dashboard">
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
    
    </>
    
  );
}

export default Dashboard;
