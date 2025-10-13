import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Start from "./components/start/Start";
import Options from "./components/options/Options";
import Credits from "./components/credits/Credits";

function App() {
  const router = createBrowserRouter([
    {
      element: <Dashboard />,
      path: "/",
      children: [],
    },
    { element: <Options />, path: "/options" },
    { element: <Start />, path: "/start" },
    { element: <Credits />, path: "/credits" },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
