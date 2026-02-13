 export function handleSound(category, soundKey, e, players, soundFiles, setSounds) {
    const currentPlayer = players[category][soundKey];

    const soundFile = soundFiles[soundKey];

    if (!currentPlayer) return;

    Object.values(players[category]).forEach((p) => p.stop());

    currentPlayer.play();

    setSounds((prev) => ({ ...prev, [category]: soundFile }));
  }