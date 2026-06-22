import { businessConfig } from '../../config/businessConfig';
import './Hero.css';

/**
 * Hero — Banner principale a schermo intero, layout editoriale left-aligned.
 * Riproduce fedelmente il design e il layout forniti dall'utente nella foto di riferimento.
 */
export default function Hero({ setView }) {
  const { hero, business } = businessConfig;

  return (
    <section id="home" className="hero" aria-label="Sezione principale">

      {/* ── Background Image ── */}
      <div className="hero__bg" aria-hidden="true">
        <img
          src={hero.backgroundImage}
          alt=""
          className="hero__bg-image"
          loading="eager"
          fetchpriority="high"
        />
      </div>

      {/* ── Gradient Overlay: scuro a sinistra (per leggibilità testo), sfumato a destra ── */}
      <div className="hero__overlay" aria-hidden="true" />

      {/* ── Contenuto testuale (left-aligned) ── */}
      <div className="hero__content">

        {/* Eyebrow — font calligrafico dorato "Benvenuti a [Nome] —" */}
        <p className="hero__eyebrow">
          Benvenuti a {business.name}
          <span className="hero__eyebrow-line" aria-hidden="true" />
        </p>

        {/* Headline principale — uppercase grande */}
        <h1 className="hero__headline">
          {hero.headline}
        </h1>

        {/* Divisore sottile dorato */}
        <div className="hero__divider" aria-hidden="true" />

        {/* Sottotitolo */}
        <p className="hero__subheadline">
          {hero.subheadline}
        </p>

        {/* ── CTA Button ── */}
        <div className="hero__actions">
          {/* Bottone primario: outlined rettangolare con angoli vivi + freccia, stile reference */}
          <a
            id="hero-cta-primary"
            href="#menu"
            className="hero__btn-primary"
            onClick={(e) => {
              if (setView) {
                e.preventDefault();
                setView('menu');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }
            }}
          >
            <span className="hero__btn-label">{hero.cta.primary.label}</span>
            <span className="hero__btn-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>

    </section>
  );
}
