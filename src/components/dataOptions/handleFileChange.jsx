export function handleFileChange(e, setSaveData) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (event) => {
    try {
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
