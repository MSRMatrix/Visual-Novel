import "./dataOptions.css"
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDownload, faUpload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

const DataOptions = () => {
  library.add(faDownload, faUpload);  
   const fileInputRef = useRef(null);

   const itemNames = [
    { name: "Importieren", icon: faUpload },
    { name: "Exportieren", icon: faDownload },
    { name: "Daten löschen", icon: faTrash }
  ];
 

  const handleFileClick = () => {
    fileInputRef.current.click(); 
  };

  const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      Object.keys(data).forEach((key) => {
        if (key.startsWith("vn_saves")) {
          localStorage.setItem(key, JSON.stringify(data[key]));
        }
      });
      alert("Import erfolgreich!");
    } catch (err) {
      console.error(err);
      alert("Fehler beim Importieren der Datei.");
    }
  };
  reader.readAsText(file);
};

 

  function dataHandler(value) {
    if (value === faDownload) {
      const data = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("vn_saves")) {
          data[key] = JSON.parse(localStorage.getItem(key));
        }
      }
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "savegame.json";
      a.click();
      URL.revokeObjectURL(url);
      return;
    }
    if (value === faUpload) {
      console.log(`faUpload`);
      return;
    }
  }

  function deleteData(){
    const question = confirm("Möchtest du alle Daten unwiderruflich löschen?")
    if(question){
      localStorage.removeItem("vn_saves")
      console.log(`Daten erfolgreich gelöscht! :)`);
    }
    else{
    console.log(`Löschvorgang abgebrochen!`);  
    }
  }


   return (
    <div className="data-options">
      <h1>Daten Verwaltung</h1>
      {itemNames.map((item) => (
        <div key={item.name}>
          <h2>{item.name}</h2>
          <FontAwesomeIcon
            icon={item.icon}
            onClick={item.icon === faUpload ? handleFileClick : item.icon === faDownload ? () => dataHandler(item.icon) : deleteData}
            style={{ cursor: "pointer" }}
          />
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
