import { Outlet } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import ReactPlayerComponent from "./components/reactPlayerComponent/ReactPlayerComponent";
import { useState } from "react";

function Root() {
  const [intro, setIntro] = useState(true)
  
  return (
    <>
    {intro ? <h2 onClick={() => setIntro(false)}>{"klick mich"}</h2> : <div><Outlet />
    <ReactPlayerComponent intro={intro}/></div>}
    
    </>
  );
}

export default Root;
