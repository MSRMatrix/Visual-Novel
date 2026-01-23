export function deleteData(setSaveData, setActionType, setLoadingOverlay) {
  const confirmed = confirm("Möchtest du alle Daten unwiderruflich löschen?");
  if (!confirmed) {
    console.log("Löschen Abgebrochen!");
    return;
  }
  setLoadingOverlay((prev) => ({
    ...prev,
    loader: true,
    ready: false,
    title: "Daten werden gelöscht...",
  }));

  localStorage.removeItem("vn_saves");
  setSaveData(null);
  setActionType("delete");
}

export function dataHandler(
  value,
  faDownload,
  faUpload,
  setExample,
  setLoadingOverlay,
) {
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
    setLoadingOverlay((prev) => ({
      ...prev,
      loader: true,
      ready: false,
      title: "Daten werden heruntergeladen...",
    }));
    setExample("download");
    return;
  }

  if (value === faUpload) {
    console.log(`faUpload`);
    return;
  }
}

export function handleFileChange(
  e,
  setSaveData,
  setExample,
  setLoadingOverlay,
) {
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
      setSaveData(localStorage.getItem("vn_saves"));
      setLoadingOverlay((prev) => ({
        ...prev,
        loader: true,
        ready: false,
        title: "Daten werden hochgeladen...",
      }));
      setExample("upload");
    } catch (err) {
      console.error(err);
      alert(err.message || "Fehler beim Importieren der Datei.");
    }
  };

  reader.readAsText(file);
  e.target.value = null;
}





export function dispatchItemAction(item, faDownload, faUpload, setLoadingOverlay, setSaveData, setActionType, handleFileClick) {
    try {
      if (!item.icon && typeof item.function === "function") {
        item.function();
        return;
      }

      if (item.icon?.iconName === "trash") {
        deleteData(setSaveData, setActionType, setLoadingOverlay);
        return;
      }

      if (item.icon?.iconName === "download") {
        dataHandler(item.icon, faDownload, faUpload, setActionType, setLoadingOverlay);
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