import { Outlet } from "react-router-dom";
import ReactPlayerComponent from "./components/reactPlayerComponent/ReactPlayerComponent";
import { useContext, useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import { SoundContext } from "./context/SoundContext";

function Root() {
  const [intro, setIntro] = useState(true);
  const { sounds, setSounds } = useContext(SoundContext);
  const [playClick, { stop: stopClick }] = useSound(sounds.click, {
    volume: sounds.clickVolume,
  });
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

  const text = [
    {name: "System Initializing..."},
    {name: "Loading World Data..."},
    {name: "Establishing Connection..."},
  ]

  // Eine Typewriter Intro wo jedes einzelne Wort eingeblendet wird. Am Ende erscheint der Button wo dann weiter oder so steht. Ungefähr 10 Sekunden oder so
  // Eine Typewriter Intro wo jedes einzelne Wort eingeblendet wird. Am Ende erscheint der Button wo dann weiter oder so steht. Ungefähr 10 Sekunden oder so
  
  return (
    <div onClick={(e) => globalClick(e)} className="root">
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
          <ReactPlayerComponent intro={intro} />
        </div>
      )}
    </div>
  );
}

export default Root;
