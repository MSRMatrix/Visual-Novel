import "./credits.css";

import { useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";

import { SoundContext } from "../../context/AppProviders";
import { useSimpleFocusMode } from "../modes/useMode";

const Credits = () => {
  const game_music = import.meta.env.VITE_GAME_MUSIC;
  const menu_music = import.meta.env.VITE_MENU_MUSIC;
  const { sounds, setSounds } = useContext(SoundContext);
  const navigate = useNavigate();
  const [focusedIndex, setFocusedIndex] = useState(0); 
  const buttonRefs = useRef([]);
  
  const labels = {
    restart: "Neustart",
    menu: "Menü",
  };

  const menuItems = ["Neustart","Menü"];

const ifDeps = false;
const effectDeps = [focusedIndex, sounds.hidePlayer];

useSimpleFocusMode({
  ifDeps,
  effectDeps,
  arrayItem: menuItems,
  focusedIndex,
  setFocusedIndex,
  arrayFocus: buttonRefs
});



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
