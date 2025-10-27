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

  // Klick-Sound
  function globalClick(e) {
    if (e.target.closest("[data-nosound]")) return;
    playClick();
  }
  // Klick-Sound

  // Fokus wird sofort gesetzt
  useEffect(() => {
    buttonRef.current?.focus();
  }, []);
  // Fokus wird sofort gesetzt

  // Schaltet Fokus wieder ein wenn man irgendwo anders rumklickt
  const handleBlur = () => {
    if (intro) {
      setTimeout(() => {
        buttonRef.current?.focus();
      }, 0);
    }
  };
  // Schaltet Fokus wieder ein wenn man irgendwo anders rumklickt

  return (
    <div onClick={(e) => globalClick(e)} className="root">
      {intro ? (
        <button
          ref={buttonRef}
          onClick={() => setIntro(false)}
          onBlur={handleBlur}
        >
          klick mich
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
