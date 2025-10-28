import { NavLink } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import "./dashboard.css";
import { SoundContext } from "../../context/SoundContext";

function Dashboard() {
  const game_music = import.meta.env.VITE_GAME_MUSIC;
  const { sounds, setSounds } = useContext(SoundContext);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [activeMenu, setActiveMenu] = useState(true);

  // useRef als Array um den Fokus variable zu halten
  const buttonRefs = useRef([]);
  // useRef als Array um den Fokus variable zu halten

  // Funktion um den Index zu wechseln
  const focusButton = (index) => {
    buttonRefs.current[index]?.focus();
  };
  // Funktion um den Index zu wechseln

  // Um den Code im return zu verkürzen
  const labels = {
    start: "Start",
    load: "Spiel laden",
    options: "Optionen",
  };
  // Um den Code im return zu verkürzen

  // Tastenhandler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        setFocusedIndex((prev) => (prev + 1) % buttonRefs.current.length);
      } else if (e.key === "ArrowUp") {
        setFocusedIndex((prev) =>
          prev === 0 ? buttonRefs.current.length - 1 : prev - 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  // Tastenhandler

  // Verschiebt den Index
  useEffect(() => {
    focusButton(focusedIndex);
  }, [focusedIndex]);
  // Verschiebt den Index

  // Aktion Funktion
  function handleMenuAction(route) {
    if (route === "load") return;

    if (route === "start") {
      setSounds((prev) => ({ ...prev, url: game_music, playing: true }));
      return;
    }
    if (route === "options") {
      setSounds((prev) => ({ ...prev, hidePlayer: false }));
      return;
    } else {
      return;
    }
  }
   // Aktion Funktion

  return (
    <div className="dashboard">
      {["start", "load", "options"].map((route, i) => (
        <NavLink
          onClick={() => {
            setActiveMenu(false), handleMenuAction(route);
          }}
          key={route}
          to={route}
          ref={(el) => (buttonRefs.current[i] = el)}
          onBlur={() => {
            if (activeMenu) {
              buttonRefs.current[focusedIndex]?.focus();
            }
          }}
           // macht fokussierbar, wichtig für Links
          tabIndex={0}
           // macht fokussierbar, wichtig für Links
        >
          {labels[route] || ""}
        </NavLink>
      ))}
    </div>
  );
}

export default Dashboard;
