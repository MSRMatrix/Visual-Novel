import "./root.css";
import { Outlet } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import Loader from "./components/loader/Loader";
import { LoadingOverlay, SoundContext } from "./context/AppProviders";
import ReactPlayerComponent from "./components/options/reactPlayerComponent/ReactPlayerComponent";
import { useLoad } from "./components/modes/useMode";
import Intro from "./components/intro/Intro";

function Root() {
  const [intro, setIntro] = useState(true);
  const { loadingOverlay, setLoadingOverlay } = useContext(LoadingOverlay);
  const { sounds, setSounds } = useContext(SoundContext);
  const [playClick] = useSound(sounds.click, { volume: sounds.clickVolume });

  function globalClick(e) {
    if (e.target.closest("[data-nosound]")) return;
    playClick();
  }
  const exampleText = [
    "System Initializing...",
    "Loading World Data...",
    "Establishing Connection...",
    "",
  ];

  useEffect(() => {
    setLoadingOverlay((prev) => ({...prev, title: "Seite wird geladen", ready: intro && exampleText ? true : false}))
  },[])

  return (
    <>
      <Loader />

      <div onClick={globalClick} style={{visibility: loadingOverlay.loader ? "hidden" : "visible", height: "inherit", width: "inherit"}}>
        {intro ? <Intro 
       intro={intro}
       setIntro={setIntro}
       exampleText={exampleText}
       /> :  <>
              <Outlet />
              <ReactPlayerComponent />
          </>}
      </div>
    </>
  );
}

export default Root;
