const game_music = import.meta.env.VITE_GAME_MUSIC;
 
export function handleMenuAction(route, navigate,setSounds, setActiveMenu) {
    if (route === "load") {
      navigate(`/${route}`);
      return;
    }

    if (route === "start") {
      setSounds((prev) => ({ ...prev, url: game_music, playing: true }));
      setActiveMenu(false);
      navigate(`/${route}`);
      return;
    }
    if (route === "options") {
      setSounds((prev) => ({ ...prev, hidePlayer: false }));
      setActiveMenu(false);
      navigate(`/${route}`);
      return;
    } else {
      return;
    }
  }