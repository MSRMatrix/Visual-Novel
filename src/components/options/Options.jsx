import { useNavigate } from "react-router-dom";
import "./options.css";
import { useContext, useRef, useState } from "react";
import { SoundContext } from "../../context/AppProviders";
import Rate from "./rate/Rate";
import { useSimpleFocusMode } from "../modes/useMode";

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


const ifDeps = !sounds.hidePlayer;
const effectDeps = [focusedIndex, sounds.hidePlayer, active];

useSimpleFocusMode({
  ifDeps,
  effectDeps,
  arrayItem: buttonItems,
  focusedIndex,
  setFocusedIndex,
  arrayFocus: buttonRefs
});


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
    <div className={sounds.hidePlayer ? "options" : ""}>
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
    </div>
  );
}

export default Options;
