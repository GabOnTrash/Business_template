import { useState, useEffect } from 'react';
import { businessConfig } from '../../config/businessConfig';
import './Hours.css';

/**
 * Hours — Orari di apertura con badge "Aperto/Chiuso" in tempo reale.
 *
 * PERSONALIZZAZIONE: Modifica hours.schedule in businessConfig.js
 * Usa null per open/close nei giorni di chiusura.
 */

/**
 * Ritorna true se l'orario attuale è compreso nell'intervallo dato.
 * @param {string} open  - "HH:MM"
 * @param {string} close - "HH:MM"
 * @param {Date}   now
 */
function isTimeInRange(open, close, now) {
  if (!open || !close) return false;
  const [oh, om] = open.split(':').map(Number);
  const [ch, cm] = close.split(':').map(Number);
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const openMin  = oh * 60 + om;
  const closeMin = ch * 60 + cm;
  // Gestisce overnight (es. 23:00 → 01:00)
  if (closeMin < openMin) {
    return nowMin >= openMin || nowMin < closeMin;
  }
  return nowMin >= openMin && nowMin < closeMin;
}

/**
 * Controlla se il locale è aperto ora.
 */
function checkIsOpen(schedule, now) {
  const dayIndex = now.getDay(); // 0 = domenica
  // La config usa lunedì = indice 0, convertiamo
  const configIndex = dayIndex === 0 ? 6 : dayIndex - 1;
  const today = schedule[configIndex];
  if (!today || !today.open) return false;

  const lunchOpen = isTimeInRange(today.open, today.close, now);
  const dinnerOpen = today.eveningOpen
    ? isTimeInRange(today.eveningOpen, today.eveningClose, now)
    : false;
  return lunchOpen || dinnerOpen;
}

export default function Hours() {
  const { hours, business } = businessConfig;
  const [now, setNow] = useState(new Date());

  /* Aggiorna il clock ogni minuto */
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const isOpen = checkIsOpen(hours.schedule, now);

  /* Giorno corrente (indice config: lun=0 ... dom=6) */
  const dayIndex = now.getDay();
  const todayConfigIndex = dayIndex === 0 ? 6 : dayIndex - 1;

  const timeStr = now.toLocaleTimeString('it-IT', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <section id="hours" className="hours" aria-labelledby="hours-title">
      <div className="container">

        {/* Section Header */}
        <div className="section-header reveal">
          <span className="section-eyebrow">Quando trovarci</span>
          <h2 className="section-title" id="hours-title">Orari di Apertura</h2>
        </div>

        <div className="hours__grid">

          {/* Info Panel */}
          <div className="hours__info reveal">

            {/* Open/Closed Badge */}
            <div
              className={`hours__status ${isOpen ? 'hours__status--open' : 'hours__status--closed'}`}
              role="status"
              aria-live="polite"
              aria-label={isOpen ? 'Attualmente aperto' : 'Attualmente chiuso'}
            >
              <span className="hours__status-dot" aria-hidden="true" />
              {isOpen ? '🟢 Siamo aperti ora' : '🔴 Al momento chiusi'}
            </div>

            {/* Current Time */}
            <div className="hours__current-time" aria-label={`Ora attuale: ${timeStr}`}>
              {timeStr}
            </div>

            {/* Business info snippet */}
            <div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--fs-sm)', lineHeight: '1.7' }}>
                {business.description}
              </p>
            </div>

            {/* Note */}
            {hours.note && (
              <p className="hours__note" role="note">
                ℹ️ {hours.note}
              </p>
            )}
          </div>

          {/* Schedule Table */}
          <div className="hours__schedule reveal" role="table" aria-label="Orari settimanali">
            {hours.schedule.map((row, idx) => {
              const isToday = idx === todayConfigIndex;
              const isClosed = !row.open;

              return (
                <div
                  key={row.day}
                  role="row"
                  className={`hours__row ${isToday ? 'hours__row--today' : ''} ${isClosed ? 'hours__row--closed-day' : ''}`}
                >
                  {/* Day */}
                  <div role="cell" className="hours__day">
                    {row.day}
                    {isToday && (
                      <span className="hours__today-badge" aria-label="oggi">
                        oggi
                      </span>
                    )}
                  </div>

                  {/* Times */}
                  <div role="cell" className="hours__time-slots">
                    {isClosed ? (
                      <span className="hours__closed-label">Chiuso</span>
                    ) : (
                      <>
                        <span className="hours__time-slot">
                          🌞 {row.open} – {row.close}
                        </span>
                        {row.eveningOpen && (
                          <span className="hours__time-slot">
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
    </section>
  );
}
