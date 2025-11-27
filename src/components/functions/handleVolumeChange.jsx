 export function handleVolumeChange(name, value, setSound, keyCatcher, setKeyCatcher) {
   if (keyCatcher === "ArrowUp" || keyCatcher === "ArrowDown") {
      setKeyCatcher("");
      return;
    }
    const volume = value / 100;
    switch (name) {
      case "musicVolume":
        setSound((prev) => ({ ...prev, musicVolume: volume }));
        break;
      case "textVolume":
        setSound((prev) => ({ ...prev, textVolume: volume }));
        break;
      case "clickVolume":
        setSound((prev) => ({ ...prev, clickVolume: volume }));
        break;
      case "masterVolume":
        setSound((prev) => ({
          ...prev,
          masterVolume: volume,
          musicVolume: volume,
          textVolume: volume,
          clickVolume: volume,
        }));
        break;
    }
  }