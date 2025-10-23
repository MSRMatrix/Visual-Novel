function Options({
  writeSpeed,
  setWriteSpeed,}) {



    function writespeedHandler(value){
      setWriteSpeed(Number(value))
    }

    function showSpeedRate() {
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
    
  return (
    <>
     Helligkeit
      <div>
      <p>Aktuelle Geschwindigkeit: {showSpeedRate()} </p>
     <input value={writeSpeed} type="range" max={150} min={15} onChange={(e) => writespeedHandler(e.target.value)} />
     <div  style={{ display: "flex"}}>
      <button disabled={writeSpeed === 40} value={40} onClick={(e) => writespeedHandler(e.target.value)}>Schnell</button>
      <button disabled={writeSpeed === 70} value={70} onClick={(e) => writespeedHandler(e.target.value)}>Normal</button>
      <button disabled={writeSpeed === 100} value={100} onClick={(e) => writespeedHandler(e.target.value)}>Langsam</button>
     </div>
     </div>
     
     
    </>
  );
}

export default Options;
