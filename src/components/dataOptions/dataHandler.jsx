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