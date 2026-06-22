import { businessConfig } from '../../config/businessConfig';
import './Staff.css';

/**
 * Staff — Schede del team con foto, ruolo e bio.
 *
 * PERSONALIZZAZIONE: Modifica l'array staff in businessConfig.js
 */

export default function Staff() {
  const { staff } = businessConfig;

  return (
    <section id="staff" className="staff" aria-labelledby="staff-title">
      <div className="container">

        {/* Section Header */}
        <div className="section-header reveal">
          <span className="section-eyebrow">Le persone dietro i piatti</span>
          <h2 className="section-title" id="staff-title">Il Nostro Team</h2>
          <p className="section-subtitle">
            Professionisti appassionati che ogni giorno mettono cuore e talento in quello che fanno.
          </p>
        </div>

        {/* Staff Grid */}
        <div className="staff__grid">
          {staff.map((member, idx) => (
            <article
              key={member.id}
              className="staff__card reveal"
              style={{ transitionDelay: `${idx * 80}ms` }}
              aria-label={`${member.name}, ${member.role}`}
            >

              {/* Photo */}
              <div className="staff__photo-wrapper">
                {member.image ? (
                  <>
                    <img
                      src={member.image}
                      alt={`${member.name} — ${member.role}`}
                      className="staff__photo"
                      loading="lazy"
                    />
                    {/* Overlay with social */}
                    {member.social?.instagram && (
                      <div className="staff__photo-overlay" aria-hidden="true">
                        <a
                          href={member.social.instagram}
                          className="staff__social-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Instagram di ${member.name}`}
                          tabIndex="-1"
                        >
                          IG
                        </a>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="staff__photo-placeholder" aria-hidden="true">
                    👤
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="staff__info">
                <h3 className="staff__name">{member.name}</h3>
                <span className="staff__role">{member.role}</span>
                <p className="staff__bio">{member.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
