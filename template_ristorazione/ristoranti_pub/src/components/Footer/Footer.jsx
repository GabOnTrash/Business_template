import { businessConfig } from '../../config/businessConfig';
import './Footer.css';

/**
 * Footer — Piè di pagina con brand, link rapidi e social.
 *
 * PERSONALIZZAZIONE: Modifica social e business in businessConfig.js
 */

const navLinks = [
  { label: 'Il Menu',    href: '#menu' },
  { label: 'Orari',      href: '#hours' },
  { label: 'Il Team',    href: '#staff' },
  { label: 'La Storia',  href: '#story' },
  { label: 'Dove siamo', href: '#location' },
];

const socialIcons = {
  instagram:   { label: 'Instagram',   emoji: '📸' },
  facebook:    { label: 'Facebook',     emoji: '👍' },
  tripadvisor: { label: 'TripAdvisor',  emoji: '🦉' },
  whatsapp:    { label: 'WhatsApp',     emoji: '💬' },
};

export default function Footer() {
  const { business, social, location } = businessConfig;
  const currentYear = new Date().getFullYear();

  const socialEntries = Object.entries(social).filter(([, url]) => url);

  return (
    <footer className="footer" aria-label="Piè di pagina">
      <div className="container">

        <div className="footer__top">

          {/* Brand Column */}
          <div>
            <a
              href="#"
              className="footer__brand-name"
              aria-label={`Torna in cima — ${business.name}`}
            >
              {business.name}
            </a>
            <p className="footer__brand-desc">
              {business.description}
            </p>

            {/* Social Icons */}
            <div className="footer__social" role="list" aria-label="Social media">
              {socialEntries.map(([key, url]) => {
                const icon = socialIcons[key];
                if (!icon) return null;
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__social-link"
                    aria-label={icon.label}
                    role="listitem"
                    title={icon.label}
                  >
                    {icon.emoji}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <span className="footer__col-title">Navigazione</span>
            <ul className="footer__col-list" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer__col-link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts Column */}
          <div>
            <span className="footer__col-title">Contatti</span>
            <ul className="footer__col-list" role="list">
              <li>
                <a href={`tel:${location.phone.replace(/\s/g, '')}`} className="footer__col-link">
                  📞 {location.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${location.email}`} className="footer__col-link">
                  ✉️ {location.email}
                </a>
              </li>
              <li>
                <span className="footer__col-text">
                  📍 {location.address}<br />
                  {location.cap} {location.city}
                </span>
              </li>
            </ul>
          </div>

          {/* Info Column */}
          <div>
            <span className="footer__col-title">Info</span>
            <ul className="footer__col-list" role="list">
              <li>
                <a
                  href={location.reservations}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__col-link"
                >
                  📅 Prenota un tavolo
                </a>
              </li>
              <li>
                <a href="#menu" className="footer__col-link">
                  🍽️ Consulta il menu
                </a>
              </li>
              <li>
                <a href="#hours" className="footer__col-link">
                  🕐 Orari di apertura
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} {business.name} — P.IVA {business.vatNumber}
          </p>
          <nav className="footer__legal" aria-label="Link legali">
            <a href="#" className="footer__legal-link">Privacy Policy</a>
            <a href="#" className="footer__legal-link">Cookie Policy</a>
            <a href="#" className="footer__legal-link">Note legali</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
