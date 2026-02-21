"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [modoOscuro, setModoOscuro] = useState(false);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const toggleModoOscuro = () => setModoOscuro(!modoOscuro);

  return (
    <header className={`header ${modoOscuro ? 'dark' : ''}`}>
      <nav className="nav-container">
        <div className="logo">LA VOZ DE MI LINAJE</div>
        
        <ul className={`nav-menu ${menuAbierto ? 'active' : ''}`} id="navMenu">
          <li><Link href="/" className="nav-link">INICIO</Link></li>
          <li><Link href="/conocenos" className="nav-link">SOBRE MÍ</Link></li>
          <li><Link href="/servicios" className="nav-link">SERVICIOS</Link></li>
        </ul>
        
        <div className="header-actions">
          <Link href="/servicios" className="btn-reserve">RESERVA AHORA</Link>
          <button 
            className="dark-mode-toggle" 
            onClick={toggleModoOscuro} 
            aria-label="Toggle dark mode"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
            </svg>
          </button>
        </div>
        
        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
}
