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

import { dataHandler, deleteData, dispatchItemAction, handleFileChange } from "./dataFunctions";
import { useSimpleFocusMode } from "../modes/useMode";
import { LoadingOverlay } from "../../context/AppProviders";

const DataOptions = () => {
  library.add(faDownload, faUpload, faTrash);

  const { loadingOverlay, setLoadingOverlay } = useContext(LoadingOverlay);

  const fileInputRef = useRef(null);
  const iconRefs = useRef([]);
  const navigate = useNavigate();
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [actionType, setActionType] = useState(null);
  const [saveData, setSaveData] = useState(localStorage.getItem("vn_saves") || null);
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
  
  useEffect(() => {
    if (!loadingOverlay.loader) return;

    setLoadingOverlay((prev) => ({
      ...prev,
      ready: true,
    }));

    if (actionType && loadingOverlay.percent >= 100) {
      alert(
        actionType === "delete"
          ? `Löschen erfolgreich!`
          : actionType === "upload"
            ? `Daten erfolgreich hochgeladen!`
            : actionType === "download"
              ? `Download erfolgreich!`
              : "Fehler",
      );
      setLoadingOverlay((prev) => ({
        ...prev,
        ready: false,
      }));
      setActionType("");
    }

    // Reset
  }, [loadingOverlay.percent]);

  return (
    <div className="data-options">
      <div className="data-options-container">
      <h1>Daten Verwaltung</h1>
      {itemNames.map((item, index) => (
        <div key={item.name}>
          <h2>{item.function ? "" : item.name}</h2>
          <button
          disabled={item.name === "Exportieren" && !saveData}
            style={{ cursor: "pointer" }}
            onClick={() => dispatchItemAction(item, faDownload, faUpload, setLoadingOverlay, setSaveData, setActionType, handleFileClick)}
            ref={(el) => (iconRefs.current[index] = el)}
          >
            {item.function ? item.name : ""}
            {/* Color muss bearbeitet werden */}
            {item.name === "Exportieren" && !saveData ? "Keine Daten vorhanden" : item.function ? "" : <FontAwesomeIcon icon={item.icon} />}
          </button>
        </div>
      ))}
      {saveData ? "Daten vorhanden" : "Keine Daten vorhanden"}
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={(e) => handleFileChange(e, setSaveData, setActionType, setLoadingOverlay)}
      />
      </div>
    </div>
  );
};

export default DataOptions;
