export function deleteData(setSaveData, setLoadingOverlay) {
  return new Promise((resolve, reject) => {
    const confirmed = confirm("Möchtest du alle Daten unwiderruflich löschen?");
    if (!confirmed) {
      console.log("Abgebrochen");
      resolve();
      return;
    }

    setLoadingOverlay(prev => ({
      ...prev,
      loader: true,
      ready: false,
      title: "Daten werden gelöscht"
    }));

    setTimeout(() => {
      try {
        localStorage.removeItem("vn_saves");
        setSaveData(null);
        setLoadingOverlay(prev => ({ ...prev, ready: true }));
        console.log("Daten gelöscht!");
        resolve();
      } catch (err) {
        reject(err);
      }
    }, 2000);
  });
}

// Fehlen der Asynchronität

  export function dataHandler(value, faDownload, faUpload) {
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



  export function handleFileChange(e, setSaveData) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (event) => {
    try {
        // Function fehlt um andere Dinge mit dem richtigen Fehlercode auszustatten PNG zum Beispiel
        
      const data = JSON.parse(event.target.result);
        
            if (!Object.hasOwn(data, "vn_saves")) {
        throw new Error("Ungültige Datei! Hauptkey 'vn_saves' fehlt.");
      }

      // Hauptkey speichern
      localStorage.setItem("vn_saves", JSON.stringify(data["vn_saves"]));

      alert("Import erfolgreich!");
      setSaveData(localStorage.getItem("vn_saves"));
    } catch (err) {
      console.error(err);
      alert(err.message || "Fehler beim Importieren der Datei.");
    }
  };

  reader.readAsText(file);
  e.target.value = null;
}
