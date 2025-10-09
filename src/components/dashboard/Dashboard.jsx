import { NavLink } from "react-router-dom";
import "./dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <NavLink to="start">Neues Spiel starten</NavLink>
      <NavLink to="">Spiel laden</NavLink>
      <NavLink to="options">Optionen</NavLink>
    </div>
  );
}

export default Dashboard;
