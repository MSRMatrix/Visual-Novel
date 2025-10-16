import { NavLink } from 'react-router-dom'
import './options.css'

function Options() {
  return (
    <>
    Musik Ein Aus Lautstärke
    Schreibgeräusch Ein Aus Lautstärke
    Helligkeit
    <NavLink to="/">Zurück</NavLink>
    </>
  )
}

export default Options
