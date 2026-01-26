import { useContext, useEffect, useState } from "react";
import "./loader.css";
import { LoadingOverlay } from "../../context/AppProviders";

const Loader = () => {
  const { loadingOverlay, setLoadingOverlay } = useContext(LoadingOverlay);

  useEffect(() => {
    if (!loadingOverlay.loader) return;
    if (loadingOverlay.percent >= 100) return;
    if (loadingOverlay.percent >= 90 && !loadingOverlay.ready) return;

    const timeout = setTimeout(() => {
      setLoadingOverlay((prev) => ({
        ...prev,
        percent: prev.percent + 1,
      }));
    }, 20);

    return () => clearTimeout(timeout);
  }, [loadingOverlay.loader, loadingOverlay.percent, loadingOverlay.ready]);

  // Effekt: Loader ausblenden, wenn fertig
  useEffect(() => {
    if (loadingOverlay.percent < 100) return;

    const timeout = setTimeout(() => {
      setLoadingOverlay({
        loader: false,
        title: "",
        percentBar: false,
        percent: 0,
        ready: false,
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [loadingOverlay.percent]);

  return (
    <div className="loader" style={{display: loadingOverlay.loader ? "flex" : "none"}}>
      <h1>{loadingOverlay.title}</h1>
      <div
        className="loading-bar"
        style={{
          background: `linear-gradient(to right, blue 0%, blue ${loadingOverlay.percent}%, transparent ${loadingOverlay.percent}%, transparent 100%)`,
        }}
      ></div>
      <p className="percent">{loadingOverlay.percent}%</p>
    </div>
  );
};

export default Loader;

// Es gibt einen Ladebalken als visuelles Ladesymbol
// Der Ladebalken füllt sich gleichmäßig von 0 % bis ca. 90 %
// Ab 90 % stoppt der Ladebalken bewusst
// Der Stopp signalisiert: „System wartet auf Abschluss der echten Ladeprozesse“
// Sobald die Komponente / Seite / Daten tatsächlich fertig geladen sind,
// wird ein „fertig“-Signal gesetzt
// Danach füllt sich der Ladebalken normal von 90 % bis 100 %
// Bei 100 %:
// kurze visuelle Bestätigung (z. B. kurzes Aufleuchten / Fade)
// Übergang zur eigentlichen Ansicht (z. B. Menü oder Spiel)
