 export function handleFileChange(e){
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