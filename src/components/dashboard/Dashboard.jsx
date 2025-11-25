import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import "./dashboard.css";
import { SoundContext } from "../../context/SoundContext";
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
        setFocusedIndex((prev) =>
          prev === 0 ? menuItems.length - 1 : prev - 1
        );
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
  <button
    key={route}
    ref={(el) => (buttonRefs.current[index] = el)}
    onClick={() =>
      handleMenuAction(route, navigate, setSounds, setActiveMenu)
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
