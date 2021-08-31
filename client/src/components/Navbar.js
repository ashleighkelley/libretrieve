import React, {useState, useEffect}  from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
//import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';

const getLocalTheme = () => {
  let theme = 'amulet';
  if (localStorage.getItem('theme')){
    theme = localStorage.getItem('theme');
  }
  return theme;
}

export default function Navbar() {

  const [theme, setTheme] = useState(getLocalTheme());

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme])

  const toggleTheme = (theme) => {
    setTheme(theme);
  }

  return (
    <nav className='navbar'>
      <div className='nav-left'>
        <div className="title">
          <h2>Creature Club Pagemasters</h2>
        </div>
        {/*<ul className='nav-links'>
          <li>
            <Link to='/pastpicks'>Past Picks</Link>
          </li>
           to do: <li>
            <Link to='/pastsuggestions'>Past Suggestions</Link>
          </li> 
        </ul>*/}
        </div>
        <div class="nav-right">
        <Dropdown>
          <Dropdown.Toggle variant="success">Select a Theme</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={() => toggleTheme('juturna')}>Juturna</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => toggleTheme('olg')}>On Letting Go</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => toggleTheme('bsn')}>Blue Sky Noise</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => toggleTheme('waves')}>Violent Waves</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => toggleTheme('descensus')}>Descensus</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => toggleTheme('amulet')}>The Amulet</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  )
}
