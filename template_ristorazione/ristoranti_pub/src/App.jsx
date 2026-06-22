import { useEffect } from 'react';
import './App.css';

/* ── Components ── */
import Navbar   from './components/Navbar/Navbar';
import Hero     from './components/Hero/Hero';
import Menu     from './components/Menu/Menu';
import Hours    from './components/Hours/Hours';
import Staff    from './components/Staff/Staff';
import Story    from './components/Story/Story';
import Location from './components/Location/Location';
import Footer   from './components/Footer/Footer';

/**
 * App — Assembla tutte le sezioni del sito.
 *
 * Per aggiungere/rimuovere sezioni:
 * 1. Importa il componente
 * 2. Aggiungilo/rimuovilo dal JSX qui sotto
 * 3. Aggiungi il link corrispondente in Navbar.jsx → navLinks
 *
 * Per personalizzare i contenuti → src/config/businessConfig.js
 */
function App() {

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
  }, []);

  return (
    <div className="app">
      {/* ── Navigazione ── */}
      <Navbar />

      {/* ── Contenuto Principale ── */}
      <main id="main-content">

        {/* 1. Hero / Banner principale */}
        <Hero />

        {/* 2. Menu */}
        <Menu />

        {/* 3. Orari di apertura */}
        <Hours />

        {/* 4. Staff / Il Team */}
        <Staff />

        {/* 5. La nostra storia */}
        <Story />

        {/* 6. Dove siamo / Mappa */}
        <Location />

      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}

export default App;
