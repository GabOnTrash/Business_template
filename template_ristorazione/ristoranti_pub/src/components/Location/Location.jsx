import { businessConfig } from '../../config/businessConfig';
import './Location.css';

export default function Location() {
  const { location, business } = businessConfig;

  const fullAddress = `${location.address}, ${location.cap} ${location.city} (${location.province})`;

  const infoItems = [
    {
      id: 'address',
      icon: '📍',
      label: 'Indirizzo',
      value: fullAddress,
      subvalue: location.country,
    },
    {
      id: 'phone',
      icon: '📞',
      label: 'Telefono',
      value: (
        <a
          href={`tel:${location.phone.replace(/\s/g, '')}`}
          className="location__info-link"
          aria-label={`Chiama ${location.phone}`}
        >
          {location.phone}
        </a>
      ),
      subvalue: null,
    },
    {
      id: 'email',
      icon: '✉️',
      label: 'Email',
      value: (
        <a
          href={`mailto:${location.email}`}
          className="location__info-link"
          aria-label={`Scrivi a ${location.email}`}
        >
          {location.email}
        </a>
      ),
      subvalue: null,
    },
    {
      id: 'transport',
      icon: '🚇',
      label: 'Come arrivare',
      value: location.transport,
      subvalue: location.parking,
    },
  ];

  return (
    <section id="location" className="location" aria-labelledby="location-title">
      <div className="container">

        {/* Section Header */}
        <div className="section-header reveal">
          <span className="section-eyebrow">Dove siamo</span>
          <h2 className="section-title" id="location-title">Vieni a Trovarci</h2>
          <p className="section-subtitle">
            Nel cuore della città, facile da raggiungere con i mezzi pubblici.
          </p>
        </div>

        <div className="location__grid">

          {/* Map */}
          <div className="location__map-wrapper reveal" aria-label="Mappa della posizione">
            <iframe
              id="location-map"
              src={location.mapsEmbedUrl}
              className="location__map"
              title={`Mappa di ${business.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label={`Mappa interattiva — ${fullAddress}`}
            />

            {/* Map overlay label */}
            <div className="location__map-label" aria-hidden="true">
              <div className="location__map-label-name">{business.name}</div>
              <div className="location__map-label-addr">{fullAddress}</div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="location__info reveal">

            {/* Info Items */}
            {infoItems.map((item) => (
              <div key={item.id} className="location__info-item">
                <div className="location__info-icon" aria-hidden="true">
                  {item.icon}
                </div>
                <div className="location__info-body">
                  <span className="location__info-label">{item.label}</span>
                  <div className="location__info-value">{item.value}</div>
                  {item.subvalue && (
                    <span className="location__info-subvalue">{item.subvalue}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Action Buttons */}
            <div className="location__actions">
              <a
                id="location-btn-maps"
                href={location.mapsDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="location__btn-maps"
              >
                <span aria-hidden="true">🗺️</span>
                Apri in Maps
              </a>
              <a
                id="location-btn-reserve"
                href={location.reservations}
                target="_blank"
                rel="noopener noreferrer"
                className="location__btn-reserve"
              >
                <span aria-hidden="true">📅</span>
                Prenota un tavolo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
