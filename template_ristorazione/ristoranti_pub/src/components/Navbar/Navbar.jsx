import { useState, useEffect } from 'react';
import { businessConfig } from '../../config/businessConfig';
import './Navbar.css';

const navLinks = [
  { label: 'Menu',               type: 'page',   value: 'menu' },
  { label: 'La Storia',          type: 'anchor', href: '#story' },
  { label: 'Dove siamo e Orari', type: 'anchor', href: '#location-hours' },
  { label: 'Il Team',            type: 'anchor', href: '#staff' },
];

export default function Navbar({ view, setView }) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  /* Scroll listener */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Chiudi menu mobile e gestisci navigazione */
  const handleLinkClick = (e, link) => {
    setMenuOpen(false);

    if (link.type === 'page') {
      e.preventDefault();
      setView(link.value);
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      if (view !== 'home') {
        e.preventDefault();
        setView('home');
        // Attendi che il DOM venga renderizzato per effettuare lo scroll
        setTimeout(() => {
          const el = document.querySelector(link.href);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      } else {
        e.preventDefault();
        const el = document.querySelector(link.href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  /* Blocca scroll body quando menu mobile è aperto */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        id="navbar"
        className={`navbar ${scrolled || menuOpen ? 'navbar--scrolled' : 'navbar--transparent'}`}
        role="banner"
      >
        <div className="container navbar__inner">

          {/* Logo */}
          <a
            className="navbar__logo"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label={`${businessConfig.business.name} — torna all'inizio`}
          >
            <img 
              className="navbar__logo-img" 
              src={businessConfig.business.image} 
              alt={`Logo ${businessConfig.business.name}`} 
            />
          </a>
          
          {/* Desktop nav */}
          <nav className="navbar__nav" aria-label="Navigazione principale">
            {navLinks.map((link) => (
              <a
                key={link.label}
                className={`navbar__link ${view === link.value ? 'active' : ''}`}
                href={link.href || '#'}
                onClick={(e) => handleLinkClick(e, link)}
              >
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
            key={link.label}
            className="navbar__mobile-link"
            href={link.href || '#'}
            onClick={(e) => handleLinkClick(e, link)}
          >
            {link.label}
          </a>
        ))}
        <a
          className="navbar__mobile-cta"
          href={businessConfig.location.reservations}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
        >
          Prenota un tavolo
        </a>
      </nav>
    </>
  );
}
