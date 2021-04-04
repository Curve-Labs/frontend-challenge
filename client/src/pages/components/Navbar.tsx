import React from 'react'
import ThemeSwitcher from './ThemeSwitcher';

function Navbar() {
    return (
        <nav className="nav-style">
            <ul>
            <li>Swap</li>
            <div className="nav-style-secondary">
            <li className="button-primary">Connect Wallet</li>
            <ThemeSwitcher/>
            </div>
            </ul>
        </nav>
    )
}

export default Navbar
