import "./dataOptions.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleFileChange } from "./handleFileChange";
import { dataHandler } from "./dataHandler";
import { useSimpleFocusMode } from "../modes/useSimpleFocusMode";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faDownload,
  faUpload,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DataOptions = () => {
  library.add(faDownload, faUpload);
  const fileInputRef = useRef(null);
  const iconRefs = useRef([]);
  const navigate = useNavigate();
  const [focusedIndex, setFocusedIndex] = useState(0);
  const itemNames = [
    { name: "Importieren", icon: faUpload },
    { name: "Exportieren", icon: faDownload },
    { name: "Daten löschen", icon: faTrash },
    { name: "Zurück", function: () => navigate("/") },
  ];

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  function deleteData() {
    const question = confirm("Möchtest du alle Daten unwiderruflich löschen?");
    if (question) {
      localStorage.removeItem("vn_saves");
      console.log(`Daten erfolgreich gelöscht! :)`);
    } else {
      console.log(`Löschvorgang abgebrochen!`);
    }
  }

  const ifDeps = false;
  const effectDeps = [faDownload, faUpload];

  useSimpleFocusMode({
    ifDeps,
    effectDeps,
    arrayItem: itemNames,
    focusedIndex,
    setFocusedIndex,
    arrayFocus: iconRefs,
  });

  return (
    <div className="data-options">
      <h1>Daten Verwaltung</h1>
      {itemNames.map((item, index) => (
        <div key={item.name}>
          <h2>{item.function ? "" : item.name}</h2>
          <button
            style={{ cursor: "pointer" }}
            onClick={
              item.icon === faUpload
                ? handleFileClick
                : item.icon === faDownload
                ? () => dataHandler(item.icon, faDownload, faUpload)
                : item.icon === faTrash
                ? deleteData
                : item.function
            }
            ref={(el) => (iconRefs.current[index] = el)}
          >
            {item.function ? item.name : ""}
            {item.function ? "" : <FontAwesomeIcon icon={item.icon} />}
          </button>
        </div>
      ))}

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default DataOptions;
