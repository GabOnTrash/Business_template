import { useState, useEffect } from 'react';
import { businessConfig } from '../../config/businessConfig';
import './Navbar.css';

/**
 * Navbar — Barra di navigazione fissa con sticky scroll e hamburger mobile.
 *
 * PERSONALIZZAZIONE: Modifica i link nav in businessConfig.js oppure
 * direttamente nell'array `navLinks` qui sotto.
 */

const navLinks = [
  { label: 'Menu',     href: '#menu' },
  { label: 'Orari',    href: '#hours' },
  { label: 'Il Team',  href: '#staff' },
  { label: 'La Storia',href: '#story' },
  { label: 'Dove siamo', href: '#location' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  /* Scroll listener */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Chiudi menu mobile quando si clicca un link */
  const handleLinkClick = () => setMenuOpen(false);

  /* Blocca scroll body quando menu mobile è aperto */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        id="navbar"
        className={`navbar ${scrolled ? 'navbar--scrolled' : 'navbar--transparent'}`}
        role="banner"
      >
        <div className="container navbar__inner">

          {/* Logo */}
          <a
            className="navbar__logo"
            href="#"
            aria-label={`${businessConfig.business.name} — torna all'inizio`}
          >
            <span className="navbar__logo-name">{businessConfig.business.name}</span>
            <span className="navbar__logo-tagline">{businessConfig.business.tagline}</span>
          </a>

          {/* Desktop nav */}
          <nav className="navbar__nav" aria-label="Navigazione principale">
            {navLinks.map((link) => (
              <a key={link.href} className="navbar__link" href={link.href}>
                {link.label}
              </a>
            ))}
            <a
              className="navbar__cta"
              href={businessConfig.location.reservations}
              target="_blank"
              rel="noopener noreferrer"
              id="navbar-reserve-btn"
            >
              Prenota
            </a>
          </nav>

          {/* Hamburger (mobile) */}
          <button
            id="navbar-hamburger"
            className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <nav
        id="mobile-menu"
        className={`navbar__mobile-menu ${menuOpen ? 'open' : ''}`}
        aria-label="Menu mobile"
        aria-hidden={!menuOpen}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            className="navbar__mobile-link"
            href={link.href}
            onClick={handleLinkClick}
          >
            {link.label}
          </a>
        ))}
        <a
          className="navbar__mobile-cta"
          href={businessConfig.location.reservations}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleLinkClick}
        >
          Prenota un tavolo
        </a>
      </nav>
    </>
  );
}
