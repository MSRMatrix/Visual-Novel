export function deleteData(slotName, saves, setSaves) {
    const existing = saves.find((s) => s.name === slotName && s.timestamp);
    if (!existing) {
      return;
    }

    const askDelete = confirm(
      "Willst du wirklich die bestehenden Daten unwiderruflich löschen?"
    );
    if (!askDelete) {
      return console.log("Löschen abgebrochen!");
    }

    const data = JSON.parse(localStorage.getItem("vn_saves") || "[]");

    const newSaves = data.map((s) =>
      s.name === slotName
        ? { name: slotName } // "leerer" Slot
        : s
    );

    localStorage.setItem("vn_saves", JSON.stringify(newSaves));

    setSaves(() => {
      const stored = JSON.parse(localStorage.getItem("vn_saves")) || [];
      return stored.length
        ? stored
        : [
            { name: "Speicherplatz 1" },
            { name: "Speicherplatz 2" },
            { name: "Speicherplatz 3" },
            { name: "Speicherplatz 4" },
            { name: "Speicherplatz 5" },
          ];
    });
  }