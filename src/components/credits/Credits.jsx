import { NavLink } from 'react-router-dom'
import './credits.css'
import { useContext } from 'react';
import { SoundContext } from '../../context/SoundContext';

const  Credits = () => {
  const game_music = import.meta.env.VITE_GAME_MUSIC
  const menu_music = import.meta.env.VITE_MENU_MUSIC
  const { sounds, setSounds } = useContext(SoundContext);
  return (
    <>
    <div>
        <h1>Irgendwelche Namen</h1>
        <p>Weiteres</p>
    </div>
    <NavLink onClick={() => setSounds((prev) => ({...prev, url: game_music}))} to="/start">Neustart</NavLink>
    <NavLink onClick={() => setSounds((prev) => ({...prev, url: menu_music}))} to="/">Menü</NavLink>
    </>
  )
}

export default Credits
