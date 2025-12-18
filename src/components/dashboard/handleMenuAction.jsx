const game_music = import.meta.env.VITE_GAME_MUSIC;
 
export function handleMenuAction(route, navigate,setSounds) {
    if (route === "start") {
      setSounds((prev) => ({ ...prev, url: game_music, playing: true }));
      navigate(`/${route}`);
      return;
    }
    else{
      navigate(`/${route}`);
      return;
    }
  }