import { businessConfig } from '../../config/businessConfig';
import './Story.css';

/**
 * Story — Sezione "La nostra storia" con immagine e timeline.
 *
 * PERSONALIZZAZIONE: Modifica story in businessConfig.js
 */

export default function Story() {
  const { story, business } = businessConfig;

  /* Calcola anni di attività dall'ultimo anno della timeline */
  const firstYear = parseInt(story.timeline[0]?.year, 10);
  const currentYear = new Date().getFullYear();
  const yearsActive = currentYear - firstYear;

  return (
    <section id="story" className="story" aria-labelledby="story-title">
      <div className="container">

        {/* Section Header */}
        <div className="section-header reveal">
          <span className="section-eyebrow">Le nostre radici</span>
          <h2 className="section-title" id="story-title">La Nostra Storia</h2>
        </div>

        <div className="story__layout">

          {/* Image */}
          <div className="story__image-wrapper reveal">
            <img
              src={story.image}
              alt={`Interno di ${business.name}`}
              className="story__image"
              loading="lazy"
            />

            {/* Badge anni di attività */}
            <div className="story__image-badge" aria-hidden="true">
              <span className="story__badge-number">{yearsActive}+</span>
              <span className="story__badge-label">anni di passione</span>
            </div>
          </div>

          {/* Content + Timeline */}
          <div className="story__content reveal">

            {/* Intro */}
            <p className="story__intro">{story.intro}</p>

            {/* Timeline */}
            <ol className="story__timeline" aria-label="Timeline della nostra storia">
              {story.timeline.map((item) => (
                <li key={item.year} className="story__timeline-item">

                  {/* Year Badge */}
                  <div className="story__timeline-year">
                    <span className="story__year-badge">{item.year}</span>
                  </div>

                  {/* Body */}
                  <div className="story__timeline-body">
                    <h3 className="story__timeline-title">{item.title}</h3>
                    <p className="story__timeline-description">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
