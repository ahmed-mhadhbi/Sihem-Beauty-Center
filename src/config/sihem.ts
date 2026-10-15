export const sihem = {
  name: "SIHEM BEAUTY CENTER",
  concept: "L’Atelier des Mariées",
  signature: "Chaque mariée mérite une histoire unique.",
  address: "Regueb, Sidi Bouzid, Tunisie",
  phone: "+216 97 849 399",
  phoneLink: "+21697849399",
  facebook: "https://www.facebook.com/salonsihamjaballi/",
  whatsapp: { number: "21697849399", validatedForUsage: false },
  branding: {
    ivory: "#F8F4ED",
    champagne: "#D5BD99",
    powder: "#D8BAB6",
    brown: "#332722",
    plum: "#4B3039",
  },
  services: [
    "Maquillage mariée",
    "Coiffure de mariée",
    "Préparation beauté",
    "Location de robes — disponibilité à vérifier",
  ],
  booking: { depositPercent: 30, maxEvenings: 3, timezone: "Africa/Tunis" },
  historicalOffer: {
    evenings: 2,
    price: 1000,
    year: 2026,
    label:
      "Référence historique communiquée pour le projet. Tarif à confirmer, non garanti.",
  },
  reminders: [
    {
      title: "Demande reçue",
      text: "Bonjour {nom}, nous avons reçu votre souhait pour le {date}. Le salon doit encore vérifier sa disponibilité.",
    },
    {
      title: "Confirmation à effectuer",
      text: "Après échange avec vous, le salon pourra confirmer les prestations, le tarif et les modalités d’acompte.",
    },
    {
      title: "Rappel avant rendez-vous",
      text: "Bonjour {nom}, pensez à vérifier votre horaire de préparation avec le salon avant le {date}.",
    },
    {
      title: "Informations pratiques",
      text: "Retrouvez Sihem Beauty Center à Regueb, Sidi Bouzid. Pour toute précision, contactez le +216 97 849 399.",
    },
  ],
};
export const looks = [
  {
    id: "lumiere",
    title: "La lumière, simplement.",
    category: "Maquillage",
    image: "/images/veil.jpg",
    note: "Teint lumineux · nuances douces",
    source:
      "https://www.pexels.com/photo/elegant-bridal-portrait-with-veil-30717521/",
  },
  {
    id: "intemporelle",
    title: "L’allure intemporelle.",
    category: "Coiffures",
    image: "/images/hair.jpg",
    note: "Lignes délicates · chignon élégant",
    source:
      "https://www.pexels.com/photo/elegant-bride-in-wedding-dress-beside-window-28834563/",
  },
  {
    id: "couture",
    title: "Un rêve de couture.",
    category: "Robes",
    image: "/images/dress.jpg",
    note: "Dentelle · silhouette romantique",
    source:
      "https://www.pexels.com/photo/beautiful-bride-in-long-white-wedding-gown-5253097/",
  },
  {
    id: "caractere",
    title: "La beauté de caractère.",
    category: "Soirée",
    image: "/images/portrait.jpg",
    note: "Regard intense · lèvres dessinées",
    source:
      "https://www.pexels.com/photo/elegant-bride-with-veil-in-artistic-portrait-32111039/",
  },
];
export const styles = [
  {
    id: "naturelle",
    title: "Élégance naturelle",
    desc: "Votre beauté, dans sa plus douce expression.",
    image: "/images/veil.jpg",
    colors: ["#d8b7a0", "#ead9c4", "#a67c68"],
  },
  {
    id: "glamour",
    title: "Glamour sophistiqué",
    desc: "Un regard intense et une allure inoubliable.",
    image: "/images/hero.jpg",
    colors: ["#946554", "#a68666", "#4b3039"],
  },
  {
    id: "tradition",
    title: "Tradition revisitée",
    desc: "Des détails précieux, une élégance personnelle.",
    image: "/images/portrait.jpg",
    colors: ["#aa7b53", "#b8a18b", "#843e47"],
  },
  {
    id: "lumineux",
    title: "Look lumineux",
    desc: "La fraîcheur d’un teint baigné de lumière.",
    image: "/images/veil.jpg",
    colors: ["#dab8b4", "#f1d7c3", "#b2997e"],
  },
];
export const hairstyles = [
  { id: "chignon", title: "Chignon délicat", image: "/images/hair.jpg" },
  { id: "attache", title: "Attache couture", image: "/images/hero.jpg" },
  {
    id: "ondulations",
    title: "Ondulations romantiques",
    image: "/images/portrait.jpg",
  },
];
export const dresses = [
  { id: "dentelle", title: "Romance en dentelle", image: "/images/dress.jpg" },
  { id: "epuree", title: "Ligne épurée", image: "/images/hero.jpg" },
  { id: "voile", title: "L’esprit du voile", image: "/images/hair.jpg" },
];
// Hypothèses de démonstration : aucune de ces compositions ou valeurs n’est une offre du salon.
export const packages = [
  {
    id: "essentiel",
    name: "L’Essentiel",
    subtitle: "La beauté dans sa justesse.",
    price: 650,
    evenings: 1,
    duration: "2 h indicatives",
    includes: [
      "Maquillage mariée",
      "Coiffure de mariée",
      "Une soirée de préparation",
    ],
    personalization: "Choix du style et de la coiffure",
  },
  {
    id: "signature",
    name: "Signature Mariée",
    subtitle: "Deux soirées, une même émotion.",
    price: 1000,
    evenings: 2,
    duration: "2 × 2 h indicatives",
    includes: [
      "Maquillage et coiffure",
      "Deux soirées de préparation",
      "Deux inspirations personnalisées",
    ],
    personalization: "Une allure différente pour chaque soirée",
  },
  {
    id: "prestige",
    name: "Expérience Prestige",
    subtitle: "Votre histoire, dans chaque détail.",
    price: 1450,
    evenings: 3,
    duration: "3 × 2 h indicatives",
    includes: [
      "Maquillage et coiffure",
      "Trois soirées de préparation",
      "Échange préparatoire personnalisé",
    ],
    personalization: "Un accompagnement à composer avec le salon",
  },
];
export const extras = [
  {
    id: "soin",
    name: "Soin préparatoire",
    desc: "Une préparation beauté à discuter avec le salon.",
    price: 90,
  },
  {
    id: "beaute",
    name: "Détail beauté supplémentaire",
    desc: "Une envie particulière à préciser ensemble.",
    price: 60,
  },
  {
    id: "soiree",
    name: "Autre soirée",
    desc: "Une préparation complémentaire à étudier.",
    price: 350,
  },
  {
    id: "proche",
    name: "Beauté d’une proche",
    desc: "Une attention à partager, si cette prestation est proposée.",
    price: 120,
  },
];
