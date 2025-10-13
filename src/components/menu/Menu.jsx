import { NavLink } from "react-router-dom";
import "./menu.css";

function Menu({
  setQuickMenu,
  currentChapter,
  currentScene,
  stepIndex,
  history,
}) {


  function save() {
    console.log(currentChapter);
    console.log(currentScene);
    console.log(stepIndex);
    console.log(history);
    // In den Local Storage einspeichern (Vermutlich den Titel Speicherplatz 1, 2, 3 etc...)
  }

  function load() {
    console.log(`Noch keine Funktion :)`);
    // Local Storage Daten rausfiltern
  }

  return (
    <>
      <h1>Schnellmenü</h1>
      <button onClick={() => setQuickMenu(false)}>Zurück zum Spiel</button>
      <button onClick={() => save()}>Speichern</button>
      <button onClick={() => load()}>Laden</button>
      <NavLink to="/">Ins Hauptmenü</NavLink>
    </>
  );
}

export default Menu;
