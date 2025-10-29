import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import "./dashboard.css";
import { SoundContext } from "../../context/SoundContext";
import ActionButton from "../text/ActionButton";
import { handleMenuAction } from "../functions/handleMenuAction";

function Dashboard() {
  const { sounds, setSounds } = useContext(SoundContext);
  const [activeMenu, setActiveMenu] = useState(true);
  const navigate = useNavigate("");
  const buttonRefs = useRef([]);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const labels = {
    start: "Start",
    load: "Spiel laden",
    options: "Optionen",
  };

  const menuItems = ["start", "load", "options"];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        setFocusedIndex((prev) => (prev + 1) % menuItems.length);
      } else if (e.key === "ArrowUp") {
        setFocusedIndex((prev) => (prev === 0 ? menuItems.length - 1 : prev - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fokussieren
  useEffect(() => {
    buttonRefs.current[focusedIndex]?.focus();
  }, [focusedIndex]);

  return (
    <div className="dashboard">
      {menuItems.map((route, index) => (
        <ActionButton
          key={route}
          name={route}
          label={labels[route] || route}
          customFunction={() =>
            handleMenuAction(route, navigate, setSounds, setActiveMenu)
          }
          disabled={false}
          dataNosound={false}
          buttonRef={(el) => (buttonRefs.current[index] = el)}
          onBlur={() => buttonRefs.current[focusedIndex]?.focus()}
        />
      ))}
    </div>
  );
}

export default Dashboard;
