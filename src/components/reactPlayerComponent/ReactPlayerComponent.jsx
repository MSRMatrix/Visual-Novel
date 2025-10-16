import { useState } from "react"
import ReactPlayer from "react-player";

function ReactPlayerComponent() {
  const [music, setMusic] = useState("https://www.youtube.com/watch?v=HJuSIcSS_xI")
  const [playing, setPlaying] = useState(true)
  console.log(playing);
  
  return (
    <>
    <div>
    <ReactPlayer 
  src={music}
  playing={playing}
  controls={true}
  volume={1}
  onError={(e) => console.log("Player-Error:", e)}
    />
    <button onClick={() => { setMusic("https://www.youtube.com/watch?v=nrkPeCIUpQs"); setPlaying(prevMode => !prevMode); }}>Musik 1</button>

      <button onClick={() => setMusic()}>Musik 2</button>
      <button onClick={() => setMusic()}>Musik 3</button>
      <button onClick={() => setMusic()}>Musik 4</button>
    </div>
    </>
  )
}

export default ReactPlayerComponent
