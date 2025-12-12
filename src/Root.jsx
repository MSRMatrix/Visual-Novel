import { Outlet } from "react-router-dom";
import ReactPlayerComponent from "./components/reactPlayerComponent/ReactPlayerComponent";
import { useContext, useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import { SoundContext } from "./context/SoundContext";

function Root() {
  const [intro, setIntro] = useState(true);
  const { sounds, setSounds } = useContext(SoundContext);
  const [playClick] = useSound(sounds.click, { volume: sounds.clickVolume });
  const buttonRef = useRef(null);

  function globalClick(e) {
    if (e.target.closest("[data-nosound]")) return;
    playClick();
  }

  useEffect(() => {
    buttonRef.current?.focus();
  }, []);

  const handleBlur = () => {
    if (intro) {
      setTimeout(() => {
        buttonRef.current?.focus();
      }, 0);
    }
  };

  const exampleText = [
    "System Initializing...",
    "Loading World Data...",
    "Establishing Connection...",
  ];

  const [index, setIndex] = useState(0);

  // initialer Text
  let text = exampleText[index];

  useEffect(() => {
    if (index === exampleText.length - 1) return; // aufhören beim letzten

    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);

  // Eine Typewriter Intro wo jedes einzelne Wort eingeblendet wird. Am Ende erscheint der Button wo dann weiter oder so steht. Ungefähr 10 Sekunden oder so
  // Eine Typewriter Intro wo jedes einzelne Wort eingeblendet wird. Am Ende erscheint der Button wo dann weiter oder so steht. Ungefähr 10 Sekunden oder so

  return (
    <div onClick={(e) => globalClick(e)} className="root">
      {intro ? text : ""}
      {intro ? (
        <button
          ref={buttonRef}
          onClick={() => setIntro(false)}
          onBlur={handleBlur}
        >
          Weiter
        </button>
      ) : (
        <div>
          <Outlet />
          <ReactPlayerComponent />
        </div>
      )}
    </div>
  );
}

export default Root;
