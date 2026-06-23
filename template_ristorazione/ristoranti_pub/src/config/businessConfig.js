/**
 * ═══════════════════════════════════════════════════════════════════
 *  businessConfig.js — FILE DI CONFIGURAZIONE CENTRALE
 *  Modifica questo file per personalizzare il template per
 *  qualsiasi attività food & drink.
 * ═══════════════════════════════════════════════════════════════════
 */

// Helper per risolvere i percorsi degli asset pubblici con il BASE_URL corretto
const resolvePublicPath = (path) => {
  if (!path.startsWith('/')) return path; // Se non inizia con /, potrebbe essere un URL esterno
  return import.meta.env.BASE_URL + path.slice(1);
};

export const businessConfig = {

  /* ── INFORMAZIONI GENERALI ─────────────────────────────────────── */
  business: {
    /*name: "La Brace & Calice",
    tagline: "Cucina autentica, vini selezionati",*/
    image: resolvePublicPath("/logo_iniziale.png"),
    description:
      "Un luogo dove la tradizione incontra l'innovazione. Ogni piatto racconta una storia, ogni sorso è un viaggio.",
    phone: "+39 02 1234 5678",
    email: "info@labraceecalice.it",
    vatNumber: "IT 12345678901",
  },

  /* ── HERO SECTION ──────────────────────────────────────────────── */
  hero: {
    backgroundImage: resolvePublicPath("/hero-chef.png"),
    headline: "AUTHENTIC ITALIAN.\nMADE FOR YOU.",
    subheadline:
      "Experience the true taste of Italy with fresh ingredients, time-honored recipes, and a passion for great food.",
    cta: {
      primary:   { label: "EXPLORE OUR MENU", href: "#menu" },
      secondary: { label: "Trovaci su mappa", href: "#location-hours" },
    },
  },

  /* ── MENU ──────────────────────────────────────────────────────── */
  menu: {
    categories: [
      {
        id: "antipasti",
        label: "Antipasti",
        icon: "🥗",
        items: [
          {
            id: "bruschetta",
            name: "Bruschetta al Pomodoro",
            description: "Pane di casa tostato, pomodori datterini, basilico fresco, aglio e olio EVO.",
            price: "7.50",
            tags: ["vegan", "popular"],
            image: null,
          },
          {
            id: "carpaccio",
            name: "Carpaccio di Manzo",
            description: "Sottili fette di manzo con rucola, scaglie di parmigiano e limone.",
            price: "13.00",
            tags: ["popular"],
            image: null,
          },
          {
            id: "burrata",
            name: "Burrata con Bresaola",
            description: "Burrata pugliese DOP, bresaola, pomodori confit e glassa di aceto balsamico.",
            price: "14.50",
            tags: [],
            image: null,
          },
          {
            id: "zuppa",
            name: "Zuppa di Lenticchie",
            description: "Crema di lenticchie rosse con crostini croccanti e olio al rosmarino.",
            price: "9.00",
            tags: ["vegan", "gluten-free"],
            image: null,
          },
        ],
      },
      {
        id: "primi",
        label: "Primi Piatti",
        icon: "🍝",
        items: [
          {
            id: "cacio",
            name: "Cacio e Pepe",
            description: "Pasta tonnarello, pecorino romano DOP, pepe nero macinato al momento.",
            price: "15.00",
            tags: ["popular"],
            image: null,
          },
          {
            id: "amatriciana",
            name: "Amatriciana Classica",
            description: "Bucatini, guanciale di Amatrice, pomodoro San Marzano, pecorino romano.",
            price: "15.50",
            tags: ["popular"],
            image: null,
          },
          {
            id: "risotto",
            name: "Risotto ai Funghi Porcini",
            description: "Carnaroli invecchiato, funghi porcini freschi, burro di malga e parmigiano.",
            price: "18.00",
            tags: ["gluten-free"],
            image: null,
          },
          {
            id: "gnocchi",
            name: "Gnocchi alla Sorrentina",
            description: "Gnocchi di patate fatti in casa, pomodoro, fior di latte e basilico.",
            price: "14.00",
            tags: ["vegetarian"],
            image: null,
          },
        ],
      },
      {
        id: "secondi",
        label: "Secondi",
        icon: "🥩",
        items: [
          {
            id: "tagliata",
            name: "Tagliata di Scottona",
            description: "Scottona razza Chianina, rucola selvatica, parmigiano 24 mesi, olio EVO.",
            price: "28.00",
            tags: ["popular", "gluten-free"],
            image: null,
          },
          {
            id: "branzino",
            name: "Branzino al Sale",
            description: "Branzino del Mediterraneo cotto al sale, verdure di stagione e salsa verde.",
            price: "26.00",
            tags: ["gluten-free"],
            image: null,
          },
          {
            id: "pollo",
            name: "Pollo alla Cacciatora",
            description: "Pollo ruspante, olive taggiasche, capperi, pomodoro e vino bianco.",
            price: "19.00",
            tags: [],
            image: null,
          },
          {
            id: "parmigiana",
            name: "Parmigiana di Melanzane",
            description: "Melanzane grigliate, mozzarella fior di latte, pomodoro, basilico.",
            price: "16.00",
            tags: ["vegetarian"],
            image: null,
          },
        ],
      },
      {
        id: "dolci",
        label: "Dolci",
        icon: "🍮",
        items: [
          {
            id: "tiramisu",
            name: "Tiramisù della Casa",
            description: "Ricetta originale con savoiardi, mascarpone artigianale, caffè espresso.",
            price: "8.00",
            tags: ["popular"],
            image: null,
          },
          {
            id: "panna-cotta",
            name: "Panna Cotta ai Frutti di Bosco",
            description: "Cremosa panna cotta con coulis di fragole e lamponi freschi.",
            price: "7.50",
            tags: ["gluten-free"],
            image: null,
          },
          {
            id: "cannolo",
            name: "Cannolo Siciliano",
            description: "Cialda croccante, ricotta di pecora, pistacchi di Bronte e arancia candita.",
            price: "7.00",
            tags: ["popular"],
            image: null,
          },
        ],
      },
      {
        id: "drink",
        label: "Drink & Vini",
        icon: "🍷",
        items: [
          {
            id: "negroni",
            name: "Negroni Classico",
            description: "Gin, Campari, vermouth rosso, scorza d'arancia.",
            price: "10.00",
            tags: [],
            image: null,
          },
          {
            id: "spritz",
            name: "Aperol Spritz",
            description: "Aperol, Prosecco DOC, acqua tonica, arancia.",
            price: "8.00",
            tags: ["popular"],
            image: null,
          },
          {
            id: "vino-rosso",
            name: "Chianti Classico DOCG",
            description: "Toscana — Bicchiere. Note di ciliegia, spezie e tabacco.",
            price: "9.00",
            tags: ["gluten-free", "vegan"],
            image: null,
          },
          {
            id: "analcolico",
            name: "Limonata della Casa",
            description: "Limoni di Sicilia, menta fresca, sciroppo di zucchero di canna, soda.",
            price: "5.50",
            tags: ["vegan"],
            image: null,
          },
        ],
      },
    ],
  },

  /* ── ORARI DI APERTURA ─────────────────────────────────────────── */
  hours: {
    // Usa null per i giorni di chiusura
    schedule: [
      { day: "Lunedì",   open: "12:00", close: "0:00", eveningOpen: "18:30", eveningClose: "23:00" },      // Chiuso
      { day: "Martedì",  open: "12:00", close: "15:00", eveningOpen: "18:30", eveningClose: "23:00" },
      { day: "Mercoledì",open: "12:00", close: "15:00", eveningOpen: "18:30", eveningClose: "23:00" },
      { day: "Giovedì",  open: "12:00", close: "15:00", eveningOpen: "18:30", eveningClose: "23:00" },
      { day: "Venerdì",  open: "12:00", close: "15:30", eveningOpen: "18:30", eveningClose: "23:30" },
      { day: "Sabato",   open: "12:00", close: "16:00", eveningOpen: "18:00", eveningClose: "24:00" },
      { day: "Domenica", open: "12:00", close: "16:00", eveningOpen: "18:00", eveningClose: "24:00" },
    ],
    note: "La cucina è aperta fino a 30 minuti prima della chiusura. Consigliamo la prenotazione.",
  },

  /* ── STAFF ─────────────────────────────────────────────────────── */
  staff: [
    {
      id: "chef",
      name: "Marco Ferretti",
      role: "Executive Chef",
      bio: "Formatosi nelle migliori cucine di Milano e Parigi, Marco porta in ogni piatto la passione per la tradizione italiana.",
      // Usa URL immagine o null per il placeholder
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80",
      social: { instagram: "#" },
    },
    {
      id: "sous-chef",
      name: "Sofia Ricci",
      role: "Sous Chef",
      bio: "Specializzata in pasta fresca e dolci artigianali, Sofia è l'anima creativa della brigata.",
      image: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=400&q=80",
      social: { instagram: "#" },
    },
    {
      id: "sommelier",
      name: "Luca Bianchi",
      role: "Sommelier",
      bio: "Con oltre 500 etichette in carta, Luca saprà guidarti nel perfetto abbinamento cibo-vino.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
      social: { instagram: "#" },
    },
    {
      id: "barman",
      name: "Giulia Moretti",
      role: "Head Bartender",
      bio: "Campionessa regionale di mixology, Giulia crea cocktail che sono vere e proprie opere d'arte.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      social: { instagram: "#" },
    },
  ],

  /* ── STORIA ─────────────────────────────────────────────────────── */
  story: {
    headline: "Una storia nata dalla passione",
    intro:
      "La Brace & Calice nasce da un sogno semplice: creare un luogo dove il cibo buono, il vino ottimo e la buona compagnia si incontrano in un'atmosfera calda e accogliente.",
    timeline: [
      {
        year: "2008",
        title: "Le origini",
        description:
          "Marco Ferretti apre una piccola trattoria da 20 coperti in via Broletto. Il passaparola la rende presto un riferimento del quartiere.",
      },
      {
        year: "2013",
        title: "Il primo riconoscimento",
        description:
          "La guida Gambero Rosso assegna Due Forchette. Arriva Luca Bianchi e la carta vini si arricchisce con 300 etichette selezionate.",
      },
      {
        year: "2018",
        title: "Il trasferimento",
        description:
          "Il locale si sposta nella sede attuale: 80 coperti, una cantina a vista e un dehors all'aperto. Nasce il format aperitivo.",
      },
      {
        year: "2023",
        title: "Oggi",
        description:
          "Tre Forchette Gambero Rosso, una stella Michelin e una squadra di 12 professionisti appassionati. La storia continua.",
      },
    ],
    // Immagine della sezione storia
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80",
  },

  /* ── LOCATION ──────────────────────────────────────────────────── */
  location: {
    address: "Via della Brace 42",
    city: "Milano",
    cap: "20121",
    province: "MI",
    country: "Italia",
    // URL di embed Google Maps (sostituisci con le coordinate reali)
    // Per ottenere il tuo: Google Maps → Condividi → Incorpora → copia l'URL dell'iframe
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2797.9!2d9.1859!3d45.4654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDI3JzU1LjQiTiA5wrAxMScwOS4yIkU!5e0!3m2!1sit!2sit!4v1234567890",
    // Link Google Maps diretto (per il pulsante "Apri in Maps")
    mapsDirectUrl: "https://goo.gl/maps/example",
    parking: "Parcheggio disponibile in Via Torino (200m)",
    transport: "Metro M1 Cairoli, Tram 2-14",
    phone: "+39 02 1234 5678",
    email: "info@labraceecalice.it",
    reservations: "https://forms.google.com", // Link prenotazione (es. Google Forms, OpenTable)
  },

  /* ── SOCIAL MEDIA ──────────────────────────────────────────────── */
  social: {
    instagram: "https://instagram.com/labraceecalice",
    facebook:  "https://facebook.com/labraceecalice",
    tripadvisor: "https://tripadvisor.it",
    whatsapp:  "https://wa.me/390212345678",
  },

  /* ── TAG COLORI ─────────────────────────────────────────────────── */
  // Puoi aggiungere/modificare i tag e i loro colori qui
  tags: {
    popular:      { label: "⭐ Popolare",    color: "#d4a017", bg: "rgba(212,160,23,0.15)" },
    vegan:        { label: "🌿 Vegano",       color: "#4caf50", bg: "rgba(76,175,80,0.15)" },
    vegetarian:   { label: "🥦 Vegetariano",  color: "#8bc34a", bg: "rgba(139,195,74,0.15)" },
    "gluten-free":{ label: "🌾 Senza Glutine",color: "#ff9800", bg: "rgba(255,152,0,0.15)" },
  },
};
