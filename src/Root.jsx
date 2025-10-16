import { Outlet } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import ReactPlayerComponent from "./components/reactPlayerComponent/ReactPlayerComponent";

function Root() {
  
  
  return (
    <>
    <Outlet />
    <ReactPlayerComponent />
    </>
  );
}

export default Root;
