import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <nav className='navbar'>
      <div className='nav-center'>
        <div className="title">
          <h2>Creature Club Book Club</h2>
        </div>
        <ul className='nav-links'>
          <li>
            <Link to='/picks'>Past Picks</Link>
          </li>
          <li>
            <Link to='/suggestions'>Past Suggestions</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
