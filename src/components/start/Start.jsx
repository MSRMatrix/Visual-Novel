import { NavLink } from 'react-router-dom'
import DialogueBox from '../text/DialogueBox'
import './start.css'

function Start() {
  return (
    <>
    <div className='window'>
        Window for text
        <DialogueBox/>

        <NavLink to="">Menu</NavLink>
        <NavLink to="">Skip</NavLink>
        <NavLink to="">Zurück</NavLink>
        <NavLink to="">Hide</NavLink>
    </div>
    </>
  )
}

export default Start
