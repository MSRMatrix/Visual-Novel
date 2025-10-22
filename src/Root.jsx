import { Outlet } from "react-router-dom";
import ReactPlayerComponent from "./components/reactPlayerComponent/ReactPlayerComponent";
import { useContext, useState } from "react";
import useSound from "use-sound";
import { SoundContext } from "./context/SoundContext";

function Root() {
  const [intro, setIntro] = useState(true)
  const { sounds, setSounds } = useContext(SoundContext);
  const [playClick, { stop: stopClick }] = useSound(sounds.click, { volume: sounds.clickVolume });

  function globalClick(e){
    if (e.target.closest("[data-nosound]")) return;
    playClick()
  }
  
  

  return (
    <div onClick={(e) => globalClick(e)}>
    {intro ? <h2 onClick={() => setIntro(false)}>{"klick mich"}</h2> : <div><Outlet />
    <ReactPlayerComponent intro={intro} 
    /></div>}
    
    </div>
  );
}

export default Root;
