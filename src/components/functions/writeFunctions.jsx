export function showSpeedRate(writeSpeed) {
  let rate;

  if (writeSpeed > 130) {
    rate = "Sehr Langsam";
  } else if (writeSpeed >= 100) {
    rate = "Langsam";
  } else if (writeSpeed >= 70) {
    rate = "Normal";
  } else if (writeSpeed >= 40) {
    rate = "Schnell";
  } else if (writeSpeed >= 15) {
    rate = "Sehr Schnell";
  }

  return `${writeSpeed} ${rate}`;
}

export function writespeedHandler(value, setWriteSpeed){
      setWriteSpeed(Number(value))
    }