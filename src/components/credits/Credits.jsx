import { NavLink } from 'react-router-dom'
import './credits.css'

function Credits() {
  return (
    <>
    <div>
        <h1>Irgendwelche Namen</h1>
        <p>Weiteres</p>
    </div>
    <NavLink to="/start">Neustart</NavLink>
    <NavLink to="/">Menü</NavLink>
    </>
  )
}

export default Credits
