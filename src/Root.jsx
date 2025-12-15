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
    "",
  ];
  const [index, setIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [displayed, setDisplayed] = useState("");


  const text = exampleText[index];

  useEffect(() => {
  if (!intro) return;

  const fullText = exampleText[index];
  let charIndex = 0;

  setDisplayed(""); // Reset bei neuem Text

  const interval = setInterval(() => {
    charIndex++;
    setDisplayed(fullText.substring(0, charIndex));

    if (charIndex >= fullText.length) {
      clearInterval(interval);
    }
  }, 50); // Schreibgeschwindigkeit

  return () => clearInterval(interval);
}, [index, intro]);


useEffect(() => {
  if (!intro) return;

  if (index === exampleText.length - 1) {
    setIsFinished(true);
    return;
  }

  const timeout = setTimeout(() => {
    setIndex((prev) => prev + 1);
  }, 3000);

  return () => clearTimeout(timeout);
}, [index, intro]);

  return (
    <div className="root" onClick={globalClick}>
      {intro && <p>{displayed}</p>}

      {intro && isFinished && (
        <button
          ref={buttonRef}
          onClick={() => setIntro(false)}
          onBlur={handleBlur}
        >
          Weiter
        </button>
      )}

      {!intro && (
        <>
          <Outlet />
          <ReactPlayerComponent />
        </>
      )}
    </div>
  );
}

export default Root;
