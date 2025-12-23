import { useContext, useEffect, useState } from "react";
import "./loader.css"
import { LoadingOverlay } from "../../context/LoadContext";

const Loader = ({title}) => {
const [percent, setPercent] = useState(0)
const { loadingOverlay, setLoadingOverlay } = useContext(LoadingOverlay);
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

useEffect(() => {
    setTimeout(() => {
        setLoadingOverlay({loader: false, title:""})
    }, 6000);
},[])

    return(
        <div className="loader">
            <h1>{title}</h1>
        <div></div>
        <p>{percent}%</p>
        </div>
    )
}

export default Loader;