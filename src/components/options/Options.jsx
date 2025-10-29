import { NavLink } from 'react-router-dom'
import './options.css'
import { useContext } from 'react';
import { SoundContext } from '../../context/SoundContext';

function Options() {
  const { sounds, setSounds } = useContext(SoundContext);
  return (
    <>
    
    <NavLink to="/" onClick={() => setSounds((prev) => ({...prev, hidePlayer: true}))}>Zurück</NavLink>
    </>
  )
}

export default Options
