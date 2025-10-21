 export function checkboxHandler(name, setSound) {
    switch (name) {
      case "musicVolume":
        setSound((prev) => ({
          ...prev,
          musicVolume: prev.musicVolume > 0 ? 0 : 0.5,
        }));
        break;
      case "textVolume":
        setSound((prev) => ({
          ...prev,
          textVolume: prev.textVolume > 0 ? 0 : 0.5,
        }));
        break;
      case "clickVolume":
        setSound((prev) => ({
          ...prev,
          clickVolume: prev.clickVolume > 0 ? 0 : 0.5,
        }));
        break;
      case "masterVolume":
        setSound((prev) =>
          prev.masterVolume > 0
            ? {
                ...prev,
                masterVolume: 0,
                musicVolume: 0,
                textVolume: 0,
                clickVolume: 0,
              }
            : {
                ...prev,
                masterVolume: 0.5,
                musicVolume: 0.5,
                textVolume: 0.5,
                clickVolume: 0.5,
              }
        );
        break;
    }
  }