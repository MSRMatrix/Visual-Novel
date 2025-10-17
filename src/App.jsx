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

  const [sound, setSound] = useState({
    hidePlayer : true,
    url: "https://www.youtube.com/watch?v=6Fv-wbsIA2s",
    playing: false,
    masterVolume: 0.5,
    textVolume: 0.5,
    clickVolume: 0.5,
    musicVolume: 0.5,
    click: click,
    typing: typing
  })

  return (
    <>
      <LoadContext.Provider value={{ load, setLoad }}>
        <SoundContext.Provider value={{sound, setSound}}>
          <RouterProvider router={router} />
        </SoundContext.Provider>
      </LoadContext.Provider>
    </>
  );
}

export default App;
