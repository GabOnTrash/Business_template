import { useState } from 'react';
import { businessConfig } from '../../config/businessConfig';
import './Menu.css';

/**
 * Menu — Sezione menu con tab per categoria.
 *
 * PERSONALIZZAZIONE: Aggiungi/rimuovi categorie e piatti in
 * businessConfig.js → menu.categories
 */

export default function Menu({ onBackToHome }) {
  const { menu, tags } = businessConfig;
  const [activeTab, setActiveTab] = useState(menu.categories[0]?.id ?? '');

  const activeCategory = menu.categories.find((c) => c.id === activeTab);

  return (
    <section id="menu" className="menu menu--page" aria-labelledby="menu-title">
      <div className="container">

        {/* Back Button */}
        {onBackToHome && (
          <div className="menu__back-wrapper reveal">
            <button
              onClick={onBackToHome}
              className="menu__back-btn"
              aria-label="Torna alla home page"
            >
              <span>←</span> Torna alla Home
            </button>
          </div>
        )}

        {/* Section Header */}
        <div className="section-header reveal">
          <span className="section-eyebrow">Il Nostro</span>
          <h1 className="section-title" id="menu-title">Menu</h1>
          <p className="section-subtitle">
            Ingredienti selezionati, ricette di stagione — ogni piatto racconta la nostra filosofia.
          </p>
        </div>

        {/* Category Tabs */}
        <div
          className="menu__tabs reveal"
          role="tablist"
          aria-label="Categorie del menu"
        >
          {menu.categories.map((cat) => (
            <button
              key={cat.id}
              id={`tab-${cat.id}`}
              role="tab"
              aria-selected={activeTab === cat.id}
              aria-controls={`panel-${cat.id}`}
              className={`menu__tab ${activeTab === cat.id ? 'active' : ''}`}
              onClick={() => setActiveTab(cat.id)}
            >
              <span className="menu__tab-icon" aria-hidden="true">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Category Panel */}
        {activeCategory && (
          <div
            key={activeCategory.id}
            id={`panel-${activeCategory.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeCategory.id}`}
            className="menu__panel"
          >
            {activeCategory.items.map((item) => (
              <article key={item.id} className="menu__card">

                {/* Card Header */}
                <div className="menu__card-header">
                  <h3 className="menu__card-name">{item.name}</h3>
                  <span className="menu__card-price" aria-label={`Prezzo: ${item.price} euro`}>
                    {item.price}
                  </span>
                </div>

                {/* Description */}
                <p className="menu__card-description">{item.description}</p>

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="menu__card-tags" aria-label="Caratteristiche">
                    {item.tags.map((tagKey) => {
                      const tag = tags[tagKey];
                      if (!tag) return null;
                      return (
                        <span
                          key={tagKey}
                          className="menu__tag"
                          style={{
                            color: tag.color,
                            background: tag.bg,
                            borderColor: tag.color + '44',
                          }}
                        >
                          {tag.label}
                        </span>
                      );
                    })}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
