 const menu_music = import.meta.env.VITE_MENU_MUSIC;
 
 export function mainMenu(setAction, setLoad, setPlayTime, setSound, navigate) {
    const backToMenu = confirm(
      "Alle ungespeicherten Fortschritte gehen verloren! Möchtest du wirklich das Spiel verlassen?"
    );
    if (backToMenu) {
      setAction("");
      setLoad({
      currentChapter: "",
      currentScene: "",
      stepIndex: "",
      history: "",
      playTime: 0,
    });
    setPlayTime(0)
    setSound((prev) => ({ ...prev, url: menu_music }))
      return navigate("/");
    } else {
      return;
    }
  }
