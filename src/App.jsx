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
import { SoundContext } from "./context/SoundContext";
import click from "./sound/normalClick.wav"
import typing from "./sound/typing-1.wav"
import { WriteContext } from "./context/WriteContext";
import DataOptions from "./components/dataOptions/DataOptions";

function App() {
  const menu_music = import.meta.env.VITE_MENU_MUSIC
  
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
        { element: <DataOptions />, path: "/data-options" },
      ],
    },
  ]);

  const [load, setLoad] = useState({
    chapter: "",
    currentScene: "",
    stepIndex: "",
    chatHistory: "",
    playTime: 0,
    choice: false
  });

  const [sounds, setSounds] = useState({
    hidePlayer : true,
    url: menu_music,
    playing: false,
    masterVolume: 0.5,
    textVolume: 0.5,
    clickVolume: 0.5,
    musicVolume: 0.5,
    click: click,
    typing: typing,
    options: ""
  })

  const [writeSpeed, setWriteSpeed] = useState(30)


  return (
    <>
    <WriteContext.Provider value={{writeSpeed, setWriteSpeed}}>
      <LoadContext.Provider value={{ load, setLoad }}>
        <SoundContext.Provider value={{sounds, setSounds}}>
          <RouterProvider router={router} />
        </SoundContext.Provider>
      </LoadContext.Provider>
      </WriteContext.Provider>
    </>
  );
}

export default App;
