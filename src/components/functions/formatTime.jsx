export function formatTime(time){
const hours   = Math.floor(time / 3600)
const minutes = Math.floor((time % 3600) / 60)
const seconds = time % 60
const totalTime = `${hours} Stunden ${minutes} Minuten ${seconds} Sekunden`
    return totalTime
  }