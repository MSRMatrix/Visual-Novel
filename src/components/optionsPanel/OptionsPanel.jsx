import { library } from "@fortawesome/fontawesome-svg-core";
import { faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OptionsPanel = () => {
  library.add(faDownload, faUpload);

  const itemNames = [
    { name: "Importieren", icon: faUpload },
    { name: "Exportieren", icon: faDownload },
  ];

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

  return (
    <div className="options-panel">
      <h1>OptionsPanel</h1>
      {itemNames.map((item) => (
        <div key={item.name}>
          <h2>{item.name}</h2>
          <FontAwesomeIcon
            icon={item.icon}
            onClick={() => dataHandler(item.icon)}
          />
        </div>
      ))}
      <div></div>
    </div>
  );
};

export default OptionsPanel;
