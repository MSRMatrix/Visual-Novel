import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Start from "./components/start/Start";
import Options from "./components/options/Options";
import Credits from "./components/credits/Credits";
import Load from "./components/load/Load";
import { LoadContext } from "./context/LoadContext";
import { useState } from "react";
import Root from "./Root";

function App() {
  const router = createBrowserRouter([
    {
      element: <Root />,
      children: [
{
      element: <Dashboard />,
      path: "/",
    },
    { element: <Options />, path: "/options" },
    { element: <Start />, path: "/start" },
    { element: <Credits />, path: "/credits" },
    { element: <Load />, path: "/load" },
      ],
    },
    
  ]);

    const [load, setLoad] = useState({
      currentChapter: "",
      currentScene: "",
      stepIndex: "",
      chatHistory: "",
      playTime: 0,
    });
  
  return (
    <>
    <LoadContext.Provider value={{load, setLoad}}>
       <RouterProvider router={router} />
    </LoadContext.Provider>
    </>
  );
}

export default App;
