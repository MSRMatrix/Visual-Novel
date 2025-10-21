import { NavLink } from "react-router-dom";
import { useContext } from "react";
import "./dashboard.css";
import { SoundContext } from "../../context/SoundContext";

function Dashboard() {

  const game_music = import.meta.env.VITE_GAME_MUSIC

  const { sounds, setSounds } = useContext(SoundContext);
  return (
    <div className="dashboard">
      <NavLink to="start" onClick={() => setSounds((prev) => ({ ...prev, url: game_music, playing: true }))}>Neues Spiel starten</NavLink>
      <NavLink to="load">Spiel laden</NavLink>
      <NavLink to="options" onClick={() => setSounds((prev) => ({...prev, hidePlayer: false}))}>Optionen</NavLink>
    </div>
  );
}

export default Dashboard;
