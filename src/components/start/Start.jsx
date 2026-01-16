import { useContext, useEffect, useState } from 'react'
import DialogueBox from '../dialogueBox/DialogueBox'
import './start.css'
import { LoadContext, LoadingOverlay } from '../../context/AppProviders';

function Start() {
   const { loadingOverlay, setLoadingOverlay } = useContext(LoadingOverlay);
   const { load, setLoad } = useContext(LoadContext);
  const [hide, setHide] = useState(false)

    const [storyState, setStoryState] = useState(() => ({
    chapter: load.chapter || "prolog",
    scene: load.scene || "intro",
    step: load.step ?? 0,
    history: load.history || [],
    playTime: load.playTime || 0,
  }));


  function displayDialogueBox(){
    if(!hide){
      return;
    } else{
      setHide(false)
    }
  }

    useEffect(() => {
      setLoadingOverlay((prev) => ({...prev, title: "Spiel wird geladen", ready: storyState ? true : false}))
    },[loadingOverlay.loader && !loadingOverlay.ready])

  return (
    <>
    <div className='window' onClick={() => displayDialogueBox()}>
        Window for text
        <DialogueBox
        storyState={storyState}
        setStoryState={setStoryState}
        hide={hide}
        setHide={setHide}
        />
    </div>
    </>
  )
}

export default Start
