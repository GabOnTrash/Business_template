import { businessConfig } from '../../config/businessConfig';
import './Hero.css';

/**
 * Hero — Sezione banner principale a schermo intero.
 *
 * PERSONALIZZAZIONE: Modifica hero.backgroundImage, headline,
 * subheadline e cta in businessConfig.js
 */

export default function Hero() {
  const { hero, business } = businessConfig;

  return (
    <section id="home" className="hero" aria-label="Sezione principale">

      {/* Background Image */}
      <div className="hero__bg" aria-hidden="true">
        <img
          src={hero.backgroundImage}
          alt=""
          className="hero__bg-image"
          loading="eager"
          fetchpriority="high"
        />
      </div>

      {/* Dark Overlay */}
      <div className="hero__overlay" aria-hidden="true" />

      {/* Content */}
      <div className="hero__content">

        {/* Eyebrow / Pill badge */}
        <div className="hero__eyebrow" aria-hidden="true">
          <span>🍽️</span>
          <span>{business.tagline}</span>
        </div>

        {/* Main Headline */}
        <h1 className="hero__headline">
          {hero.headline}
        </h1>

        {/* Sub-headline */}
        <p className="hero__subheadline">
          {hero.subheadline}
        </p>

        {/* CTA Buttons */}
        <div className="hero__actions">
          <a
            id="hero-cta-primary"
            href={hero.cta.primary.href}
            className="hero__btn-primary"
          >
            <span>🍴</span>
            {hero.cta.primary.label}
          </a>
          <a
            id="hero-cta-secondary"
            href={hero.cta.secondary.href}
            className="hero__btn-secondary"
          >
            <span>📍</span>
            {hero.cta.secondary.label}
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero__scroll-indicator" aria-hidden="true">
        <div className="hero__scroll-mouse">
          <span className="hero__scroll-dot" />
        </div>
        <span className="hero__scroll-label">Scorri</span>
      </div>
    </section>
  );
}
