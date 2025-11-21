 const menu_music = import.meta.env.VITE_MENU_MUSIC;
 
 export function mainMenu(setAction, setLoad, setSound, navigate, setStoryState) {
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
    setStoryState(prev => ({
  ...prev,
  playTime: prev.playTime + 1
}));
    setSound((prev) => ({ ...prev, url: menu_music }))
      return navigate("/");
    } else {
      return;
    }
  }
