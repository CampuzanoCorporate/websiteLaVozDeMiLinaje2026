"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  return (
    <header className={`header }`}>
      <nav className="nav-container">
        <div className="logo">
          <Link href="../" className="logo">LA VOZ DE MI LINAJE</Link>
        </div>
        
        <ul className={`nav-menu ${menuAbierto ? 'active' : ''}`} id="navMenu">
          <li><Link href="/servicios" className="nav-link">SERVICIOS</Link></li>
          <li><Link href="/contacta" className="nav-link">CONTACTO</Link></li>
          <li><Link href="/conocenos" className="nav-link">SOBRE MÍ</Link></li>
        </ul>
        
        <div className="header-actions">
          <Link href="/reservar" className="btn-reserve">RESERVA AHORA</Link>
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
