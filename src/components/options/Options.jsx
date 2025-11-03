import { NavLink, useNavigate } from 'react-router-dom'
import './options.css'
import { useContext, useState } from 'react';
import { SoundContext } from '../../context/SoundContext';
import Rate from '../rate/Rate';

function Options() {
  const { sounds, setSounds } = useContext(SoundContext);
  const [options, setOptions] = useState({
      firstMenu: "",
      underMenu: ""
    })
    const navigate = useNavigate()

  return (
    <>

     <div>
        <button onClick={() => setOptions((prev) => ({...prev, firstMenu: "music"}))}>Musik</button>
        <button onClick={() => setOptions((prev) => ({...prev, firstMenu: "type-rate"}))}>Schreibgeschwindigkeit</button>
        <button></button>
        <button></button>
        <button></button>
      </div>
    <Rate />
    <button onClick={() => {setSounds((prev) => ({...prev, hidePlayer: true})), navigate("/")}}>Zurück</button>
    </>
  )
}

export default Options
