const game_music = import.meta.env.VITE_GAME_MUSIC;
 
export function handleMenuAction(route, navigate,setSounds, setLoadingOverlay) {
    if (route === "start") {
      setSounds((prev) => ({ ...prev, url: game_music, playing: true }));
      navigate(`/${route}`);
      setLoadingOverlay((prev) => ({...prev, loader: true}))
      return;
    }
    else{
      navigate(`/${route}`);
      return;
    }
  }