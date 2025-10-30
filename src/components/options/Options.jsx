import { NavLink } from 'react-router-dom'
import './options.css'
import { useContext, useState } from 'react';
import { SoundContext } from '../../context/SoundContext';
import Rate from '../rate/Rate';

function Options() {
  const { sounds, setSounds } = useContext(SoundContext);
  return (
    <>
    <Rate />
    <NavLink to="/" onClick={() => setSounds((prev) => ({...prev, hidePlayer: true}))}>Zurück</NavLink>
    </>
  )
}

export default Options
