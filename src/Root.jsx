import { Outlet } from "react-router-dom";
import ReactPlayerComponent from "./components/reactPlayerComponent/ReactPlayerComponent";
import { useContext, useState } from "react";
import useSound from "use-sound";
import normalClick from "../src/sound/normalClick.wav"
import typing1 from "../src/sound/typing-1.wav"
import { SoundContext } from "./context/SoundContext";

function Root() {
  const [intro, setIntro] = useState(true)
  const { sounds, setSounds } = useContext(SoundContext);
  const [playClick] = useSound(sounds.click, { volume: sounds.clickVolume });

  return (
    <div onClick={() => playClick()}>
    {intro ? <h2 onClick={() => setIntro(false)}>{"klick mich"}</h2> : <div><Outlet />
    <ReactPlayerComponent intro={intro} /></div>}
    
    </div>
  );
}

export default Root;
