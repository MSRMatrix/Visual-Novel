const game_music = import.meta.env.VITE_GAME_MUSIC;
 
export function handleMenuAction(route, navigate,setSounds) {
    if (route === "load") {
      navigate(`/${route}`);
      return;
    }

    if (route === "start") {
      setSounds((prev) => ({ ...prev, url: game_music, playing: true }));
      navigate(`/${route}`);
      return;
    }
    if (route === "options") {
      navigate(`/${route}`);
      return;
    } else {
      return;
    }
  }