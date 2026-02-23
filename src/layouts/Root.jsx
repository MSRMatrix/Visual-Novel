import "./root.css"

import { Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import useSound from "use-sound";
import Loader from "../components/loader/Loader";
import { LoadingOverlay, SoundContext } from "../context/AppProviders";
import Intro from "../components/intro/Intro";
import ReactPlayerComponent from "../components/options/player/ReactPlayerComponent";

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
  "The island stirs...",
  "Waves begin to whisper...",
  "Ancient paths reveal themselves...",
  "You are not alone...",
];

  useEffect(() => {
    setLoadingOverlay((prev) => ({...prev, title: "Seite wird geladen", ready: intro && exampleText ? true : false}))
  },[])

  return (
    <>
      <Loader />

    <div
  onClick={globalClick}
  className={`island-main ${loadingOverlay.loader ? "hidden" : ""}`}
>
  {intro ?
    <Intro
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
