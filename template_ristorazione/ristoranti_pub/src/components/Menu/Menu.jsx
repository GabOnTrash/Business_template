import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../../config/supabaseClient';
import { businessConfig } from '../../config/businessConfig';
import './Menu.css';

/**
 * Menu — Carica categorie e piatti da Supabase.
 * Layout dark + filtri: search con autocomplete, dropdown categoria, dropdown tag.
 */

/* ── Icone categoria ── */
const CATEGORY_ICONS = {
  stuzzicherie:  '🍢',
  contorni:      '🥦',
  primi_piatti:  '🍝',
  secondi_piatti:'🥩',
  panini:        '🥪',
  panfocaccia:   '🫓',
  ciabatte:      '🥖',
  insalate:      '🥗',
  bibite:        '🥤',
  antipasti:     '🥗',
  dolci:         '🍮',
  drink:         '🍷',
};

/* ── Placeholder thumbnail ── */
function DishPlaceholder({ categoryId }) {
  const icon = CATEGORY_ICONS[categoryId] ?? '🍽️';
  return (
    <div className="menu__dish-thumb menu__dish-thumb--placeholder" aria-hidden="true">
      <span className="menu__dish-thumb-icon">{icon}</span>
    </div>
  );
}

/* ── Evidenzia il testo che corrisponde alla ricerca ── */
function Highlight({ text, query }) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="menu__highlight">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

/* ── Card singolo piatto ── */
function DishCard({ item, categoryId, tags, searchQuery }) {
  return (
    <article className="menu__dish">
      {item.image_url ? (
        <img className="menu__dish-thumb" src={item.image_url} alt={item.name} loading="lazy" />
      ) : (
        <DishPlaceholder categoryId={categoryId} />
      )}

      <div className="menu__dish-info">
        <h3 className="menu__dish-name">
          <Highlight text={item.name} query={searchQuery} />
        </h3>
        {item.description && (
          <p className="menu__dish-desc">{item.description}</p>
        )}
        {item.tags && item.tags.length > 0 && (
          <div className="menu__dish-tags">
            {item.tags.map((tagKey) => {
              const tag = tags[tagKey];
              if (!tag) return null;
              return (
                <span
                  key={tagKey}
                  className="menu__tag"
                  style={{ color: tag.color, background: tag.bg, borderColor: tag.color + '44' }}
                >
                  {tag.label}
                </span>
              );
            })}
          </div>
        )}
      </div>

      <div className="menu__dish-price" aria-label={`Prezzo: ${item.price} euro`}>
        <span className="menu__dish-price-currency">€</span>
        {Number(item.price).toFixed(2)}
      </div>
    </article>
  );
}

/* ── Divisore decorativo ── */
function SectionDivider({ eyebrow }) {
  return (
    <div className="menu__cat-eyebrow-wrap">
      <span className="menu__cat-eyebrow">{eyebrow}</span>
      <div className="menu__cat-divider">
        <span className="menu__cat-divider-line" />
        <span className="menu__cat-divider-icon">✦</span>
        <span className="menu__cat-divider-line" />
      </div>
    </div>
  );
}

