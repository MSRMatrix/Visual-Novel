import { NavLink } from "react-router-dom";
import { useContext } from "react";
import "./dashboard.css";
import { SoundContext } from "../../context/SoundContext";

function Dashboard() {
  const { sound, setSound } = useContext(SoundContext);
  return (
    <div className="dashboard">
      <NavLink to="start" onClick={() => setSound((prev) => ({ ...prev, url: "https://www.youtube.com/watch?v=0iVgv5OP4so&list=PLfP6i5T0-DkLTWwznhWjQ1sm_GasKuMPY&index=23", playing: true }))}>Neues Spiel starten</NavLink>
      <NavLink to="load">Spiel laden</NavLink>
      <NavLink to="options" onClick={() => setSound((prev) => ({...prev, hidePlayer: false}))}>Optionen</NavLink>
    </div>
  );
}

export default Dashboard;
