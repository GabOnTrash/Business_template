import { useState, useEffect } from 'react';
import './App.css';

/* ── Components ── */
import Navbar        from './components/Navbar/Navbar';
import Hero          from './components/Hero/Hero';
import Menu          from './components/Menu/Menu';
import Staff         from './components/Staff/Staff';
import Story         from './components/Story/Story';
import LocationHours from './components/LocationHours/LocationHours';
import Footer        from './components/Footer/Footer';

/**
 * App — Assembla tutte le sezioni del sito.
 *
 * Per personalizzare i contenuti → src/config/businessConfig.js
 */
function App() {
  const [view, setView] = useState('home'); // 'home' | 'menu'

  /* ── Scroll Reveal Observer ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Smette di osservare dopo che l'elemento è apparso
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [view]);

  return (
    <div className="app">
      {/* ── Navigazione ── */}
      <Navbar view={view} setView={setView} />

      {/* ── Contenuto Principale ── */}
      {view === 'menu' ? (
        <main id="main-content">
          <Menu onBackToHome={() => setView('home')} />
        </main>
      ) : (
        <main id="main-content">

          {/* 1. Hero / Banner principale */}
          <Hero setView={setView} />

          {/* 2. La nostra storia (About) */}
          <Story />

          {/* 3. Dove siamo e Orari */}
          <LocationHours />

          {/* 4. Staff / Il Team */}
          <Staff />

        </main>
      )}

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}

export default App;
