import { useContext, useState } from 'react'
import DialogueBox from '../dialogueBox/DialogueBox'
import './start.css'
import { LoadingOverlay } from '../../context/AppProviders';

function Start() {
   const { loadingOverlay, setLoadingOverlay } = useContext(LoadingOverlay);
  const [hide, setHide] = useState(false)

  function displayDialogueBox(){
    if(!hide){
      return;
    } else{
      setHide(false)
    }
  }

  return (
    <>
    <div className='window' onClick={() => displayDialogueBox()}>
        Window for text
        <DialogueBox
        hide={hide}
        setHide={setHide}
        />
    </div>
    </>
  )
}

export default Start
