import { useState, useEffect } from 'react';
import { businessConfig } from '../../config/businessConfig';
import './LocationHours.css';

/**
 * Controlla se l'orario corrente rientra nell'intervallo specificato.
 */
function isTimeInRange(open, close, now) {
  if (!open || !close) return false;
  const [oh, om] = open.split(':').map(Number);
  const [ch, cm] = close.split(':').map(Number);
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const openMin  = oh * 60 + om;
  const closeMin = ch * 60 + cm;
  // Gestisce l'orario notturno (es. 23:00 → 01:00)
  if (closeMin < openMin) {
    return nowMin >= openMin || nowMin < closeMin;
  }
  return nowMin >= openMin && nowMin < closeMin;
}

/**
 * Controlla se l'attività è attualmente aperta.
 */
function checkIsOpen(schedule, now) {
  const dayIndex = now.getDay(); // 0 = domenica
  const configIndex = dayIndex === 0 ? 6 : dayIndex - 1; // 0 = lunedì ... 6 = domenica
  const today = schedule[configIndex];
  if (!today || !today.open) return false;

  const lunchOpen = isTimeInRange(today.open, today.close, now);
  const dinnerOpen = today.eveningOpen
    ? isTimeInRange(today.eveningOpen, today.eveningClose, now)
    : false;
  return lunchOpen || dinnerOpen;
}

export default function LocationHours() {
  const { location, business, hours } = businessConfig;
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const isOpen = checkIsOpen(hours.schedule, now);
  const dayIndex = now.getDay();
  const todayConfigIndex = dayIndex === 0 ? 6 : dayIndex - 1;

  const timeStr = now.toLocaleTimeString('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const fullAddress = `${location.address}, ${location.cap} ${location.city} (${location.province})`;

  const infoItems = [
    {
      id: 'address',
      icon: <div className="apng-icon" id="address-icon" aria-hidden="true"></div>,
      label: 'Indirizzo',
      value: fullAddress,
      subvalue: location.country,
    },
    {
      id: 'phone',
      icon: <div className="apng-icon" id="telephone-icon" aria-hidden="true"></div>,
      label: 'Telefono',
      value: (
        <a
          href={`tel:${location.phone.replace(/\s/g, '')}`}
          className="location-hours__info-link"
          aria-label={`Chiama ${location.phone}`}
        >
          {location.phone}
        </a>
      ),
      subvalue: null,
    },
    {
      id: 'email',
      icon: <div className="apng-icon" id="letter-icon" aria-hidden="true"></div>,
      label: 'Email',
      value: (
        <a
          href={`mailto:${location.email}`}
          className="location-hours__info-link"
          aria-label={`Scrivi a ${location.email}`}
        >
          {location.email}
        </a>
      ),
      subvalue: null,
    },
    {
      id: 'transport',
      icon: <div className="apng-icon" id="car-icon" aria-hidden="true"></div>,
      label: 'Come arrivare',
      value: location.transport,
      subvalue: location.parking,
    },
  ];

  return (
    <section id="location-hours" className="location-hours" aria-labelledby="location-hours-title">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header reveal">
          <span className="section-eyebrow">Dove siamo & Orari</span>
          <h2 className="section-title" id="location-hours-title">Vieni a Trovarci</h2>
          <p className="section-subtitle">
            Nel cuore della città, facile da raggiungere e con orari flessibili per ogni tua esigenza.
          </p>
        </div>

        <div className="location-hours__grid">
          
          {/* Left Column: Map & Contact Info */}
          <div className="location-hours__col-left reveal">
            {/* Map */}
            <div className="location-hours__map-wrapper" aria-label="Mappa della posizione">
              <iframe
                id="location-hours-map"
                src={location.mapsEmbedUrl}
                className="location-hours__map"
                title={`Mappa di ${business.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label={`Mappa interattiva — ${fullAddress}`}
              />
              <div className="location-hours__map-label" aria-hidden="true">
                <div className="location-hours__map-label-name">{business.name}</div>
                <div className="location-hours__map-label-addr">{fullAddress}</div>
              </div>
            </div>

            {/* Contact Info Cards */}
            <div className="location-hours__info-list">
              {infoItems.map((item) => (
                <div key={item.id} className="location-hours__info-item">
                  <div className="location-hours__info-icon" aria-hidden="true">
                    {item.icon}
                  </div>
                  <div className="location-hours__info-body">
                    <span className="location-hours__info-label">{item.label}</span>
                    <div className="location-hours__info-value">{item.value}</div>
                    {item.subvalue && (
                      <span className="location-hours__info-subvalue">{item.subvalue}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="location-hours__actions">
              <a
                id="location-hours-btn-maps"
                href={location.mapsDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="location-hours__btn-maps"
              >
                <span aria-hidden="true">🗺️</span>
                Apri in Maps
              </a>
              <a
                id="location-hours-btn-reserve"
                href={location.reservations}
                target="_blank"
                rel="noopener noreferrer"
                className="location-hours__btn-reserve"
              >
                <span aria-hidden="true">📅</span>
                Prenota un tavolo
              </a>
            </div>
          </div>

          {/* Right Column: Opening Hours & Status */}
          <div className="location-hours__col-right reveal">
            <div className="location-hours__status-card">
              {/* Open/Closed Badge */}
              <div
                className={`location-hours__status ${isOpen ? 'location-hours__status--open' : 'location-hours__status--closed'}`}
                role="status"
                aria-live="polite"
                aria-label={isOpen ? 'Attualmente aperto' : 'Attualmente chiuso'}
              >
                <span className="location-hours__status-dot" aria-hidden="true" />
                {isOpen ? '🟢 Siamo aperti ora' : '🔴 Al momento chiusi'}
              </div>

              {/* Current Time */}
              <div className="location-hours__current-time" aria-label={`Ora attuale: ${timeStr}`}>
                {timeStr}
              </div>

              <p className="location-hours__description">
                {business.description}
              </p>

              {hours.note && (
                <div className="location-hours__note" role="note">
                  <span>ℹ️</span> {hours.note}
                </div>
              )}
            </div>

            {/* Schedule Table */}
            <div className="location-hours__schedule" role="table" aria-label="Orari settimanali">
              {hours.schedule.map((row, idx) => {
                const isToday = idx === todayConfigIndex;
                const isClosed = !row.open;

                return (
                  <div
                    key={row.day}
                    role="row"
                    className={`location-hours__row ${isToday ? 'location-hours__row--today' : ''} ${isClosed ? 'location-hours__row--closed-day' : ''}`}
                  >
                    <div role="cell" className="location-hours__day">
                      {row.day}
                      {isToday && (
                        <span className="location-hours__today-badge" aria-label="oggi">
                          oggi
                        </span>
                      )}
                    </div>

                    <div role="cell" className="location-hours__time-slots">
                      {isClosed ? (
                        <span className="location-hours__closed-label">Chiuso</span>
                      ) : (
                        <>
                          <span className="location-hours__time-slot">
                            🌞 {row.open} – {row.close}
                          </span>
                          {row.eveningOpen && (
                            <span className="location-hours__time-slot">
                              🌙 {row.eveningOpen} – {row.eveningClose}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
