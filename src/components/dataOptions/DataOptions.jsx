import "./dataOptions.css";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faDownload,
  faUpload,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { dataHandler, deleteData, handleFileChange } from "./dataFunctions";
import { useSimpleFocusMode } from "../modes/useMode";
import { LoadingOverlay } from "../../context/AppProviders";

const DataOptions = () => {
  library.add(faDownload, faUpload, faTrash);

  const { loadingOverlay, setLoadingOverlay } = useContext(LoadingOverlay);

  const fileInputRef = useRef(null);
  const iconRefs = useRef([]);
  const navigate = useNavigate();
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [saveData, setSaveData] = useState(localStorage.getItem("vn_saves"));
  const itemNames = [
    { name: "Importieren", icon: faUpload },
    { name: "Exportieren", icon: faDownload },
    { name: "Daten löschen", icon: faTrash },
    { name: "Zurück", function: () => navigate("/") },
  ];

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  useSimpleFocusMode({
    ifDeps: false,
    effectDeps: [faDownload, faUpload],
    arrayItem: itemNames,
    focusedIndex,
    setFocusedIndex,
    arrayFocus: iconRefs,
  });

  const [example, setExample] = useState(null);

  function test(item, faDownload, faUpload) {
    try {
      if (!item.icon && typeof item.function === "function") {
        item.function();
        return;
      }

      if (item.icon?.iconName === "trash") {
        deleteData(setSaveData,setExample );
        return;
      }

      if (item.icon?.iconName === "download") {
          dataHandler(item.icon, faDownload, faUpload, setExample);
        return;
      }

      if (item.icon?.iconName === "upload") {
         handleFileClick();
        return;
      }

      console.log("Error occurred!");
    } catch (err) {
      console.error("Aktion fehlgeschlagen:", err);
    }
  }

  useEffect(() => {
    if(!example){
      console.log(`Nothing to see...`);
      return;
    }
    setLoadingOverlay((prev) => ({...prev, loader: true, ready: true}))
    if (example === "delete" && !loadingOverlay.loader) {
      setExample("")
      alert("Löschen erfolgreich!");
      return;
    }
    if (example === "upload" && !loadingOverlay.loader) {
      setExample("")
      alert("Daten erfolgreich abgeloaded!");
      return;
    }
    if (example === "download" && !loadingOverlay.loader) {
      setExample("")
      alert("Download erfolgreich!");
      return;
    }
  }, [example]);

  return (
    <div className="data-options">
      <h1>Daten Verwaltung</h1>
      {itemNames.map((item, index) => (
        <div key={item.name}>
          <h2>{item.function ? "" : item.name}</h2>
          <button
            style={{ cursor: "pointer" }}
            onClick={(e) => test(item, faDownload, faUpload)}
            ref={(el) => (iconRefs.current[index] = el)}
          >
            {item.function ? item.name : ""}
            {item.function ? "" : <FontAwesomeIcon icon={item.icon} />}
          </button>
        </div>
      ))}
      {saveData ? "Daten vorhanden" : "Keine Daten vorhanden"}
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={(e) => handleFileChange(e, setSaveData, setExample)}
      />
    </div>
  );
};

export default DataOptions;
