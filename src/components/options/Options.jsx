import { NavLink, useNavigate } from "react-router-dom";
import "./options.css";
import { useContext, useEffect, useRef, useState } from "react";
import { SoundContext } from "../../context/SoundContext";
import Rate from "../rate/Rate";

function Options({ action, setAction }) {
  const { sounds, setSounds } = useContext(SoundContext);
  const navigate = useNavigate();

  const [focusedIndex, setFocusedIndex] = useState(0);
  const [active, setActive] = useState(false);
  const buttonRefs = useRef([]);

  const buttonItems = [
    {
      name: "Musik",
      onClick: () => {
        setSounds((prev) => ({ ...prev, hidePlayer: false, options: "music" }));
        setFocusedIndex(0);
      },
      disabled: sounds.options === "music",
    },
    {
      name: "Schreibgeschwindigkeit",
      onClick: () => {
        setSounds((prev) => ({ ...prev, options: "type-rate" }));
        setFocusedIndex(0);
      },
      disabled: sounds.options === "type-rate",
    },
    { name: "Zurück", onClick: () => backFunction(), disabled: false },
  ];

  // Tastaturnavigation
  useEffect(() => {
    if (!sounds.hidePlayer) return;
      const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
          setFocusedIndex((prev) => (prev + 1) % buttonItems.length);
        } else if (e.key === "ArrowUp") {
          setFocusedIndex((prev) =>
            prev === 0 ? buttonItems.length - 1 : prev - 1
          );
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    
  }, [focusedIndex, sounds.hidePlayer, active]);

  useEffect(() => {
    buttonRefs.current[focusedIndex]?.focus();
  }, [focusedIndex]);

    useEffect(() => {
    buttonRefs.current = [];
    setFocusedIndex(0);
  }, [sounds.options]);

  function backFunction() {
    if (action) {
      setAction("");
      return;
    } else {
      setSounds((prev) => ({ ...prev, hidePlayer: true })), navigate("/");
      return;
    }
  }

  return (
    <>
      {sounds.options ? (
        ""
      ) : (
        <div>
          {buttonItems.map((item, index) => (
            <button
              key={item.name}
              ref={(el) => (buttonRefs.current[index] = el)}
              onClick={item.onClick}
              disabled={item.disabled}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}

      {sounds.options === "type-rate" ? (
        <Rate
          active={active}
          setActive={setActive}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Options;