/* ── Skeleton loading ── */
function SkeletonSection() {
  return (
    <div className="menu__skeleton-section">
      <div className="menu__skeleton-eyebrow skeleton-pulse" />
      <div className="menu__skeleton-title skeleton-pulse" />
      <div className="menu__skeleton-grid">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="menu__skeleton-card skeleton-pulse" />
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPALE
   ════════════════════════════════════════════════════════════════ */
export default function Menu({ onBackToHome }) {
  const { tags } = businessConfig;

  /* ── Dati ── */
  const [categories, setCategories] = useState([]);
  const [items, setItems]           = useState({});
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);

  /* ── Filtri ── */
  const [searchQuery, setSearchQuery]       = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // null = tutte
  const [showCatDropdown, setShowCatDropdown]   = useState(false);
  const [selectedTag, setSelectedTag]           = useState(null); // null = tutti
  const [showTagDropdown, setShowTagDropdown]   = useState(false);

  const searchRef   = useRef(null);
  const catDropRef  = useRef(null);
  const tagDropRef  = useRef(null);

  /* ── Chiudi dropdown cliccando fuori ── */
  useEffect(() => {
    function handleClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSuggestions(false);
      if (catDropRef.current && !catDropRef.current.contains(e.target)) setShowCatDropdown(false);
      if (tagDropRef.current && !tagDropRef.current.contains(e.target)) setShowTagDropdown(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  /* ── Observer reveal dopo il fetch ── */
  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.menu__category-section.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading, selectedCategory, searchQuery, selectedTag]);

  /* ── Fetch Supabase ── */
  useEffect(() => {
    async function loadMenu() {
      setLoading(true);
      setError(null);
      try {
        const { data: cats, error: catErr } = await supabase
          .from('menu_categories').select('*').order('sort_order', { ascending: true });
        if (catErr) throw catErr;

        const { data: dishes, error: dishErr } = await supabase
          .from('menu_items').select('*').order('sort_order', { ascending: true });
        if (dishErr) throw dishErr;

        const grouped = {};
        (dishes ?? []).forEach((d) => {
          if (!grouped[d.category_id]) grouped[d.category_id] = [];
          grouped[d.category_id].push(d);
        });

        setCategories(cats ?? []);
        setItems(grouped);
      } catch (err) {
        console.error('Errore caricamento menu:', err);
        setError('Impossibile caricare il menu. Riprova più tardi.');
      } finally {
        setLoading(false);
      }
    }
    loadMenu();
  }, []);

  /* ── Tutti i piatti in lista piatta (per autocomplete) ── */
  const allDishes = Object.values(items).flat();

  /* ── Suggerimenti autocomplete ── */
  const suggestions = searchQuery.trim().length >= 1
    ? allDishes
        .filter((d) => d.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 6)
    : [];

  /* ── Logica filtro piatti per categoria ── */
  const getFilteredItems = useCallback((categoryId) => {
    let list = items[categoryId] ?? [];
    if (selectedTag)   list = list.filter((d) => d.tags?.includes(selectedTag));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((d) =>
        d.name.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [items, selectedTag, searchQuery]);

  /* ── Categorie visibili ── */
  const visibleCategories = selectedCategory
    ? categories.filter((c) => c.id === selectedCategory)
    : categories;

  /* ── Nessun risultato ── */
  const hasResults = visibleCategories.some((c) => getFilteredItems(c.id).length > 0);

  /* ── Handler ricerca ── */
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (name) => {
    setSearchQuery(name);
    setShowSuggestions(false);
  };

  const clearSearch = () => { setSearchQuery(''); setShowSuggestions(false); };

  /* ════════════════════════════════════════════════════════════════
     RENDER
     ════════════════════════════════════════════════════════════════ */
  return (
    <section id="menu" className="menu menu--page" aria-labelledby="menu-title">

      {/* ── Hero Banner ── */}
      <div className="menu__hero">
        <div className="menu__hero-overlay" />
        <div className="menu__hero-content">
          <span className="menu__hero-eyebrow">Delicious &amp; Amazing</span>
          <div className="menu__hero-divider">
            <span className="menu__hero-divider-line" />
            <span className="menu__hero-divider-icon">✦</span>
            <span className="menu__hero-divider-line" />
          </div>
          <h1 className="menu__hero-title" id="menu-title">Il Nostro Menu</h1>
        </div>
      </div>

      <div className="container">




        {/* ════════════════════════════════
            BARRA FILTRI
            ════════════════════════════════ */}
        {!loading && !error && (
          <div className="menu__filters" role="search" aria-label="Filtra il menu">

            {/* ── 1. Barra di ricerca + autocomplete ── */}
            <div className="menu__filter-search" ref={searchRef}>
              <span className="menu__filter-search-icon" aria-hidden="true">🔍</span>
              <input
                id="menu-search"
                type="text"
                className="menu__filter-search-input"
                placeholder="Cerca un piatto..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery && setShowSuggestions(true)}
                autoComplete="off"
                aria-autocomplete="list"
                aria-controls="menu-suggestions"
                aria-label="Cerca un piatto"
              />
              {searchQuery && (
                <button className="menu__filter-search-clear" onClick={clearSearch} aria-label="Cancella ricerca">
                  ✕
                </button>
              )}

              {/* Suggerimenti */}
              {showSuggestions && suggestions.length > 0 && (
                <ul
                  id="menu-suggestions"
                  className="menu__suggestions"
                  role="listbox"
                  aria-label="Suggerimenti"
                >
                  {suggestions.map((d) => (
                    <li
                      key={d.id}
                      role="option"
                      className="menu__suggestion-item"
                      onMouseDown={() => handleSuggestionClick(d.name)}
                    >
                      <span className="menu__suggestion-icon" aria-hidden="true">
                        {CATEGORY_ICONS[d.category_id] ?? '🍽️'}
                      </span>
                      <span>
                        <Highlight text={d.name} query={searchQuery} />
                      </span>
                      <span className="menu__suggestion-price">
                        €{Number(d.price).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* ── 2. Dropdown Sezione ── */}
            <div className="menu__filter-dropdown" ref={catDropRef}>
              <button
                id="filter-category-btn"
                className={`menu__filter-btn ${selectedCategory ? 'active' : ''}`}
                onClick={() => { setShowCatDropdown((p) => !p); setShowTagDropdown(false); }}
                aria-haspopup="listbox"
                aria-expanded={showCatDropdown}
                aria-controls="filter-category-list"
              >
                <span className="menu__filter-btn-icon" aria-hidden="true">📋</span>
                <span className="menu__filter-btn-label">
                  {selectedCategory
                    ? categories.find((c) => c.id === selectedCategory)?.label ?? 'Sezione'
                    : 'Sezione'}
                </span>
                <span className={`menu__filter-btn-arrow ${showCatDropdown ? 'open' : ''}`} aria-hidden="true">▾</span>
              </button>

              {showCatDropdown && (
                <ul
                  id="filter-category-list"
                  className="menu__filter-list"
                  role="listbox"
                  aria-label="Filtra per sezione"
                >
                  <li
                    role="option"
                    aria-selected={selectedCategory === null}
                    className={`menu__filter-option ${selectedCategory === null ? 'selected' : ''}`}
                    onMouseDown={() => { setSelectedCategory(null); setShowCatDropdown(false); }}
                  >
                    <span>🍽️</span> Tutte le sezioni
                    {selectedCategory === null && <span className="menu__filter-check">✓</span>}
                  </li>
                  {categories.map((cat) => (
                    <li
                      key={cat.id}
                      role="option"
                      aria-selected={selectedCategory === cat.id}
                      className={`menu__filter-option ${selectedCategory === cat.id ? 'selected' : ''}`}
                      onMouseDown={() => { setSelectedCategory(cat.id); setShowCatDropdown(false); }}
                    >
                      <span>{cat.icon ?? CATEGORY_ICONS[cat.id] ?? '🍽️'}</span>
                      {cat.label}
                      {selectedCategory === cat.id && <span className="menu__filter-check">✓</span>}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* ── 3. Dropdown Caratteristiche ── */}
            <div className="menu__filter-dropdown" ref={tagDropRef}>
              <button
                id="filter-tag-btn"
                className={`menu__filter-btn ${selectedTag ? 'active' : ''}`}
                onClick={() => { setShowTagDropdown((p) => !p); setShowCatDropdown(false); }}
                aria-haspopup="listbox"
                aria-expanded={showTagDropdown}
                aria-controls="filter-tag-list"
              >
                <span className="menu__filter-btn-icon" aria-hidden="true">🏷️</span>
                <span className="menu__filter-btn-label">
                  {selectedTag ? tags[selectedTag]?.label ?? 'Caratteristiche' : 'Caratteristiche'}
                </span>
                <span className={`menu__filter-btn-arrow ${showTagDropdown ? 'open' : ''}`} aria-hidden="true">▾</span>
              </button>

              {showTagDropdown && (
                <ul
                  id="filter-tag-list"
                  className="menu__filter-list"
                  role="listbox"
                  aria-label="Filtra per caratteristica"
                >
                  <li
                    role="option"
                    aria-selected={selectedTag === null}
                    className={`menu__filter-option ${selectedTag === null ? 'selected' : ''}`}
                    onMouseDown={() => { setSelectedTag(null); setShowTagDropdown(false); }}
                  >
                    <span>🍽️</span> Tutte le caratteristiche
                    {selectedTag === null && <span className="menu__filter-check">✓</span>}
                  </li>
                  {Object.entries(tags).map(([key, tag]) => (
                    <li
                      key={key}
                      role="option"
                      aria-selected={selectedTag === key}
                      className={`menu__filter-option ${selectedTag === key ? 'selected' : ''}`}
                      onMouseDown={() => { setSelectedTag(key); setShowTagDropdown(false); }}
                      style={{ '--tag-color': tag.color }}
                    >
                      <span>{tag.label.split(' ')[0]}</span>
                      {tag.label.split(' ').slice(1).join(' ')}
                      {selectedTag === key && <span className="menu__filter-check" style={{ color: tag.color }}>✓</span>}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* ── Badge filtri attivi ── */}
            {(selectedCategory || selectedTag || searchQuery) && (
              <button
                className="menu__filter-reset"
                onClick={() => { setSelectedCategory(null); setSelectedTag(null); setSearchQuery(''); }}
                aria-label="Rimuovi tutti i filtri"
              >
                Rimuovi filtri ✕
              </button>
            )}
          </div>
        )}

        {/* ── Loading ── */}
        {loading && (
          <div className="menu__loading" role="status" aria-live="polite">
            <SkeletonSection />
            <SkeletonSection />
          </div>
        )}

        {/* ── Error ── */}
        {error && (
          <div className="menu__error" role="alert">
            <span className="menu__error-icon">⚠️</span>
            <p>{error}</p>
            <button className="menu__back-btn" onClick={() => window.location.reload()}>
              Ricarica la pagina
            </button>
          </div>
        )}

        {/* ── Sezioni Categoria ── */}
        {!loading && !error && visibleCategories.map((cat, catIdx) => {
          const catItems = getFilteredItems(cat.id);
          if (catItems.length === 0) return null;

          return (
            <div
              key={cat.id}
              id={`cat-section-${cat.id}`}
              className="menu__category-section reveal"
              role="tabpanel"
              aria-labelledby={`tab-${cat.id}`}
            >
              <SectionDivider eyebrow={catIdx % 2 === 0 ? 'Il Nostro Menu' : 'Specialità'} />
              <h2 className="menu__cat-title">{cat.label}</h2>

              <div className="menu__dishes-grid">
                {catItems.map((dish) => (
                  <DishCard
                    key={dish.id}
                    item={dish}
                    categoryId={cat.id}
                    tags={tags}
                    searchQuery={searchQuery}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {/* ── Nessun risultato ── */}
        {!loading && !error && !hasResults && (
          <div className="menu__empty">
            <span className="menu__empty-icon">🔍</span>
            <p>Nessun piatto trovato per i filtri selezionati.</p>
            <button
              className="menu__back-btn"
              onClick={() => { setSelectedCategory(null); setSelectedTag(null); setSearchQuery(''); }}
            >
              Rimuovi filtri
            </button>
          </div>
        )}

        {/* ── Menu vuoto ── */}
        {!loading && !error && categories.length === 0 && (
          <div className="menu__empty">
            <p>Menu non ancora disponibile. Torna presto!</p>
          </div>
        )}
      </div>
    </section>
  );
}
