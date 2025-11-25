import { NavLink, useNavigate } from "react-router-dom";
import "./credits.css";
import { useContext, useEffect, useRef, useState } from "react";
import { SoundContext } from "../../context/SoundContext";
import { handleKeyDown } from "../functions/handleKeyDown";

const Credits = () => {
  const game_music = import.meta.env.VITE_GAME_MUSIC;
  const menu_music = import.meta.env.VITE_MENU_MUSIC;
  const { sounds, setSounds } = useContext(SoundContext);

  const focusableRef = useRef([]);
  const navigate = useNavigate();
  const [focusedIndex, setFocusedIndex] = useState(0); 
  const buttonRefs = useRef([]);
  
  const labels = {
    restart: "Neustart",
    menu: "Menü",
  };

  const menuItems = ["Neustart","Menü"];

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
    <>
      <div>
        <h1>Irgendwelche Namen</h1>
        <p>Weiteres</p>
      </div>

        {menuItems.map((route, index) => (
        <button
          key={route}
          ref={(el) => (buttonRefs.current[index] = el)}
          onClick={() => {
            console.log(route)
            
          setSounds((prev) => ({ ...prev, url: route === "Neustart" ? game_music : menu_music })),
            navigate(`/${route === "Neustart" ? "start" : ""}`);
        }}
          onBlur={() => buttonRefs.current[focusedIndex]?.focus()}
          disabled={false}
          data-nosound="false"
          className="menu-button"
        >
          {labels[route] || route}
        </button>
      ))}
    </>
  );
};

export default Credits;
