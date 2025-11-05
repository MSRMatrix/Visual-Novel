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

  useEffect(() => {
    const listener = (e) =>
      handleKeyDown(e, focusableRef, focusedIndex, setFocusedIndex);
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [focusedIndex]);

  // Fokus setzen
  useEffect(() => {
    if (focusableRef.current[focusedIndex]) {
      focusableRef.current[focusedIndex].focus();
    }
  }, [focusedIndex]);

  return (
    <>
      <div>
        <h1>Irgendwelche Namen</h1>
        <p>Weiteres</p>
      </div>
      <button
        ref={(el) => (focusableRef.current[0] = el)}
        onClick={() => {
          setSounds((prev) => ({ ...prev, url: game_music })),
            navigate("/start");
        }}
      >
        Neustart
      </button>
      <button
        ref={(el) => (focusableRef.current[1] = el)}
        onClick={() => {
          setSounds((prev) => ({ ...prev, url: menu_music })), navigate("/");
        }}
      >
        Menü
      </button>
    </>
  );
};

export default Credits;
