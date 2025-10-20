import { NavLink } from 'react-router-dom'
import './options.css'
import { useContext } from 'react';
import { SoundContext } from '../../context/SoundContext';

function Options() {
  const { sound, setSound } = useContext(SoundContext);
  return (
    <>
    Musik Ein Aus Lautstärke
    Schreibgeräusch Ein Aus Lautstärke
    Helligkeit
    <NavLink to="/" onClick={() => setSound((prev) => ({...prev, hideplay: true}))}>Zurück</NavLink>
    </>
  )
}

export default Options
