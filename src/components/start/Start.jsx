import { useState } from 'react'
import DialogueBox from '../text/DialogueBox'
import './start.css'

function Start() {
  
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
