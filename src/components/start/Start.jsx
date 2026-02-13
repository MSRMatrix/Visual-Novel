import './start.css'

import { useContext, useEffect, useState } from 'react'

import Box from '../dialogue/Box'

import { LoadContext, LoadingOverlay, PictureContext } from '../../context/AppProviders';

function Start() {
   const { loadingOverlay, setLoadingOverlay } = useContext(LoadingOverlay);
   const {pictureContext, setPictureContext} = useContext(PictureContext)
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

    // console.log(pictureContext);
    

  return (
    <div
  style={{
    backgroundImage: pictureContext.background
      ? `url(${pictureContext.background})`
      : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "inherit",
    height: "inherit"
  }}
>

    <div className='window' onClick={() => displayDialogueBox()}>
        <Box
        storyState={storyState}
        setStoryState={setStoryState}
        hide={hide}
        setHide={setHide}
        />
    </div>
    {/* {pictureContext.antagonist ? <img className='antagonist' src={pictureContext.antagonist} alt="Trend" />  : ""}
    {pictureContext.side ? <img className='side' src={pictureContext.side} alt="Trend" />  : ""} */}


    <div className="character-layer">
  {/* {pictureContext.protagonist && (
    <img
      className="protagonist"
      src={pictureContext.protagonist}
      alt="Protagonist"
      data-position="left"
    />
  )} */}
  {pictureContext.protagonist && (
    <img
      className="side"
      src={pictureContext.protagonist}
      alt="Side"
      data-position="center"
    />
  )}
  {/* {pictureContext.protagonist && (
    <img
      className="antagonist"
      src={pictureContext.protagonist}
      alt="Antagonist"
      data-position="right"
    />
  )} */}
</div>

    
    </div>
  )
}

export default Start
